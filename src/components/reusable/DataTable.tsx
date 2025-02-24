import { Dispatch, Key, ReactNode, SetStateAction, useState } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { Pagination } from "@heroui/pagination";

import { Alert } from "@heroui/alert";

type DataTableProps<T> = {
  ariaLabel: string;
  columns: { label: string; key: string }[];
  emptyTableMessage: string;
  data?: T[];
  renderCell: (item: T, columnKey: Key) => ReactNode;
  topContent: ReactNode;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  totalItems?: number;
  onPageChange?: Dispatch<SetStateAction<number>>;
  showPagination: boolean;
  isRowClickable: boolean;
  onRowClick?: (id: number | undefined) => void;
};

export default function DataTable<T extends { id?: number }>({
  columns,
  ariaLabel,
  emptyTableMessage,
  data,
  renderCell,
  topContent,
  isLoading,
  isError,
  errorMessage,
  totalItems,
  onPageChange,
  showPagination,
  isRowClickable,
  onRowClick,
}: DataTableProps<T>) {
  const [currentTablePage, setCurretTablePage] = useState(1);
  const pageSize = 5;
  const totalPages = totalItems ? Math.ceil(totalItems / pageSize) : 0;

  const handleTableChange = (page: number) => {
    setCurretTablePage(page);
    onPageChange?.(page - 1);
  };

  if (isError) {
    return (
      <div className="flex place-content-center mt-12">
        <Alert color="danger" title={errorMessage} />
      </div>
    );
  }

  return (
    <Table
      aria-label={ariaLabel}
      classNames={{
        wrapper: "max-h-[382px] max-w-lg",
        base: "mt-12",
        tr: isRowClickable ? "hover:bg-content2 hover:cursor-pointer" : null,
      }}
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={
        showPagination && totalPages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              initialPage={1}
              page={currentTablePage}
              total={totalPages}
              onChange={(page) => handleTableChange(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "end" : "start"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={emptyTableMessage}
        items={data || []}
        isLoading={isLoading}
        loadingContent={<Spinner />}
      >
        {(item) => (
          <TableRow key={item.id} onClick={() => onRowClick?.(item.id)}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

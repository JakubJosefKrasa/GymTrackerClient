import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  UseDisclosureProps,
} from "@nextui-org/modal";

type ModalProps = {
  headerText: string;
  bodyText: string;
  confirmButtonText: string;
  onDeleteItem: () => void;
  isLoading: boolean;
};

type DeleteExerciseModal = UseDisclosureProps & ModalProps;

export default function DeleteItemModal({
  isOpen,
  onClose,
  headerText,
  bodyText,
  confirmButtonText,
  onDeleteItem,
  isLoading,
}: DeleteExerciseModal) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {headerText}
            </ModalHeader>
            <ModalBody>
              <p>{bodyText}</p>
            </ModalBody>
            <ModalFooter className="flex-col-reverse lg:flex-row">
              <Button color="danger" variant="flat" onPress={onClose}>
                Zrušit
              </Button>
              <Button
                color="primary"
                onPress={onDeleteItem}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                {confirmButtonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

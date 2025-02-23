import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { semanticColors } from "@heroui/theme";

type SuccessAlertProps = {
  title: string;
  message?: string;
};

export default function SuccessAlert({ title, message }: SuccessAlertProps) {
  return (
    <div className="w-full max-w-md rounded-md bg-success-50 p-4 flex shadow-sm">
      <div>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCircleCheck}
            color={semanticColors.dark.success[400]}
            aria-hidden="true"
          />
          <h3 className="ml-3 text-sm font-medium text-success-400">{title}</h3>
        </div>
        {message && (
          <div className="mt-2 ml-7 text-sm text-success-500">{message}</div>
        )}
      </div>
    </div>
  );
}

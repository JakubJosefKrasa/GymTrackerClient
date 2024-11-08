import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { semanticColors } from "@nextui-org/theme";

type ErrorAlertProps = {
  errorTitle: string;
  errorMessages?: string[];
};

export default function ErrorAlert({
  errorTitle,
  errorMessages,
}: ErrorAlertProps) {
  return (
    <div className="w-full max-w-md rounded-md bg-danger-50 p-4 flex shadow-sm">
      <div>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            color={semanticColors.dark.danger[400]}
            aria-hidden="true"
          />
          <h3 className="ml-3 text-sm font-medium text-danger-400">
            {errorTitle}
          </h3>
        </div>
        {errorMessages && errorMessages.length > 0 && (
          <div className="mt-2 ml-7 text-sm text-danger-500">
            <ul role="list" className="list-disc space-y-1 pl-5">
              {errorMessages?.map((errorMessage, index) => (
                <li key={index}>{errorMessage}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

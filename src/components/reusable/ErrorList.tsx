type ErrorListProps = {
  errorMessages?: string[];
};

export default function ErrorList({ errorMessages }: ErrorListProps) {
  return (
    errorMessages &&
    errorMessages.length > 0 && (
      <div className="mt-2">
        <ul role="list" className="list-disc space-y-1 pl-5">
          {errorMessages?.map((errorMessage, index) => (
            <li key={index}>{errorMessage}</li>
          ))}
        </ul>
      </div>
    )
  );
}

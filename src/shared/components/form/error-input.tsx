interface ErrorInputProps {
  message?: string;
}

export const ErrorInput = ({ message }: ErrorInputProps) => {
  if (!message) return null;

  return (
    <span className="text-error text-xs mt-1">
      {message}
    </span>
  );
};

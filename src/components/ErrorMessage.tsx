interface ErrorMessageProps {
  error: string | undefined;
  className?: string;
}

export default function ErrorMessage({ error, className }: ErrorMessageProps) {
  return error && <p className={`text-red-600 ${className}`}>{error}</p>;
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="error-state">
      <p>{message}</p>
      {onRetry && (
        <button className="secondary-button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};
export default ErrorState;

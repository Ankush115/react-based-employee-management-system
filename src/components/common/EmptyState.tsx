interface EmptyStateProps {
  message: string;
}

const EmptyState = ({
  message,
}: EmptyStateProps) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => {
  return <div className="status-card status-card-error">{message}</div>;
};

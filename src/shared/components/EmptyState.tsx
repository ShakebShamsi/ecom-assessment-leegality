interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="status-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

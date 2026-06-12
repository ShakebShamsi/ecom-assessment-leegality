interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message }: LoadingStateProps) => {
  return (
    <div className="apple-loader-overlay" role="status" aria-label={message ?? 'Loading'}>
      <div className="apple-spinner">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className="apple-spinner-blade" style={{ '--blade': i } as React.CSSProperties} />
        ))}
      </div>
      {message ? <p className="apple-loader-label">{message}</p> : null}
    </div>
  );
};

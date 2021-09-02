export function Timestamp({ time, className }) {
  return (
    <div className={className}>
      Last updated at {new Date(time).toLocaleString()}
    </div>
  )
}

interface Props {
  time: string
  className?: string
}

export const Timestamp: React.FC<Props> = ({ time, className }) => {
  return (
    <div className={className}>
      Last updated at {new Date(time).toLocaleString()}
    </div>
  )
}

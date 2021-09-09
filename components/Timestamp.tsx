interface Props {
  time: string
}

export const Timestamp: React.FC<Props> = ({ time }) => {
  return (
    <div>
      Last updated at {new Date(time).toLocaleString()}
    </div>
  )
}

interface Props {
  className?: string
}

export const Error: React.FC<Props> = ({ className }) => {
  return (
    <p className={className}>
      😢 Crap! Error loading awesome FIFA data, try again...
    </p>
  )
}

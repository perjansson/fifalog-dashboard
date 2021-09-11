import { styled } from '../stitches.config'

const Paragraph = styled('p')

export const Error: React.FC = () => {
  return (
    <Paragraph css={{ fontSize: '$large', color: '$error' }}>
      😢 Crap! Error loading awesome FIFA data, try again...
    </Paragraph>
  )
}

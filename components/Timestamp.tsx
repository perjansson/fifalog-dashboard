import { useTranslation } from 'react-i18next'

interface Props {
  time: string
  className?: string
}

export const Timestamp: React.FC<Props> = ({ time, className }) => {
  const { t } = useTranslation()
  return (
    <div className={className}>
      {t('lastUpdated', {
        timestamp: new Date(time),
      })}
    </div>
  )
}

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { DateTime } from 'luxon'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (lng && format && value instanceof Date) {
          return DateTime.fromJSDate(value)
            .setLocale(lng)
            .toLocaleString(DateTime['DATETIME_MED_WITH_SECONDS'])
        }
        return value as string
      },
    },
    resources: {
      en: {
        translation: {
          pageTitle: 'Fifa Log Stats Dashboard',
          header: 'FIFA Log statistics from all eternity',
          totalGames: 'Total games played: {{count}}',
          ties: 'Ties',
          lastUpdated:
            'Last updated at {{timestamp, DATETIME_MED_WITH_SECONDS}}',
        },
      },
      sv: {
        translation: {
          pageTitle: 'Fifa Log Statistisk Översikt',
          header: 'FIFA Log-statistik från all evighet',
          totalGames: 'Totalt antal spelade matcher: {{count}}',
          ties: 'Oavgjorda',
          lastUpdated:
            'Senast uppdaterad {{timestamp, DATETIME_MED_WITH_SECONDS}}',
        },
      },
      fi: {
        translation: {
          pageTitle: 'Fifa Log Tilastollinen Yleiskatsaus',
          header: 'FIFA Log tilastot koko ikuisuudesta',
          totalGames: 'Pelattujen otteluiden kokonaismäärä: {{count}}',
          ties: 'Tasapeli',
          lastUpdated:
            'Viimeksi päivitetty {{timestamp, DATETIME_MED_WITH_SECONDS}}',
        },
      },
    },
  })
  .catch((error) => console.error('Error initiating i18n', error))

export default i18n

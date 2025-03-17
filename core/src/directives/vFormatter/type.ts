export interface FormatterOptions {
  formatterCurrency?: (value: number, local: string, options: object) => string
  formatTime?: (date: number | Date, local: string, option: Object) => string | Date
  formatPercentage?: (percentage: number, local: string, fractionDigits: number) => string
  formatBytes?: (bytes: number, decimals: number) => string
  autoFormat?: (value: number | Date | string, locale: string, options: object) => string
}

export type options = {
  style?: string
  currency?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  minimumIntegerDigits?: number
  minimumSignificantDigits?: number
  maximumSignificantDigits?: number
  fractionDigits?: number
  decimals?: number
}

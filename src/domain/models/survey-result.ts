export type SurveyResult = {
  question: string
  answers: Array<{ image?: string; answer: string; count: number; percent: number }>
  date: Date
  isCurrentAccountAnswer: boolean
}

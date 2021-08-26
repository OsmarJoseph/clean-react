export type SurveyResult = {
  question: string
  answers: [{ image?: string; answer: string; count: number; percent: number }]
  date: Date
}

export type SurveyResult = {
  question: string
  answers: ResultAnswer[]
  date: Date
}

export type ResultAnswer = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}

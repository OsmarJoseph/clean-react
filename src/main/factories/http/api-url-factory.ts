import { env } from '@/main/config'

export const makeApiUrl = (path: string): string => `${env.apiUrl}${path}`

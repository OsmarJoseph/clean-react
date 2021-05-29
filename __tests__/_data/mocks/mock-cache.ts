import { SetStorage } from '@/data/protocols'

export class SetStorageMock implements SetStorage {
  key: string
  value: unknown

  set(key: string, value: unknown): void {
    this.key = key
    this.value = value
  }
}

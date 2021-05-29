import { SetStorage } from '@/data/protocols'

export class SetStorageSpy implements SetStorage {
  key: string
  value: unknown

  set(key: string, value: unknown): void {
    this.key = key
    this.value = value
  }
}

import { GetStorage, SetStorage } from '@/data/protocols'

export class SetStorageMock implements SetStorage {
  key: string
  value: unknown

  set(key: string, value: unknown): void {
    this.key = key
    this.value = value
  }
}
export class GetStorageMock implements GetStorage {
  key: string

  get(key: string): void {
    this.key = key
  }
}

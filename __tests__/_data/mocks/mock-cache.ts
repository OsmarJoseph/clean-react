import { GetStorage, SetStorage } from '@/data/protocols'

import { mockObject } from '@/tests/helpers'

export class SetStorageMock implements SetStorage {
  key: string
  value: unknown

  set(key: string, value: unknown): void {
    this.key = key
    this.value = value
  }
}
export class GetStorageSpy implements GetStorage {
  key: string
  value: any = mockObject()

  get(key: string): any {
    this.key = key
    return this.value
  }
}

export type StorageType = 'local' | 'session'

export interface StorageOptions {
  type?: StorageType
  prefix?: string
  serializer?: <T>(value: T) => string
  deserializer?: <T>(value: string) => T
}
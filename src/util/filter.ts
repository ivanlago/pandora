import any from 'ramda/es/any'
import compose from 'ramda/es/compose'
import contains from 'ramda/es/contains'
import filter from 'ramda/es/filter'
import map from 'ramda/es/map'
import propSatisfies from 'ramda/es/propSatisfies'
import toLower from 'ramda/es/toLower'

const anyTruthy = any(_ => !!_)

export const lowerContains = (value: string) =>
  compose(
    contains(toLower(value)),
    toLower
  )

export const searchBy = <T>(...props: Array<keyof T>) => (value: string) => {
  const matches = (prop: string) =>
    propSatisfies<string, T>(lowerContains(value), prop)
  return filter<T>(item =>
    anyTruthy(map(prop => matches(prop)(item), props as string[]))
  )
}

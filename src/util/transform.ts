export const toInput = <T extends { __typename?: any }>(obj: T) => {
  const { __typename, ...input } = obj
  return input
}

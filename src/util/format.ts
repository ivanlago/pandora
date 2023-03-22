import pipe from 'ramda/es/pipe'
import split from 'ramda/es/split'
import join from 'ramda/es/join'
import replace from 'ramda/es/replace'
import slice from 'ramda/es/slice'

export type Mask = (value: string) => string

interface MaskSkel {
  [index: number]: string
}

const formatNumber = (decimals: number): Mask => value => {
  const number = Number(value)
  const float = value ? number / Math.pow(10, decimals) : 0
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(float)
}
const prefix = (str: string): Mask => value => str + value
export const suffix = (str: string): Mask => value => value + str
export const numberify: Mask = replace(/[^\d]/g, '')
const limit = (length: number): Mask => slice(0, length)
const skelify = (skel: MaskSkel): Mask => value =>
  value.split('').reduce(maskReducer(skel), '')
const maskReducer = (skel: MaskSkel) => (
  acc: string,
  digit: string,
  index: number,
  array: string[]
) => {
  const { length } = array

  if (index === 0 && skel[-1]) {
    return skel[-1] + digit
  }

  if (index < length - 1 && skel[index]) {
    return acc + digit + skel[index]
  }

  return acc + digit
}
export const truncate = (length: number): Mask => value =>
  value.length < length
    ? value
    : pipe(
        limit(length),
        suffix('…')
      )(value)

export const formatBoletoConvênio: Mask = pipe(
  numberify,
  limit(48),
  skelify({
    10: ' ',
    11: ' ',
    22: ' ',
    23: ' ',
    34: ' ',
    35: ' ',
    46: ' '
  })
)

export const formatBoleto: Mask = pipe(
  numberify,
  limit(54),
  skelify({
    4: '.',
    9: ' ',
    14: '.',
    20: ' ',
    25: '.',
    31: ' ',
    32: ' '
  })
)

export const formatCpf: Mask = pipe(
  numberify,
  limit(11),
  skelify({
    2: '.',
    5: '.',
    8: '-'
  })
)

export const formatCnpj: Mask = pipe(
  numberify,
  limit(14),
  skelify({
    1: '.',
    4: '.',
    7: '/',
    11: '-'
  })
)

export const formatRg: Mask = pipe(
  numberify,
  limit(14)
)

export const formatCep: Mask = pipe(
  numberify,
  limit(8),
  skelify({
    4: '-'
  })
)

export const formatCurrency: (value: string | number) => string = value =>
  formatStringCurrency(typeof value === 'string' ? value : value.toFixed())

const formatStringCurrency: Mask = pipe(
  numberify,
  limit(16),
  formatNumber(2),
  prefix('R$ ')
)

export const formatCurrencyNoPrefix: Mask = pipe(
  numberify,
  limit(16),
  formatNumber(2)
)

export const formatPhone: Mask = phone =>
  numberify(phone).length > 10 ? formatCellphone(phone) : formatLandline(phone)

const formatLandline: Mask = pipe(
  numberify,
  skelify({
    [-1]: '(',
    1: ') ',
    5: '-'
  })
)

const formatCellphone: Mask = pipe(
  numberify,
  limit(11),
  skelify({
    [-1]: '(',
    1: ') ',
    6: '-'
  })
)

const firstAndLast = (arr: any[]) => [arr[0], arr[arr.length - 1]]

export const formatName = pipe(
  split(' '),
  firstAndLast,
  join(' ')
)

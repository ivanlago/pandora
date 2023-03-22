import * as XLSX from 'xlsx'
import { numberify } from './format'
import { saveAs } from 'file-saver'

export const tableToExcel = (table: HTMLTableElement, filename: string) => {
  const workbook = XLSX.utils.table_to_book(table, { raw: true })

  for (const name of workbook.SheetNames) {
    const sheet = workbook.Sheets[name]
    for (const cell in sheet) {
      const str: string = sheet[cell] && sheet[cell].v
      if (str && str.includes('$')) {
        sheet[cell] = {
          t: 'n',
          z: 'R$ 0.00',
          v: Math.floor(+numberify(str) / 100),
          w: str
        }
      }
    }
  }

  const buffer = toBlob(XLSX.write(workbook, options))
  saveAs(buffer, filename)
}

function toBlob(s: string) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)

  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff
  }

  return new Blob([buf], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
}

const options: XLSX.WritingOptions & { cellStyles?: boolean } = {
  bookSST: true,
  bookType: 'xlsx',
  cellStyles: true,
  compression: true,
  type: 'binary'
}

'use strict'

import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import chalk from 'chalk'

import {
  inputFile,
  from,
  to,
  segment,
  company,
  exportToJson,
} from './cliOptions.js'

import {
  FILE_HEADER_ROWS,
  FILE_TAIL_ROWS,
  COMPANY_NAME_POSITION_START,
  COMPANY_NAME_POSITION_END,
  COMPANY_ADDRESS_POSITION_START,
  COMPANY_ADDRESS_POSITION_END,
} from './constants.js'

const { log } = console
const file = path.resolve(inputFile)
const segmentType = segment?.toUpperCase()

const messageLog = ({ row, segmentType, from, to, line, company }) => {
  const print = (text) => (text ? chalk.inverse.bgBlack(text) : '')
  const search = row.substring(from - 1, to)
  return `
----- BEGIN: Cnab line: ${line} -----
- from: ${print(from)}
- to: ${print(to)}
- segment type: ${print(segmentType)}
- search: ${print(search)}
- company: ${print(company)}
- row content:
${row.substring(0, from)}${print(search)}${row.substring(to)}
----- END ------
`
}

const filterBySegmentType = (row, segmentType) => {
  const [initialCode] = row.split(' ')
  if (initialCode.endsWith(segmentType)) {
    return row
  }
}

const getCompanyName = (row) => row.substring(
    COMPANY_NAME_POSITION_START,
    COMPANY_NAME_POSITION_END
  ).trim()
const getCompanyAddress = (row) => row.substring(
    COMPANY_ADDRESS_POSITION_START,
    COMPANY_ADDRESS_POSITION_END
  ).trim()

const filterByCompanyName = (row, companyName) => {
  const rowCompanyName = getCompanyName(row)
  const regex = new RegExp(companyName, 'i')
  if (regex.test(rowCompanyName)) {
    return row
  }
}

console.time('Async reading')

readFile(file, 'utf8')
  .then(file => {
    const cnabArray = file.split('\n')
    const start = FILE_HEADER_ROWS
    const end = cnabArray.length - FILE_TAIL_ROWS
    const toExport = []

    for (let line = start; line < end; line++) {
      let row = cnabArray[line]
      if (row && segmentType) {
        row = filterBySegmentType(row, segmentType)
      }
      if (row && company) {
        row = filterByCompanyName(row, company)
      }
      if (row && exportToJson) {
        toExport.push({
          companyName: getCompanyName(row),
          companyAddress: getCompanyAddress(row),
        })
      }
      if (row) {
        log(messageLog({ row, segmentType, from, to, line }))
      }
    }

    if (exportToJson && toExport.length) {
      const jsonFile = path.resolve(exportToJson)
      const jsonContent = JSON.stringify(toExport, null, 2)
      writeFile(jsonFile, jsonContent, 'utf-8')
        .then(() => log('JSON file export successfully'))
        .catch(() => log('JSON file export failed'))
    }
  })
  .catch(error => {
    log('🚀 ~ file: cnabRows.js ~ error:', error)
  })

console.timeEnd('Async reading')

'use strict';

import path from 'path'
import { readFile } from 'fs/promises'
import chalk from 'chalk'

import {
  inputFile,
  from,
  to,
  segment,
  company,
} from './cliOptions.js'

const FILE_HEADER_ROWS = 2
const FILE_TAIL_ROWS = 2
const COMPANY_NAME_POSITION_START = 33
const COMPANY_NAME_POSITION_END = 73

const file = path.resolve(inputFile)
const segmentType = segment?.toUpperCase()
const { log } = console

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

const filterByCompanyName = (row, companyName) => {
  const rowCompanyName = row.substring(COMPANY_NAME_POSITION_START, COMPANY_NAME_POSITION_END)
  const regex = new RegExp(companyName, 'i')
  if (regex.test(rowCompanyName)) {
    return row
  }
}

console.time('leitura Async')

readFile(file, 'utf8')
  .then(file => {
    const cnabArray = file.split('\n')
    const cnabLength = cnabArray.length - FILE_TAIL_ROWS

    for (let line = FILE_HEADER_ROWS; line < cnabLength; line++) {
      let row = cnabArray[line]
      if (row && segmentType) {
        row = filterBySegmentType(row, segmentType)
      }
      if (row && company) {
        row = filterByCompanyName(row, company)
      }
      if (row) {
        log(messageLog({ row, segmentType, from, to, line }))
      }
    }
  })
  .catch(error => {
    log('🚀 ~ file: cnabRows.js ~ error:', error)
  })

console.timeEnd('leitura Async')

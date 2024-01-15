'use strict';

import path from 'path'
import { readFile } from 'fs/promises'
import chalk from 'chalk'

import {
  inputFile,
  from,
  to,
  segment,
} from './cliOptions.js'

const FILE_HEADER_ROWS = 2
const FILE_TAIL_ROWS = 2

const file = path.resolve(inputFile)
const segmentType = segment?.toUpperCase()
const { log } = console

const messageLog = ({ row, segmentType, from, to, line }) => {
  const print = (text) => (text ? chalk.inverse.bgBlack(text) : '')
  const search = row.substring(from - 1, to)
  return `
----- BEGIN: Cnab line: ${line} -----
- from: ${print(from)}
- to: ${print(to)}
- segment type: ${print(segmentType)}
- search: ${print(search)}
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

console.time('leitura Async')

readFile(file, 'utf8')
  .then(file => {
    const cnabArray = file.split('\n')
    const cnabLength = cnabArray.length - FILE_TAIL_ROWS

    for (let i = FILE_HEADER_ROWS; i < cnabLength; i++) {
      let row = cnabArray[i]
      if (segmentType) {
        row = filterBySegmentType(row, segmentType)
      }
      if (row) {
        log(messageLog({ row, segmentType, from, to, line: i }))
      }
    }
  })
  .catch(error => {
    log('🚀 ~ file: cnabRows.js ~ error:', error)
  })

console.timeEnd('leitura Async')

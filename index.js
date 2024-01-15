#! /usr/bin/env node

'use strict'

import path from 'path'
import { readFile, writeFile } from 'fs/promises'

import {
  inputFile,
  from,
  to,
  segment,
  company,
  exportToJson,
} from './options.js'
import {
  FILE_HEADER_ROWS,
  FILE_TAIL_ROWS,
} from './constants.js'
import {
  filterByCompanyName,
  filterBySegmentType,
  getCompanyAddress,
  getCompanyName
} from './filters.js'
import { log, messageLog } from './log.js'

const file = path.resolve(inputFile)
const segmentType = segment?.toUpperCase()

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

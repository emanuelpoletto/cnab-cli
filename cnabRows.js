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

const file = path.resolve(inputFile)

const sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions)

const messageLog = ({ segment, segmentType, from, to, line }) => {
  const print = (text) => (text ? chalk.inverse.bgBlack(text) : '')
  const strFound = segment.substring(from - 1, to)
  return `
----- BEGIN: Cnab line: ${line} -----
- from: ${print(from)}
- to: ${print(to)}
- segment type: ${print(segmentType)}
- search: ${print(strFound)}
- row content:
${segment.substring(0, from)}${print(strFound)}${segment.substring(to)}
----- END ------
`
}

console.time('leitura Async')

readFile(file, 'utf8')
  .then(file => {
    const cnabArray = file.split('\n')

    const cnabHeader = sliceArrayPosition(cnabArray, 0, 2)

    const [cnabBodySegmentP, cnabBodySegmentQ, cnabBodySegmentR] = sliceArrayPosition(cnabArray, 2, -2)

    const cnabTail = sliceArrayPosition(cnabArray, -2)

    if (segment === 'p') {
      console.log(messageLog({ segment: cnabBodySegmentP, segmentType: 'P', from, to }))
      return
    }

    if (segment === 'q') {
      console.log(messageLog({ segment: cnabBodySegmentQ, segmentType: 'Q', from, to }))
      return
    }

    if (segment === 'r') {
      console.log(messageLog({ segment: cnabBodySegmentR, segmentType: 'R', from, to }))
      return
    }

  })
  .catch(error => {
    console.log('🚀 ~ file: cnabRows.js ~ error:', error)
  })
console.timeEnd('leitura Async')

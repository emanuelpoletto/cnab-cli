import chalk from 'chalk'

export const { log } = console

export const messageLog = ({ row, segmentType, from, to, line, company }) => {
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

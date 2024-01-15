import yargs from 'yargs'

const cliOptions = yargs(process.argv.slice(2))
  .usage('Usage: $0 [options]')
  .option('i', {
    alias: 'inputFile',
    describe: 'The full path and filename to be read',
    type: 'string',
    demandOption: true,
  })
  .option('f', {
    alias: 'from',
    describe: 'Initial position to search on a line',
    type: 'number',
  })
  .option('t', {
    alias: 'to',
    describe: 'Final position to search on a line',
    type: 'number',
  })
  .option('s', {
    alias: 'segment',
    describe: 'Filter by segment type',
    type: 'string',
  })
  .option('c', {
    alias: 'company',
    describe: 'Search by company name',
    type: 'string',
  })
  .option('e', {
    alias: 'exportToJson',
    describe: 'Export company names and addresses from the output to a given JSON file',
    type: 'string',
  })
  .example('$0 -f 21 -t 34 -s p -i ./cnabExample.rem', 'output lines filtered by segment P and their related search substring')
  .example('$0 -s Q -c Acme -i ./cnabExample.rem', 'output lines filtered by segment Q and company name')
  .example('$0 -e cnabExample.json -i ./cnabExample.rem', 'output everything and export company names and addresses from the output to cnabExample.json')
  .argv;

export const {
  inputFile,
  from,
  to,
  segment,
  company,
  exportToJson,
} = cliOptions

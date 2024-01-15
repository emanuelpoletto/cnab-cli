import {
  COMPANY_NAME_POSITION_START,
  COMPANY_NAME_POSITION_END,
  COMPANY_ADDRESS_POSITION_START,
  COMPANY_ADDRESS_POSITION_END,
} from './constants.js'

export const getCompanyName = (row) => row.substring(
  COMPANY_NAME_POSITION_START,
  COMPANY_NAME_POSITION_END
).trim()

export const getCompanyAddress = (row) => row.substring(
  COMPANY_ADDRESS_POSITION_START,
  COMPANY_ADDRESS_POSITION_END
).trim()

export const filterBySegmentType = (row, segmentType) => {
  const [initialCode] = row.split(' ')
  if (initialCode.endsWith(segmentType)) {
    return row
  }
}

export const filterByCompanyName = (row, companyName) => {
  const rowCompanyName = getCompanyName(row)
  const regex = new RegExp(companyName, 'i')
  if (regex.test(rowCompanyName)) {
    return row
  }
}

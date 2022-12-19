import { SEVA_ENDPOINT, EXPENSES_ENDPOINT } from '../firebaseConfigs';

export const ReportTypes = [{
  value: 'ExpensesReport',
  key: 'expenses',
  text: 'Expenses',
},
{
  value: 'SevaReport',
  key: 'seva-report',
  text: 'SevaReport',
}
]

export const Apis = {
  'ExpensesReport': EXPENSES_ENDPOINT,
  'SevaReport': SEVA_ENDPOINT
}

export const API_DATE_QUERY_FIELD = {
  [SEVA_ENDPOINT]: 'sevaDate',
  [EXPENSES_ENDPOINT]: 'paymentDate'
}

export const SHASWATHA_SEVA_ID = 'shaswathaSevaReport'
export const ALL_REPORT_ID = 'allReport'

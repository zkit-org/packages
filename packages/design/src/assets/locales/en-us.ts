import 'dayjs/locale/en'
import { enUS } from 'date-fns/locale'

export default {
  key: 'en-US',
  Alert: {
    okText: 'Confirm',
    cancelText: 'Cancel',
  },
  ComboSelect: {
    empty: 'No data',
    clearText: 'Clear',
  },
  DataTable: {
    empty: 'No data',
  },
  Filters: {
    searchText: 'Search',
    resetText: 'Reset',
  },
  Pagination: {
    totalPage: 'Total %total items',
    total: '%page pages',
    size: '%size items/page',
    go: 'Go to',
    goSuffix: 'page',
  },
  Tree: {
    emptyText: 'No data',
  },
  TreeTable: {
    emptyText: 'No data',
  },
  DateRangePicker: {
    locale: enUS,
    format: 'LLL dd, y',
  },
  Uploader: {
    placeholder: "Drag 'n' drop some files here, or click to select files",
    uploadText: 'Upload',
    maxFilesExceeded: 'Maximum number of files exceeded',
    partialFilesAdded: ', only %count more files can be added',
  },
  DatePicker: {
    locale: enUS,
    format: 'LLL dd, y',
    presetPlaceholder: 'Quick select',
    options: [
      {
        label: 'Today',
        value: '0',
      },
      {
        label: 'Tomorrow',
        value: '1',
      },
      {
        label: 'In 3 days',
        value: '3',
      },
      {
        label: 'In a week',
        value: '7',
      },
      {
        label: 'In a Month',
        value: '30',
      },
    ],
  },
  Empty: {
    text: 'No data',
  },
}
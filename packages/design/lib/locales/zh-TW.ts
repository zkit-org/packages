import 'dayjs/locale/zh-tw';
import { zhTW } from 'date-fns/locale';

export default {
    key: "zh-TW",
    Alert: {
        okText: '確定',
        cancelText: '取消',
    },
    ComboSelect: {
        empty: "暫無數據",
        clearText: "清空"
    },
    DataTable: {
        empty: "暫無數據",
    },
    Filters: {
        searchText: "搜尋",
        resetText: "重置"
    },
    Pagination: {
        totalPage: "共 %total 條",
        total: "%page 頁",
        size: "%size 條/頁",
        go: "前往",
        goSuffix: "頁"
    },
    Tree: {
        emptyText: "暫無數據"
    },
    TreeTable: {
        emptyText: "暫無數據"
    },
    DateRangePicker: {
        locale: zhTW,
        format: "yyyy-MM-dd",
    },
    Uploader: {
        placeholder: "請拖曳文件到此處或點擊選擇文件",
        uploadText: "上傳"
    },
    DatePicker: {
        locale: zhTW,
        format: "yyyy-MM-dd",
        presetPlaceholder: "快速選擇",
        options: [
            {
                label: "今天",
                value: '0',
            },
            {
                label: "明天",
                value: '1',
            },
            {
                label: "三天後",
                value: '3',
            },
            {
                label: "一周後",
                value: '7',
            },
            {
                label: "一月後",
                value: '30',
            }
        ]
    },
    Empty: {
        text: "暫無數據"
    }
}

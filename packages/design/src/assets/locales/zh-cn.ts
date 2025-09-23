import "dayjs/locale/zh-cn";
import { zhCN } from "date-fns/locale";

export default {
  key: "zh-CN",
  Alert: {
    okText: "确定",
    cancelText: "取消",
  },
  ComboSelect: {
    empty: "暂无数据",
    clearText: "清空",
  },
  DataTable: {
    empty: "暂无数据",
  },
  Filters: {
    searchText: "搜索",
    resetText: "重置",
  },
  Pagination: {
    totalPage: "共 %total 条",
    total: "%page 页",
    size: "%size 条/页",
    go: "前往",
    goSuffix: "页",
  },
  Tree: {
    emptyText: "暂无数据",
  },
  TreeTable: {
    emptyText: "暂无数据",
  },
  DateRangePicker: {
    locale: zhCN,
    format: "yyyy-MM-dd",
  },
  Uploader: {
    placeholder: "请拖动文件到此处或者点击选择文件",
    uploadText: "上传",
    maxFilesExceeded: "已达到最大文件数量限制",
    partialFilesAdded: "，只能再添加 %count 个文件",
  },
  DatePicker: {
    locale: zhCN,
    format: "yyyy-MM-dd",
    presetPlaceholder: "快速选择",
    options: [
      {
        label: "今天",
        value: "0",
      },
      {
        label: "明天",
        value: "1",
      },
      {
        label: "三天后",
        value: "3",
      },
      {
        label: "一周后",
        value: "7",
      },
      {
        label: "一月后",
        value: "30",
      },
    ],
  },
  Empty: {
    text: "暂无数据",
  },
};

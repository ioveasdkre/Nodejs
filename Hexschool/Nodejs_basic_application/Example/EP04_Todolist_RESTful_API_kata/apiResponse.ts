/* 回傳只有訊息 */
interface ResultMessage {
  code: number; // 回傳代碼
  message?: string; // 回傳訊息
}

/* 回傳包含資料 */
interface ResultModel<T> {
  code: number; // 回傳代碼
  message?: string; // 回傳訊息
  data?: T; // 回傳資料
}

interface DataTable<T> {
  tableDataList: T[]; // 資料表資料列表
  tableTotalCount: number; // 資料表總筆數
}

export { ResultMessage, ResultModel, DataTable };

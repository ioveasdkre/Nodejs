import http, { IncomingMessage, ServerResponse } from "http";
import mongoose from "mongoose";

// 連線到 MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/hotel")
  .then(() => console.log("資料庫連線成功"))
  .catch((error: Error) => console.log(error));

// 定義資料表結構
const roomSchema = new mongoose.Schema({
  name: String,
  price: {
    type: Number,
    require: [true, "欄位必填"],
  },
  rating: Number,
});

// 操作資料庫 CRUD
const Room = mongoose.model("Room", roomSchema);

//#region requestListener [ 請求監聽器 ]
/**
 * 請求監聽器
 * @param req request 請求
 * @param res response 回覆
 */
const requestListener = (req: IncomingMessage, res: ServerResponse): void => {
  console.log(req.url);
  res.end();
};
//#endregion

// 建立 http 伺服器
const server = http.createServer(requestListener);

// 設定伺服器監聽的 port
const port = 3005;

// 啟動伺服器
server.listen(port);

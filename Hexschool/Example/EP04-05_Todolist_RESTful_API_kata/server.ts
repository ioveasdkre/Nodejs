import http, { IncomingMessage, ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";

const todos = [
  {
    id: uuidv4(),
    title: "今天要刷牙",
  },
  {
    id: uuidv4(),
    title: "今天要吃早餐",
  },
];

// 請求監聽器
// request 請求
// response 回覆
const requestListenet = (req: IncomingMessage, res: ServerResponse) => {
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET, OPTIONS, DELETE",
    "Content-Type": "application/json",
  };

  const setRes = (
    title: number,
    headersObj: { [key: string]: string },
    write?: { title: string; data: any[] } | { title: string; massage: string }
  ) => {
    // 設置 HTTP 狀態碼為 200，並設置標頭 headers
    res.writeHead(title, headersObj);

    if (write) res.write(JSON.stringify(write)); // 回傳 write 字串

    // 結束回應
    res.end();
  };

  // console.log("req.url: ", req.url);
  // console.log("req.method: ", req.method);

  if (req.url === "/todos" && req.method === "GET") {
    // 如果請求方法為 GET 且路徑為 /，回傳 "index" 字串
    setRes(200, headers, { title: "success", data: todos });
  } else if (req.url === "/todos" && req.method === "POST") {
    // 如果請求方法為 GET 且路徑為 /，回傳 "index" 字串
    setRes(200, headers, { title: "success", data: todos });
  } else if (req.method === "OPTIONS") {
    setRes(200, headers);
  } else {
    // 其他情況，回傳 "not found 404" 字串
    setRes(404, headers, {
      title: "not found 404",
      massage: "無此網路路由",
    });
  }
};

// 建立 HTTP 伺服器並設置請求監聽器
const server = http.createServer(requestListenet);

// 啟動伺服器，監聽 3005 port
server.listen(3005);

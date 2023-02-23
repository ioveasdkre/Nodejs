import http, { IncomingMessage, ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";
import { ResultMessage, ResultModel } from "./apiResponse";
import { errorHandle } from "./errorHandle";

interface Todo {
  id: string;
  title: string;
}

//#region [ 本地儲存變數 todos ]
/**
 * 本地儲存變數 todos
 */
const todos: ResultModel<Todo[]> = {
  code: 200,
  message: "success",
  data: [
    {
      id: uuidv4(),
      title: "今天要刷牙",
    },
    {
      id: uuidv4(),
      title: "今天要吃早餐",
    },
  ],
};
//#endregion

//#region setTodos [ 設定 todo ]
/**
 * 設定 todo
 * @param title
 * @returns Todo
 */
const setTodos = (title: string): Todo => {
  return {
    id: uuidv4(),
    title: title,
  };
};
//#endregion

//#region requestListener [ 請求監聽器 ]
/**
 * 請求監聽器
 * @param req request 請求
 * @param res response 回覆
 */
const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET, OPTIONS, DELETE",
    "Content-Type": "application/json",
  };

  let body: string = "";

  req.on("data", (chunk: string) => {
    // console.log(chunk); // Buffer 是 Node.js 中一個核心模組，用於處理二進制數據，例如圖片、音頻、視頻等
    body += chunk;
  });

  const setRes = <T>(
    statusCode: number,
    headersObj: { [key: string]: string },
    write?: ResultMessage | ResultModel<T>
  ) => {
    // 設置 HTTP 狀態碼為 200，並設置標頭 headers
    res.writeHead(statusCode, headersObj);

    if (write) res.write(JSON.stringify(write)); // 回傳 write 字串

    // 結束回應
    res.end();
  };

  const postRes = (
    statusCode: number,
    headersObj: { [key: string]: string }
  ) => {
    req.on("end", () => {
      try {
        const titleText: string = JSON.parse(body).title;

        if (titleText !== undefined) {
          todos.data?.push(setTodos(titleText));
          setRes(statusCode, headersObj, todos);
        } else {
          errorHandle(res, 400, headersObj, "欄位未填寫正確，或無此 todo id");
        }
      } catch (err) {
        errorHandle(res, 400, headersObj, "欄位未填寫正確，或無此 todo id");
      }
    });
  };

  // console.log("req.url: ", req.url);
  // console.log("req.method: ", req.method);

  if (req.url === "/todos" && req.method === "GET") {
    // 如果請求方法為 GET 且路徑為 /，回傳 "index" 字串
    setRes(200, headers, todos);
  } else if (req.url === "/todos" && req.method === "POST") {
    // 如果請求方法為 GET 且路徑為 /，回傳 "index" 字串
    postRes(200, headers);
  } else if (req.method === "OPTIONS") {
    setRes(200, headers);
  } else {
    // 其他情況，回傳 "not found 404" 字串
    errorHandle(res, 404, headers, "無此網路路由");
  }
};
//#endregion

// 建立 HTTP 伺服器並設置請求監聽器
const server = http.createServer(requestListener);

// 啟動伺服器，監聽 3005 port
server.listen(3005);

import http, { IncomingMessage, ServerResponse } from "http";
import { ResultModel } from "./apiResponse";
import { errorHandle } from "./errorHandle";
import { todoList, setTodo, deleteTodo } from "./todoControllers";
import { Todo } from "./todoModel";
import { headersObj } from "./apiRequestModel";

//#region requestListener [ 請求監聽器 ]
/**
 * 請求監聽器
 * @param req request 請求
 * @param res response 回覆
 */
const requestListener = (req: IncomingMessage, res: ServerResponse): void => {
  const headers: headersObj = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET, OPTIONS, DELETE",
    "Content-Type": "application/json",
  };

  let body: string = "";

  req.on("data", (chunk: string) => {
    body += chunk;
  });

  const setResponse = (
    statusCode: number,
    headersObj: headersObj,
    massage: string
  ): void => {
    const result: ResultModel<Todo[]> = {
      code: statusCode,
      message: massage,
      data: todoList,
    };

    res.writeHead(statusCode, headersObj);

    if (result) res.write(JSON.stringify(result));

    res.end();
  };

  const postResponse = (statusCode: number, headersObj: headersObj): void => {
    req.on("end", () => {
      try {
        const titleText: string = JSON.parse(body).title;

        if (titleText !== undefined) {
          setTodo(titleText);
          setResponse(statusCode, headersObj, "新增資料成功");
        } else {
          errorHandle(res, 400, headersObj, "欄位未填寫正確，或無此 todo id");
        }
      } catch (err) {
        errorHandle(res, 400, headersObj, "欄位未填寫正確，或無此 todo id");
      }
    });
  };

  const deleteResponse = (statusCode: number, headersObj: headersObj, id?: string): void => {
    req.on("end", () => {
      try {
        if (id !== undefined) {
          deleteTodo(id);
          setResponse(statusCode, headersObj, "刪除資料成功");
        } else {
          errorHandle(res, 400, headersObj, "刪除資料發生錯誤");
        }
      } catch (err) {
        errorHandle(res, 400, headersObj, "刪除資料發生錯誤");
      }
    });
  };


  if (req.url === "/todos" && req.method === "GET") {
    setResponse(200, headers, "讀取資料成功");
  } else if (req.url === "/todos" && req.method === "POST") {
    postResponse(200, headers);
  } else if (req.url === "/todos" && req.method === "DELETE") {
    todoList.length = 0;
    setResponse(200, headers, "刪除資料成功");
  } else if (req.url?.startsWith("/todos/") && req.method === "DELETE") {
    const id = req.url.split("/").pop();
    
    deleteResponse(200, headers, id);
  } else if (req.method === "OPTIONS") {
    setResponse(200, headers, "預檢請求");
  } else {
    errorHandle(res, 404, headers, "無此網路路由");
  }
};
//#endregion

const server = http.createServer(requestListener);
const port = 3005;

server.listen(port);

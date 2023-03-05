import http, { IncomingMessage, ServerResponse } from "http";
import { ResultModel } from "./apiResponse";
import { errorHandle } from "./errorHandle";
import { todoList, setTodo, deleteTodo, patchTodo } from "./todoControllers";
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
          const resSet = setTodo(titleText);
          if (resSet) setResponse(statusCode, headersObj, "新增資料成功");
          else
            errorHandle(
              res,
              400,
              headersObj,
              "欄位未填寫正確，或無此 todo title"
            );
        } else {
          errorHandle(
            res,
            400,
            headersObj,
            "欄位未填寫正確，或無此 todo title"
          );
        }
      } catch (err) {
        errorHandle(res, 400, headersObj, "欄位未填寫正確，或無此 todo title");
      }
    });
  };

  const deleteResponse = (statusCode: number, headersObj: headersObj): void => {
    req.on("end", () => {
      try {
        const id: string | undefined = req.url?.split("/").pop();
        if (id !== undefined) {
          const resDelete: boolean = deleteTodo(id);

          if (resDelete) setResponse(statusCode, headersObj, "刪除資料成功");
          else errorHandle(res, 400, headersObj, "查無此 id");
        } else {
          errorHandle(res, 400, headersObj, "刪除資料發生錯誤");
        }
      } catch (err) {
        errorHandle(res, 400, headersObj, "刪除資料發生錯誤");
      }
    });
  };

  const patchResponse = (statusCode: number, headersObj: headersObj): void => {
    req.on("end", () => {
      try {
        const id: string | undefined = req.url?.split("/").pop();
        const titleText: string = JSON.parse(body).title;

        if (titleText !== undefined && id !== undefined) {
          patchTodo(id, titleText);
          setResponse(statusCode, headersObj, "編輯資料成功");
        } else {
          errorHandle(
            res,
            400,
            headersObj,
            "欄位未填寫正確，或無此 todo title 或 id"
          );
        }
      } catch (err) {
        errorHandle(
          res,
          400,
          headersObj,
          "欄位未填寫正確，或無此 todo title 或 id"
        );
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
    deleteResponse(200, headers);
  } else if (req.url?.startsWith("/todos/") && req.method === "PATCH") {
    patchResponse(200, headers);
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

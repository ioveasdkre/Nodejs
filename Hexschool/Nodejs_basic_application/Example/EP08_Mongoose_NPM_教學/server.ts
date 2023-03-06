import http, { IncomingMessage, ServerResponse } from "http";
import { Room, IRoom } from "./models/room";
import mongoose from "mongoose";

// 連線到 MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/hotel")
  .then(() => console.log("資料庫連線成功"))
  .catch((error: Error) => console.log(error));

//#region requestListener [ 請求監聽器 ]
/**
 * 請求監聽器
 * @param req request 請求
 * @param res response 回覆
 */
const requestListener = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  const headers: { [key: string]: string } = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET, OPTIONS, DELETE",
    "Content-Type": "application/json",
  };

  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  if (req.url === "/rooms" && req.method === "GET") {
    const rooms = await Room.find();
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        rooms,
      })
    );
    res.end();
  } else if (req.url === "/rooms" && req.method === "POST") {
    req.on("end", async () => {
      try {
        const data: IRoom = JSON.parse(body);
        const newRoom = await Room.create({
          name: data.name,
          price: data.price,
          rating: data.rating,
        });

        res.writeHead(200, headers);
        res.write(
          JSON.stringify({
            status: "success",
            rooms: newRoom,
          })
        );
        res.end();
      } catch (error) {
        res.writeHead(400, headers);
        res.write(
          JSON.stringify({
            status: "false",
            message: "請檢查欄位以及格式是否正確。",
            error: error,
          })
        );
        res.end();
      }
    });
  }
};
//#endregion

// 建立 http 伺服器
const server = http.createServer(requestListener);

// 設定伺服器監聽的 port
const port = 3005;

// 啟動伺服器
server.listen(port);

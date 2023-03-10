import http, { IncomingMessage, ServerResponse } from "http";
import { Room, IRoom } from "./models/room";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../config.env") });

console.log(process.env.PORT);

const DB: string = process.env.DATABASE!.replace(
  "<password>",
  process.env.DATABASE_PASSWORD!
);

console.log(DB);

// 連線到 MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/hotel")
  .then(() => console.log("資料庫連線成功"))
  .catch((error: Error) => console.log(error));

// 連線到 MongoDB
// mongoose
//   .connect(DB)
//   .then(() => console.log("資料庫連線成功"))
//   .catch((error: Error) => console.log(error));

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
      } catch (error) {
        res.writeHead(400, headers);
        res.write(
          JSON.stringify({
            status: "false",
            message: "請檢查欄位以及格式是否正確。",
            error: error,
          })
        );
      }
      res.end();
    });
  } else if (req.url === "/rooms" && req.method === "DELETE") {
    await Room.deleteMany({});
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        rooms: [],
      })
    );
    res.end();
  } else if (req.url?.startsWith("/rooms/") && req.method === "DELETE") {
    req.on("end", async () => {
      try {
        const id: string | undefined = req.url?.split("/").pop(); // 取最後一筆
        if (id) {
          const deleteRoom = await Room.findByIdAndDelete(id); // 如果文档不存在，返回 null。
          // const deleteRoom = await Room.findByIdAndRemove(id); // 如果文档不存在，返回 undefined。
          console.log(deleteRoom);
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              rooms: [],
            })
          );
        } else {
          res.writeHead(404, headers);
          res.write(
            JSON.stringify({
              status: "false",
              message: "刪除資料發生錯誤",
            })
          );
        }
      } catch (error) {
        res.writeHead(404, headers);
        res.write(
          JSON.stringify({
            status: "false",
            message: "刪除資料發生錯誤",
            error: error,
          })
        );
      }
      res.end();
    });
  } else if (req.url?.startsWith("/rooms/") && req.method === "PATCH") {
    req.on("end", async () => {
      try {
        const id: string | undefined = req.url?.split("/").pop(); // 取最後一筆
        if (id) {
          const data: IRoom = JSON.parse(body);

          const newRoom = await Room.findByIdAndUpdate(
            id,
            {
              name: data.name,
              price: data.price,
              rating: data.rating,
            },
            {
              new: true, // 回傳更改後的內容
            }
          );

          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              rooms: newRoom,
            })
          );
        } else {
          res.writeHead(404, headers);
          res.write(
            JSON.stringify({
              status: "false",
              message: "刪除資料發生錯誤",
            })
          );
        }
      } catch (error) {
        res.writeHead(404, headers);
        res.write(
          JSON.stringify({
            status: "false",
            message: "刪除資料發生錯誤",
            error: error,
          })
        );
      }
      res.end();
    });
  } else if (req.method === "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      })
    );

    res.end();
  }
};
//#endregion

// 建立 http 伺服器
const server = http.createServer(requestListener);

// 啟動伺服器
server.listen(process.env.PORT);

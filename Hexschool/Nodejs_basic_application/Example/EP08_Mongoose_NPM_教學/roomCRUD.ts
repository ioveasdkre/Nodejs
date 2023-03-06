import mongoose from "mongoose";

// 定義資料表結構
const roomSchema = new mongoose.Schema({
  name: String,
  price: { type: Number, required: true },
});

// 操作資料庫 CRUD
const Room = mongoose.model("Room", roomSchema);

// 實例化 instance，即使多傳欄位也只會新增 Room設定的欄位
const createRoom = new Room({ name: "總統套房", price: 111, rating: [12] });

export { createRoom };
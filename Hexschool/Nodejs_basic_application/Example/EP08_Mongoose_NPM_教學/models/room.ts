import mongoose from "mongoose";

// 定義資料表結構, 第二個 object為可選
const roomSchema = new mongoose.Schema(
  {
    name: String,
    price: { type: Number, required: [true, "價格必填"] },
    rating: Number,
    createdAt: {
      type: Date,
      default: Date.now, // 預設時間
      select: false, // 保護資料 不被搜尋出來
    },
  },
  {
    versionKey: false, // 取消 __V
    collection: "room", // 資料表名稱
    // timestamps: true, // 自動加入新增、修改時間欄位
  }
);

interface IRoom {
  name: String;
  price: { type: Number; required: [true, "價格必填"] };
  rating: Number;
}

// 開頭字小寫
// 結尾強制加上 s
const Room = mongoose.model("Room", roomSchema);

export { Room, IRoom };

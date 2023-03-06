import mongoose from "mongoose";
const { ValidationError } = mongoose.Error;
import { Room } from "./models/room";

// 實例化 instance，即使多傳欄位也只會新增 Room設定的欄位
const createRoom = new Room({ name: "總統套房", price: 111, rating: 12 });

// 新增資料方式一
createRoom
  .save()
  .then(() => console.log("新增資料成功"))
  .catch((error: Error) => {
    if (error instanceof ValidationError) {
      console.log(error.errors);
    } else {
      console.log(error);
    }
  });

// 新增資料方式二
Room.create({
  name: "總統超級單人房2",
  price: 200,
  rating: 4.5,
})
  .then(() => {
    console.log("新增資料成功");
  })
  .catch((error: Error) => {
    if (error instanceof ValidationError) {
      console.log(error.errors);
    } else {
      console.log(error);
    }
  });

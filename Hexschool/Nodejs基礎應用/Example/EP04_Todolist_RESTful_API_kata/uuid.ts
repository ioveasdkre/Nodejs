import { v4 as uuidv4 } from "uuid";

const uuid: string = uuidv4(); // 宣告 uuid 變數為字串型別，將 UUID v4 指派給它

console.log("UUID: ", uuid); // 輸出 uuid 變數

const obj = {
  title: "今天要刷牙",
  id: uuidv4(),
};

console.log("物件: ", obj); // 輸出 obj 變數

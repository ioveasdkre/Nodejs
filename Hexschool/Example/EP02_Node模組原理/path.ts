import path from "path";

console.log(path.dirname("/xx/yy/test.js")); // 查看資料夾路徑
console.log(path.join(__dirname, "/xx")); // 串接路徑
console.log(path.basename("/xx/yy/test.js")); // 讀取檔名
console.log(path.extname("/xx/yy/test.js")); // 讀取附檔名
console.log(path.parse("/xx/yy/test.js")); // 分析路徑

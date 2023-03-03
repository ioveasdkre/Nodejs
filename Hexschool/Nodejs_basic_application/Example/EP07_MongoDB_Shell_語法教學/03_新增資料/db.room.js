// 新增單筆資料
db.rooms.insertOne({ rating: 4.5, price: 1000, name: "標準單人房" });

// 新增多筆資料
db.rooms.insertMany([
  { rating: 4.5, price: 1000, name: "標準單人房" },
  { rating: 4.1, price: 2000, name: "豪華單人房" },
]);

// 查詢所有
db.rooms.find();

// 查詢單筆資料
db.rooms.findOne({
  price: 3000,
});

// 查詢多筆資料
db.rooms.find({
  price: 3000,
});

// 查詢設定多個條件
db.rooms.find({
  price: 3000,
  rating: 4,
});

// 查詢 price小於等於 1500的房間
db.rooms.find({
  price: {
    $lte: 1500,
  },
});

// 查詢 price大於等於 1500且 rating小於等於 4的房間
db.rooms.find({
  price: {
    $gte: 1500,
  },
  rating: {
    $lte: 4,
  },
});

// 保護查詢 指返回 name其餘欄位不反回， _id一定要設定成 0，不然預設會返回
// 0表示不返回 1表示返回
db.rooms.find(
  {
    name: /華/,
  },
  { _id: 0, name: 1 }
);

// 查詢 指定值是否存在於陣列中
// 下列會找出 payment: [ '信用卡', 'ATM' ] or [ 'ATM' ] or [ '信用卡' ]
db.rooms.find({
  payment: {
    $in: ["信用卡", "ATM"],
  },
});

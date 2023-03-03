// 刪除單筆資料
db.rooms.deleteOne(
  {
    _id: ObjectId("64015acdf63913ca48b8eb90"),
  }
);

// 刪除多筆資料
db.rooms.deleteMany(
  {
    rating: 4.8,
  },
);

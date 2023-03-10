### 1. 刪除單筆資料

```shell
db.rooms.deleteOne(
  {
    _id: ObjectId("64015acdf63913ca48b8eb90"),
  }
);
```

### 2. 刪除多筆資料

```shell
db.rooms.deleteMany(
  {
    rating: 4.8,
  },
);
```

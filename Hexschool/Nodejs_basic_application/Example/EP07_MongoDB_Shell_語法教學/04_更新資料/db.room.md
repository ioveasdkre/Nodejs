### 1. 更新單筆資料

```shell
db.rooms.updateOne(
  {
    _id: ObjectId("64015acdf63913ca48b8eb90"),
  },
  {
    $set: {
      name: "總統套房",
      rating: 5,
    },
  }
);
```

### 2. 更新多筆資料

```shell
db.rooms.updateMany(
  {
    rating: 4.5,
  },
  {
    $set: {
      rating: 0,
    },
  }
);
```

### 3. 完成更新單筆資料(所有欄位資料)

```shell
db.rooms.replaceOne({ name: "標準單人房" }, { name: "標準單人升級房" });
```

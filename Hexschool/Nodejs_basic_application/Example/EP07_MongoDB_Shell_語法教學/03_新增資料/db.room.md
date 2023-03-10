### 1. 新增單筆資料

```shell
db.rooms.insertOne({ rating: 4.5, price: 1000, name: "標準單人房" });
```

### 2. 新增多筆資料

```shell
db.rooms.insertMany([
  { rating: 4.5, price: 1000, name: "標準單人房" },
  { rating: 4.1, price: 2000, name: "豪華單人房" },
]);
```

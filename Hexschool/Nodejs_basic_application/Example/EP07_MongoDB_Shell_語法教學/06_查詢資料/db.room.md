### 1. 查詢所有

```shell
db.rooms.find();
```

### 2. 查詢單筆資料

```shell
db.rooms.findOne({
  price: 3000,
});
```

### 3. 查詢多筆資料

```shell
db.rooms.find({
  price: 3000,
});
```

### 4. 查詢設定多個條件

```shell
db.rooms.find({
  price: 3000,
  rating: 4,
});
```

### 5. 查詢 price 小於等於 1500 的房間

```shell
db.rooms.find({
  price: {
    $lte: 1500,
  },
});
```

### 6. 查詢 price 大於等於 1500 且 rating 小於等於 4 的房間

```shell
db.rooms.find({
  price: {
    $gte: 1500,
  },
  rating: {
    $lte: 4,
  },
});
```

### 7. 保護查詢

指返回 `name` 欄位，其餘欄位不返回，`_id` 一定要設定成 `0`，不然預設會返回。

- `0` 表示不返回，`1` 表示返回。

```shell
db.rooms.find(
  { name: /華/ },
  { _id: 0, name: 1 }
);
```

### 8. 查詢 指定值是否存在於陣列中

下列會找出 payment: [ '信用卡', 'ATM' ] or [ 'ATM' ] or [ '信用卡' ]

```shell
db.rooms.find({
  payment: {
    $in: ["信用卡", "ATM"],
  },
});
```

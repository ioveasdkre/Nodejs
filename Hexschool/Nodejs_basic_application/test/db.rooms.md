```shell
db.rooms.insertMany([
  {
    rating: 4.5,
    price: 1000,
    name: "標準單人房",
    payment: ["信用卡", "ATM"],
  },
  {
    rating: 4.3,
    price: 1500,
    name: "豪華單人房",
    payment: ["信用卡", "ATM"],
  },
  {
    rating: 4.8,
    price: 2000,
    name: "標準雙人房",
    payment: ["信用卡", "ATM"],
  },
  {
    rating: 4.7,
    price: 2500,
    name: "豪華雙人房",
    payment: ["ATM"],
  },
  {
    rating: 4.0,
    price: 3000,
    name: "標準四人房",
    payment: ["現金"],
  },
  {
    rating: 3.5,
    price: 10000,
    name: "總統套房",
    payment: ["現金"],
  },
]);
```
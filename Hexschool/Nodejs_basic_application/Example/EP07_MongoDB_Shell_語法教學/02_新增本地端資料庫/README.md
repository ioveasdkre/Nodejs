[MongoDB 新增 Document 文件] (https://www.mongodb.com/docs/manual/tutorial/insert-documents/)

顯示各個資料庫：show dbs
切換資料庫：use [資料庫名稱]
新增資料到 collections： db.rooms.insertOne({"rating":4.5,"price":1000,"name":"標準單人房"})
尋找資料：db.rooms.find()
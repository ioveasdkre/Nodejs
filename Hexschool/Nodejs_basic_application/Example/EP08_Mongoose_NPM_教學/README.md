mongoose.Schema 負責設計和定義文件的結構、屬性類型、驗證規則等，它是一個中介物件，定義完後可以透過它建立 Model 。

mongoose.model 則是負責建立並操作 MongoDB 的文件的 Model ，透過 Model 可以對資料進行 CRUD 操作。在使用時需要傳入兩個參數，第一個參數是 Model 的名稱，第二個參數是該 Model 所對應的 Schema 。例如：mongoose.model("User", UserSchema); 表示建立一個名為 User 的 Model，對應的 Schema 為 UserSchema 。

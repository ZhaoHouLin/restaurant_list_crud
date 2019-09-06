###### Tags: `Node.js` `Express.js` `Handlebars` `stylus` `mongoDB` `mongoose`

# 你的餐廳清單CRUD
結合mongoDB實現CRUD功能
此網站推薦一些美食餐廳給您參考，有評價星數、點擊可瀏覽餐廳詳細資訊，也可以搜尋餐廳名稱、分類。

---
## 網頁畫面
![image](https://github.com/ZhaoHouLin/restaurant_list_crud/blob/master/demo/1.jpg)
![image](https://github.com/ZhaoHouLin/restaurant_list_crud/blob/master/demo/2.jpg)
![image](https://github.com/ZhaoHouLin/restaurant_list_crud/blob/master/demo/3.jpg)

## 此專案用到的套件
* **node.js:** v10.16.3
* **express:** "^4.17.1"
* **express-handlebars:** "^3.1.0"
* **"mongoose":** "^5.6.12"
* **stylus:** "^0.54.7"

## 需用到的程式
* **MongoDB 4.0.12**
* **Robo 3T 1.3.1**

## 安裝與執行方式
**1. 執行MongoDB 與 Robo 3T

**2. 打開終端機輸入以下指令複製專案到電腦上**
```git=
git clone https://github.com/ZhaoHouLin/restaurant_list_crud.git
```

**3. 進入專案資料夾**
```=
cd restaurant_list_crud
```

**4. 使用VSCode開啟**
```=
code .
```

**5. 安裝相關此專案相關套件**
```npm=
npm install
```

**6. 進到models/seeds執行restaurantSeeder.js 上傳預設資料到資料庫**
```
cd models/seed
node restaurantSeeder.js
```

**7. 開啟伺服器**
```=
npm run dev
```

**8.出現以下log表示開啟成功**
```
http://localhost:3000
mongodb connected!
```
將上方網址複製貼上瀏覽器網址列，即可開啟網頁




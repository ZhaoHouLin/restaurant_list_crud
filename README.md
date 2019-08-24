###### Tags: `Node.js` `Express.js` `Handlebars` `stylus`

# 你的餐廳清單
此網站推薦一些美食餐廳給您參考，有評價星數、點擊可瀏覽餐廳詳細資訊，也可以搜尋餐廳名稱

---
## 網頁畫面
![](https://i.imgur.com/iOltsCK.jpg)
![](https://i.imgur.com/xaUyZzl.jpg)
![](https://i.imgur.com/DqlCOxf.jpg)

## 此專案用到的套件
* **node.js:** v10.16.3
* **express:** "^4.17.1"
* **express-handlebars:** "^3.1.0"
* **stylus:** "^0.54.7"

## 安裝與執行方式
**1.打開終端機輸入以下指令複製專案到電腦上**
```git=
git clone
```

**2.進入專案資料夾**
```=
cd
```

**3.使用VSCode開啟**
```=
code .
```

**4.安裝相關此專案相關套件**
```npm=
npm install
```

**5.開啟伺服器**
```=
npm run dev
```

**6.出現以下log表示開啟成功**
```
http://localhost:3000
```
將上方網址複製貼上瀏覽器網址列，即可開啟網頁


## 補充說明 Stylus
stylus 為CSS的前處理器
要使用他修改樣式可先用以下指令:

1.進入css檔的存放位置
```=
cd public/stylesheets
```
2.自動監聽轉換style.styl至style.css
```stylus=
stylus -w style.styl -o style.css
```
-w 幫你監聽轉換成css
-o 輸出成css檔

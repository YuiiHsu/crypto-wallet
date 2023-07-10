# Web3.0 Wallet

## 前言
目前私鑰導入功能還沒開發，僅能從 Metamask導入喔!
持續開發與優化中~

## 前置條件
1. Metamask 帳號
2. Ganache rpc server：目前因都是使用 ganache 上的測試幣來測試功能，之後預計會改成沒有 Ganache rpc server 也可使用！
（https://medium.com/@yuideveloper/超詳細手把手發幣只要幾分鐘-db40c19a95f9）

## 如何執行
step 1: clone this repository from GitHub
step 2: npm i
step 3: npm start

就成功囉!!
預期您應該會看到
<img src="https://i.imgur.com/tuCUHos.png">
<img src="https://i.imgur.com/wSLMQ3Z.png">
<img src="https://i.imgur.com/JOFOmK5.png">
<img src="https://i.imgur.com/VyyFGu3.png">

## 架構
<img src="https://i.imgur.com/Fw7WRpn.png">

## 第三方套件
- dotnev:
用途：將 .env 裡的環境參數載入到 process.env 。減少 import 避免敏感資訊的洩漏。
- env-cmd:
用途：管理 env 環境，如果 .env-cmdrc 被修改，需要重新 run 才會吃到最新。
- webpack:
用途：打包 js
- @metamask/sdk: 
用途：Metamask 提供的工具包。
- redux:
用途：保存全域變數，確保共用的資料共同來源以及即時性。
- redux-saga:
用途：處理 Redux 異步處理
- redux-logger:
- ethereumjs-tx:
用途：發起交易時，拿來簽章 rawTx
- axios:
用途：管理 api request 和 response。
- lodash:
用途：js library，我用來處理深拷貝。
- bignumber.js
用途：用於數字很大的處理。
- uuid:
用途：產生唯一值
- ESLint（standard）:
用途：統一 coding style、找出語法錯誤、找出多餘程式碼。
- indent-rainbow: 
用途：縮排有彩虹的顏色，方便查看。

## 註解原則
function以及 API 相關會寫註解，
其餘覺得命名不夠明確，或邏輯比較複雜就會寫。

## 遇到的困難、問題與解法
問題：要測試 Transaction 需要幣
解法：，本來想用 goerli 測試網路來測試，但很難取得幣，所以想要自己發測試幣，最後用了 Ganache。

問題：需要重新評估要使用 Redux 還是 Context。 

## 之後想優化、修正的地方
1. 本來價格跟漲跌幅想接 Coinmarketcap api，但由於他們基於安全性考量 browser 打會 cors，要透過後端，所以之後想嘗試用 Node.js 寫打打看，如果成功就當取匯率的備用來源。

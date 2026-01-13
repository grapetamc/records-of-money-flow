# records-of-money-flow

Google Apps Script (GAS) + Google Sheets (スプレッドシート) を用いて家計簿的なものを作成した．

GASで生成したWebUIを通じてSheetsに入力できる．

対応している具体的な操作

- 入金
  - 日付，金額，口座，etcを指定して入金
- 出金
  - 日付，金額，口座，etcを指定して出金
- 移動
  - 日付，金額，移動元と移動先の口座，etcを指定してお金の移動

入力したデータを煮たり焼いたりすると好みの家計簿ができるでしょう．

## index.html
categoriesDataやaccountsDataでカテゴリや口座の情報をカスタマイズできる．

<img width="458" height="1125" alt="image" src="https://github.com/user-attachments/assets/ad5c5137-2837-41f0-86c8-539174d4ba37" />

## Google Sheets 側の設定

## main.js (code.gs)
特に変えるべき点はない．

### view() (オプション)
Gmailに来るビューカードの利用通知から，自動的にGoogle Sheetsに登録する関数．

利用する場合はmain.jsに加え，定期実行するとよい．

Google Sheets側にview_cardという名前のシートを作成し，次の図のように設定する．

<img width="801" height="77" alt="image" src="https://github.com/user-attachments/assets/329b4724-7b2c-47d4-ac25-b1d7c725af14" />


### rakuten() (オプション)
Gmailに来る楽天デビットの利用通知から，自動的にGoogle Sheetsに登録する関数．

利用する場合はmain.jsに加え，定期実行するとよい．

Google Sheets側にrakuten_debitという名前のシートを作成し，次の図のように設定する．
即時通知なのでメール受信日時を決済日時としている．

<img width="568" height="108" alt="image" src="https://github.com/user-attachments/assets/8e9ba938-8736-40ba-9657-e03d4ae65e02" />



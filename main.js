// Webアプリとしてアクセスした時にHTMLを表示する関数
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('家計簿入力GUI')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// フォームから送られてきたデータをスプレッドシートに書き込む関数
function processForm(formObject) {
  // スプレッドシートの取得
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var type = formObject.type; // 支出, 収入, 資金移動
  var sheet = ss.getSheetByName(type);
  
  if (!sheet) {
    return "エラー: シート '" + type + "' が見つかりません";
  }

  // 共通データ
  var date = formObject.date;
  var amount = formObject.amount;
  var memo = formObject.memo;
  var tag = formObject.tag;

  if (type === "移動") {
    // 資金移動シート: [日付, 移動元, 移動先, 金額, メモ]
    var fromAccount = formObject.fromAccount;
    var toAccount = formObject.toAccount;
    sheet.appendRow([date, fromAccount, toAccount, amount, memo]);
  } else {
    // 支出・収入シート: [日付, 費目, 口座, 金額, タグ, メモ]
    var category = formObject.category;
    var account = formObject.account;
    sheet.appendRow([date, category, account, amount, tag, memo]);
  }
  
  return "保存しました！ (" + type + ")";
}

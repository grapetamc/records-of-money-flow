function rakuten() {
  var query_rakuten = 'from:"楽天銀行株式会社" subject:"【楽天銀行】◆デビットカードご利用通知メール◆ポイント獲得仮確定のお知らせ"';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("rakuten_debit");

  let last_date = sheet.getRange(parseInt(sheet.getLastRow()),1).getValue();
  Logger.log("last:" + last_date);
  let threads = GmailApp.search(query_rakuten, 0, 5);
  threads.reverse();
  for(let th=0; th<threads.length; th++){
    let msgs = threads[th].getMessages();
    for(let ms=0; ms<msgs.length; ms++){
      if (msgs[ms].getDate() > last_date){
        writing = [];
        writing.push(msgs[ms].getDate());
        let amountMatch = msgs[ms].getPlainBody().match(/口座引落分：.*円/);
        writing.push(amountMatch[0].slice(6,-1));
        let pointMatch = msgs[ms].getPlainBody().match(/ポイント利用分：.*ポイント/);
        writing.push(pointMatch[0].slice(8,-4))
        Logger.log(writing);
        sheet.appendRow(writing);
      }
    }
  }
}

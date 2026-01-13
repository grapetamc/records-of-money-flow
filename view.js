function view(){
  var query_view = 'from:"株式会社ビューカード" subject:"－確報版－ ビューカードご利用情報のお知らせ（本人会員利用）"';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("view_card");

  let last_date = sheet.getRange(parseInt(sheet.getLastRow()),4).getValue();
  Logger.log("last:" + last_date);
  let threads = GmailApp.search(query_view, 0, 5);
  threads.reverse();
  for(let th=0; th<threads.length; th++){
    let msgs = threads[th].getMessages();
    for(let ms=0; ms<msgs.length; ms++){
      if (msgs[ms].getDate() > last_date){
        writing = [];
        let dateMatch = msgs[ms].getPlainBody().match(/利用日.*/);
        writing.push(dateMatch[0].slice(7));
        let amountMatch = msgs[ms].getPlainBody().match(/利用金額.*/);
        writing.push(amountMatch[0].slice(7,-1).replace(/,/g, ''));
        let storeMatch = msgs[ms].getPlainBody().match(/利用加盟店.*/);
        writing.push(storeMatch[0].slice(7))
        writing.push(msgs[ms].getDate());
        Logger.log(writing);
        sheet.appendRow(writing);
      }
    }
  }
}

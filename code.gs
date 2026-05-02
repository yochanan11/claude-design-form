// Google Apps Script — שמירת נרשמים לגוגל שיטס
// הדבק קוד זה ב-Apps Script וה-Deploy כ-Web App

const SPREADSHEET_ID = '1TY2OiNmMs_B6iC4Z5PsOjX1PhzUMqyx-EWVMb3d0tqU';
const SHEET_NAME     = 'Sheet1'; // שנה אם יש לך שם אחר לגיליון

function doGet(e) {
  try {
    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

    // הוסף כותרות אם הגיליון ריק
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['תאריך ושעה', 'שם מלא', 'טלפון', 'אימייל']);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }

    const data = e.parameter;

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('he'),
      data.fullName  || '',
      data.phone     || '',
      data.email     || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// לבדיקה ידנית מ-Apps Script editor
function testInsert() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['תאריך ושעה', 'שם מלא', 'טלפון', 'אימייל']);
  }
  sheet.appendRow([new Date().toLocaleString('he'), 'ישראל ישראלי', '0501234567', 'test@example.com']);
  Logger.log('שורת בדיקה נוספה בהצלחה');
}

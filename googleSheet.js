const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
 
 
 // If modifying these scopes, delete token.json.
 const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
 // The file token.json stores the user's access and refresh tokens, and is
 // created automatically when the authorization flow completes for the first
 // time.
 const TOKEN_PATH = path.join(process.cwd(), 'token.json');
 const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
 const { getDailyCodingChallenge } = require('./dailyChallenge');
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

/**
* Serializes credentials to a file comptible with GoogleAUth.fromJSON.
*
* @param {OAuth2Client} client
* @return {Promise<void>}
*/
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * description: authorize the google sheet api
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  }

 



/**
 * description: generate a new row request for the sheet
 */
function genNewRowRequest(tabId, startIndex, endIndex) {
  const newRowRequest = [{
    insertDimension: {
      range: {
        sheetId: tabId, // ex: "0"
        dimension: "ROWS",
        startIndex: startIndex, // 2
        endIndex: endIndex, // 3
      },
      inheritFromBefore: false,
    }
  }];
  return newRowRequest;
}

/**
 * description: add a new row to the sheet and fill it with daily question
 */
async function addQuestion(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const { questionTitle, questionLink } = await getDailyCodingChallenge();

  // insert a new row to the sheet
  const newRowRequest1 = genNewRowRequest("0", 2, 3);
  const newRowRequest2 = genNewRowRequest("2047905248", 2, 3); // for solution sharing tab

  const p1 = sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    resource: { requests: newRowRequest1 },
  });
  const p2 = sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.SHEET_ID,
    resource: { requests: newRowRequest2 },
  });

  await Promise.all([p1, p2]);

  // fill the new row with daily question
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;

  const hyperlink = `=HYPERLINK("${"https://leetcode.com" + questionLink}", "${questionTitle}")`;

  const list = [
    [month + '/' + day, hyperlink, '', '', '', '', '']
  ];

  const resource = {
    values: list,
  };

  const idList = process.env.MEMBER_IDS.split(', ');
  const totalMembers = idList.length;
  // C3: (C+totalMembers - 1)3
  const queryStringDone = `done!A3:${String.fromCharCode(67 + totalMembers - 1)}`;
  const queryStringSol = `solution sharing!A3:${String.fromCharCode(67 + totalMembers - 1)}`;
  const p3 = sheets.spreadsheets.values.update({
    spreadsheetId: process.env.SHEET_ID,
    range: queryStringDone,
    valueInputOption: 'USER_ENTERED',
    resource,
  });
  const p4 = sheets.spreadsheets.values.update({
    spreadsheetId: process.env.SHEET_ID,
    range: queryStringSol,
    valueInputOption: 'USER_ENTERED',
    resource,
  });
  await Promise.all([p3, p4]);
}

/**
 * description: get the done list of daily questions
 */
async function getDoneList(auth){
  const idList = process.env.MEMBER_IDS.split(', ');
  const totalMembers = idList.length;
  // C3: (C+totalMembers - 1)3
  const queryString = `done!C3:${String.fromCharCode(67 + totalMembers - 1)}3`;
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: queryString,
  });
  console.log(res.data.values);
  return res.data.values[0];
}

async function getAllTimeCount(auth){
  const idList = process.env.MEMBER_IDS.split(', ');
  const totalMembers = idList.length;
  // C1: (C+totalMembers - 1)1
  const queryString = `done!C1:${String.fromCharCode(67 + totalMembers - 1)}1`;
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: queryString,
  });
  console.log(res.data.values);
  return res.data.values[0];
}


module.exports = {authorize, addQuestion, getDoneList, getAllTimeCount};

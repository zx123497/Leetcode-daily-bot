
const schedule = require('node-schedule');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const fs = require('fs').promises;
const path = require('path');


// Just some constants
const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql'
const DAILY_CODING_CHALLENGE_QUERY = `
query questionOfToday {
	activeDailyCodingChallengeQuestion {
		date
		userStatus
		link
		question {
			acRate
			difficulty
			freqBar
			frontendQuestionId: questionFrontendId
			isFavor
			paidOnly: isPaidOnly
			status
			title
			titleSlug
			hasVideoSolution
			hasSolution
			topicTags {
				name
				id
				slug
			}
		}
	}
}`

// We can pass the JSON response as an object to our createTodoistTask later.
const fetchDailyCodingChallenge = async () => {
    console.log(`Fetching daily coding challenge from LeetCode API.`)

    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
    }

    const response = await fetch(LEETCODE_API_ENDPOINT, init)
    return response.json()
}

const getDailyCodingChallenge = async () => {
    const question = await fetchDailyCodingChallenge();
    const questionTitle = question.data.activeDailyCodingChallengeQuestion.question.title;
    const questionLink = question.data.activeDailyCodingChallengeQuestion.link;
    const questionDate = question.data.activeDailyCodingChallengeQuestion.date;
    return {questionTitle, questionLink, questionDate};
}


// google sheets api

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


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

  async function addQuestion(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    const question = await getDailyCodingChallenge();
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    // const date = question.questionDate.split('-')[1] + '/' + question.questionDate.split('-')[2];
    const list = [[month + '/' + day, "https://leetcode.com" + question.questionLink, '', '', '', '', '']];
    const resource = {
      values: list,
    };

    // add a new row to the sheet
    const request = [{ 
        insertDimension : {
            range : {
                sheetId : "0",
                dimension : "ROWS", 
                startIndex : 2,  
                endIndex : 3,
            },
            inheritFromBefore : false,
        } 
    }];
    const batchUpdateRequest = {requests: request};
    const res1 = await sheets.spreadsheets.batchUpdate({
        spreadsheetId: '1hhjTKal_UYRqSLyqW7Ex9SbMIPSUtMZ_bCpjIRYevig',
        resource: batchUpdateRequest,
    })
    
    // add question to the new row
    const res2 = await sheets.spreadsheets.values.update({
      spreadsheetId: '1hhjTKal_UYRqSLyqW7Ex9SbMIPSUtMZ_bCpjIRYevig',
      range: 'done!A3:G',
      valueInputOption: 'RAW',
      resource,
    });
  }

// update the sheet everyday at 3:01 pm
let job = schedule.scheduleJob('1 0 15 * * *', async function(){
    authorize().then(addQuestion).catch(console.error);
});






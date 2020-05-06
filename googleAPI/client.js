const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const SCOPES = require('./scopes');
const TOKEN_PATH = 'token.json';

/**
 * Load the contents of credentials.json for API authentication
 * @returns {Promise} A promise that returns credentials object if fulfilled
 */
async function readCredentials() {
    return new Promise((resolve, reject) => {
        fs.readFile('credentials.json', (err, content) => {
            if (err) {
                reject('Error reading client secret');
            }            
            resolve(JSON.parse(content));
        });
    });
}

/**
 * Retrieve the token from token file based on the provided client.
 * If no file is found, it is re-authenticated and token is stored in the file
 * @param {object} oAuth2Client client to Google API
 * @returns {Promise} returns token object if successful
 */
async function readToken(oAuth2Client) {
    return new Promise((resolve, reject) => {
        fs.readFile(TOKEN_PATH, async (err, token) => {
            try {
                if (err) {
                    let newToken = await getNewAccessToken(oAuth2Client);
                    resolve(newToken);
                }

                resolve(JSON.parse(token));
            } catch (error) {
                reject('Failed to get token');
            }
        });
    })
}

/**
 * Retrieve new token for the client and store it to 
 * @param {object} oAuth2Client client to Google API
 * @returns {Promise} token object if the authentication is successful
 */
async function getNewAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve, reject) => {
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();

            oAuth2Client.getToken(code, (err, token) => {
                if (err) {
                    console.error('Error retrieving access token', err);
                    reject('Error retrieving access token');
                }

                // Store the token to disk for later program executions
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) {
                        console.error(err);
                        reject('Error storing access token');
                    }
                    console.log('Token stored to', TOKEN_PATH);
                    resolve(token);
                });
            });
        });
    });
}

/**
 * This method returns a oAuth client to be used for Google API calls
 * It retrieves the credentials and token to authorize the client
 *  
 * @returns {Promise} oAuth Client if successful
 */
const getoAuth2Client = async () => {    
    const credentials = await readCredentials();
    const { client_secret, client_id, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    const token = await readToken(oAuth2Client);

    oAuth2Client.setCredentials(token);
    return oAuth2Client;
}

module.exports = { getoAuth2Client };
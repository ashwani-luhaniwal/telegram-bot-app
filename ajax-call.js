const http = require('http');
const request = require('request');

let url = 'https://ldai5er9.wdf.sap.corp:44300/sap/opu/odata/SAP/Z_ASSET_MANAGEMENT_SRV/orderSet';
// let url = 'http://services.odata.org/TripPinRESTierService/People';

/*request(url, (err, res, body) => {
    console.log('Error: ', err);
    console.log('Response: ', res);
    console.log('Body: ', body);
});*/

request({
    url: url + '?$format=json',
    headers: {
        'Authorization': 'Basic TFVIQU5JV0FMOmUyZGhzZWFzaHVAQUtMJA==',
        'Content-Type': 'application/json',
        'x-csrf-token': 'Fetch'
    }
}, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        // csrfToken = response.headers['x-csrf-token'];
        // console.log('CSRF Token: ' + csrfToken);
        console.log('Error: ', error);
        console.log('Response: ', response);
        console.log('Body: ', body);
        // res.json(body);
        // bot.sendMessage(msg.chat.id, 'Error: ' + error);
        // bot.sendMessage(msg.chat.id, 'Response: ' + response);
        // bot.sendMessage(msg.chat.id, 'Body: ' + body);
    }
});
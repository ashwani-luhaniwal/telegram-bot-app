const http = require('http');
const request = require('request');

let url = 'https://ldai5er9.wdf.sap.corp:44300/sap/opu/odata/SAP/Z_ASSET_MANAGEMENT_SRV/orderSet';
// let url = 'http://services.odata.org/TripPinRESTierService/People';

/*request.post(url, {json: true}, function(err, res) {
    if (!err && res.statusCode === 200) {
        console.log(res);
    }
});*/

request(url, (err, res, body) => {
    console.log('Error: ', err);
    console.log('Response: ', res);
    console.log('Body: ', body);
});
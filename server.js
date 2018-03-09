const http = require('http'),
    express = require('express'),
    xml2js = require('xml2js'),
    app = express(),
    port = process.env.PORT;

let username = '',
    password = '';

let sapgw = {
    host: 'ldai5er9.wdf.sap.corp',
    port: '44300',
    headers: {
        'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
    }
}

// Action: Proxy an incoming (ie. from the user's browser)
function proxy(user_request, user_response) {
    // We're proxying calls,
    // so copy the path from the user request
    sapgw.path = user_request.url;

    // Use a client request to call SAP Gateway
    http.get(sapgw, function(sapgw_response) {
        // Include a content-type in the response header
        user_response.header('Content-Type', 'application/atom+xml;type=feed');
        
        // In Node, http responses are streams. You can just
        // pipe the response data from the Gateway to the user.
        sapgw_response.pipe(user_response);
    });
}

// Action: Generate an Excel workbook
function workbook(req, res) {
    sapgw.path = '/sap/opu/odata/SAP/Z_ASSET_MANAGEMENT_SRV/orderSet';

    http.get(sapgw, function(sapgw_response) {
        var xml = '';
        sapgw_response.on('data', function(chunk) {
            xml += chunk;
        });
        console.log(xml);

        sapgw_response.on('end', function() {
            var parser = new xml2js.Parser();

            parser.on('end', function(result) {
                console.log(result);

            });
        });
    });
}

app.get('/sap/*', proxy);

app.listen(3000);
var statix = require('node-static');
var http = require("http");
var url = require("url");
var dynamic = require("./dynamic");
var fileServer = new statix.Server('./public');

function handler(request,response) {
    var urlRecieved = request.url; // maybe complex string
    var urlObj = url.parse(urlRecieved);
    var pathname = urlObj.pathname; // maybe simpler string
    var parts = pathname.split("/"); // array of strings

    if (parts[1] == "dyn") {  // parts[0] is ""
        if(parts[2] == "getKeywords" || parts[2] == "getRecipe")
	    {
            dynamic.dynamic(response,urlObj);
	    }
    }
    else {
   		request.addListener('end',function () {
    	fileServer.serve(request, response)}).resume();
	}
}

var server = http.createServer(handler);
server.listen(20004);
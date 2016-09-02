// module to handle the dynamic Web pages
var http = require("http");
var request = require("request");

ann = require("./annotater");
ann.openDB();


function dynamic(response, urlObj) {
/*	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<h1>Hello Friends!</h1>");
	response.write("<p>"+urlObj.query+"</p>");
	response.write("<p>"+urlObj.pathname+"</p>");
	response.end();
*/	response.writeHead(200, {"Content-Type": "application/JSON"});
	keyword1 = urlObj.query.split("=");
//	var f2fObj = JSON.parse(recipes);
	
 //   response.write(f2fObj + "\r\n");
 	if(keyword1[0] == "keywords"){
 		f2fGetRecipeList(keyword1[1], response);
 	}
 	if(keyword1[0] == "id"){
 		f2fGetRecipe(keyword1[1], response);
 	}
//	f2fGetRecipeList(urlObj); 
 //   response.end();
 //   console.log(JSON.stringify(f2fObj, null, "   "));

}

function f2fGetRecipeList(keywords, response){
	

    request("http://food2fork.com/api/search?key=c0d01676583b990fa0fe24d9f75ea0db&q="+keywords, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            console.log("f2f says 200");
            fillInRecipeList(body,response);  // fillInRecipeList is the callback function; you need to write it
        } else {
            console.log("f2f says error", error);
        }
    })
}


function fillInRecipeList(body,response){
//	var responseJSON = JSON.parse(response);
//    for(i = 0; i < json.count; i++){    
    response.write(body);
/*    anotater = new ann.Annotater(body);
    anotater.annotate(function(newRecipeJSON) {
    // need code here to do display the annotated recipe
        response.write(newRecipeJSON);
       
    });
*/     response.end();
//    }
}

function fillInRecipeList2(body,response){
//  var responseJSON = JSON.parse(response);
//    for(i = 0; i < json.count; i++){    
//    response.write(body);
    anotater = new ann.Annotater(body);
    anotater.annotate(function(newRecipeJSON) {
    // need code here to do display the annotated recipe
        response.write(newRecipeJSON);
        response.end();
    });
    
//    }
}

function f2fGetRecipe(keywords, response){
    request("http://food2fork.com/api/get?key=c0d01676583b990fa0fe24d9f75ea0db&rId="+keywords, function (error, res, body) {
        if (!error && res.statusCode == 200) {
            console.log("f2f says 200");
            fillInRecipeList2(body,response);  // fillInRecipeList is the callback function; you need to write it
        } else {
            console.log("f2f says error", error);
        }
    });
}

// make this visible when the module is required
exports.dynamic = dynamic;



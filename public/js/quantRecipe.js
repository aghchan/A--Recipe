// BUTTON FUNCTION
var global;

function ajaxCall() {
    if(document.getElementById("node")){
        removeFromDOM();
    }
    // get the input 
    var keywords = document.getElementById("keywords").value;

    // construct the url we want to send
    // url has a pathname (/dyn/getKeywords) and a
    // query part (?keywords=..., where ... are the keywords)
    var keywordsQuery = "/dyn/getKeywords?keywords="+keywords;
//    var keywordsQuery = "key=c0d01676583b990fa0fe24d9f75ea0db="+keywords;

 //   keywords = keyword1 + "+" + keyword2;
    // make an object to use for communication
    var xmlhttp = new XMLHttpRequest();
    
    // set up callback function
    // trick to pass data when callback will be called 
    // with no arguments: have one function call another. 
    xmlhttp.onreadystatechange = function() {

	// check to see if http exchange was successful
	   if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	    // if so, call the real callback function
	    // xmlhttp.response is the body of the response
	    // we're hoping it will be the JSON we want
	       useAJAXdata(xmlhttp.response);
        }
    }

    // tell the object the url
    xmlhttp.open("GET",keywordsQuery,true); // true = asynch
    
    // actually send the http request
    xmlhttp.send();
}

// CALLBACK FUNCTION
function useAJAXdata(response) {
    // for now, just write input to console
/*    response.writeHead(200, {"Content-Type": "application/JSON"});
    response.write(f2fJSON);
    response.end();
    console.log("Sent dynamic response.");
*/  
    var f2fObj = JSON.parse(response);

    var node = document.createElement("div");
    node.id = "node";
    node.innerHTML = "Recipes";
    document.body.appendChild(node);

    for(i = 0; i < f2fObj.count; i++){
        addToDOM(document.getElementById("node"), "<li onclick=recipeLink("+f2fObj.recipes[i].recipe_id+") class='text'>"+f2fObj.recipes[i].title+"<li>");
    }
    global = document.body.innerHTML;
    console.log(document.body.innerHTML);
}

// Adds stuff to some element of the DOM
function addToDOM(element, someHTML) {
  var div = document.createElement('div');
  div.innerHTML = someHTML;
  element.appendChild(div);
}

function recipeLink(id){
    removeFromDOM();
    var keywordsQuery = "/dyn/getRecipe?id="+id;
//    var keywordsQuery = "key=c0d01676583b990fa0fe24d9f75ea0db="+keywords;

 //   keywords = keyword1 + "+" + keyword2;
    // make an object to use for communication
    var xmlhttp = new XMLHttpRequest();
    
    // set up callback function
    // trick to pass data when callback will be called 
    // with no arguments: have one function call another. 
    xmlhttp.onreadystatechange = function() {

    // check to see if http exchange was successful
       if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        // if so, call the real callback function
        // xmlhttp.response is the body of the response
        // we're hoping it will be the JSON we want
           useAJAXdata2(xmlhttp.response);
        }
    }

    // tell the object the url
    xmlhttp.open("GET",keywordsQuery,true); // true = asynch
    
    // actually send the http request
    xmlhttp.send();

}

function useAJAXdata2(response) {
    // for now, just write input to console
/*    response.writeHead(200, {"Content-Type": "application/JSON"});
    response.write(f2fJSON);
    response.end();
    console.log("Sent dynamic response.");
*/  
    var f2fObj = JSON.parse(response);

    addToDOM(document.body, "<p>"+f2fObj.recipe.title+"</p>");
    addToDOM(document.body, "<img src= " + f2fObj.recipe.image_url + ">" + "</img>");

    for(i = 0; i < f2fObj.recipe.ingredients.length; i++){
        addToDOM(document.body, "<li>"+f2fObj.recipe.ingredients[i]+"</li>");
    }

    addToDOM(document.body, "<button onclick=back()> Back </button>");
}

function removeFromDOM(){
    var node = document.getElementById("node");
    node.innerHTML = "";
    while(node.hasChildNodes()){
        node.removeChild(node.childNodes[0]);
    }
    node.parentNode.removeChild(node);
}

function back(){
    document.body.innerHTML = global;
}
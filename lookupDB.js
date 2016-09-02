var prompt = require('prompt');
 // prepare for keyboard input  
 prompt.start();                                 
var check = 1;

function getFood() {

    // issues the prompt and specifies the callback function                    
    // that is called when the user finally responds                            
    prompt.get('food',
               // callback function                                             
               function (err, result) {
               //     console.log(result);
              		check = 0;
                    lookup(result);

             //       console
              //      getFood();
               } // end callback function                                       
              ); // end prompt.get   


}

var fs = require("fs");  // use file system                                     
var sqlite3 = require("sqlite3").verbose();  // use sqlite                      

// global variable will contain database                                        
var db=null;

function openDB() {

    var dbFile = "fnw.db";
    // check filesystem to make sure database exists                            
    var exists = fs.existsSync(dbFile);

    if (!exists) {
        console.log("Missing database "+dbFile);
    } else {
        // construct Javascript database object to represent the                
        // database in our program. db is a global variable                     
        db = new sqlite3.Database(dbFile); // open it if not already there      
    }
}


openDB(); // open the database    
getFood();

function lookup(result){
//    console.log(result);
	
    db.get("SELECT * FROM WaterUsage WHERE ingredient =" +'"'+ result.food+'"', 
        function(err, result){
        	console.log(result);
        //    lookup(result);
        }
        
    );
//    console.log(result);
 	
 	getFood();
//	getFood();
}


//ingredient.indexOf(result.food) != -1 WHERE ingredient == result.food;
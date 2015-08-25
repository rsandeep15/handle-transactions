var fs = require('fs');
var path = require('path');
var formatter = require('./module_helpers');  
var MongoClient = require('mongodb').MongoClient;
var uploadJSON = function(file, autoclose){
	MongoClient.connect('mongodb://127.0.0.1:3001/meteor', function(err, db)
  {
		if (err)
		{
			console.log("Error connecting to database:" + db +   " with error: " + err); 
		}
		else
		{
		  var Transactions = db.collection('Transactions'); 
      var Files = db.collection('Files'); 
          if (path.extname(file) == '.json')
          {
            console.log(file + ": "); 
            console.log("");

            // Keep track of uploaded files
            var fileName = {};
            fileName["File_Name"] = file;  
            Files.insert(fileName, function(err, myDoc){ 
            if (err)
            {
              console.log("Could not upload fileName to collection");
            }
            });
            // Read a single file line by line and upload JSON docs to Mongo Database
            fs.readFile(file, 'utf8', function callback(err, data){
              if (err)
              {
                console.log("Error reading file: " + file + " with error: " + err);
              }
              else
              {
                var docArray = data.split("\n");
                for (index = 0; index < docArray.length; index++){
                var doc = docArray[index];
                if (doc != "")
                {
                  var newDoc = formatter.formatJSON(JSON.parse(doc));
                  Transactions.insert(newDoc, function(err, myDoc){
                    if (err)
                    {
                      console.log("Error inserting doc: " + myDoc + " with error: " + err );
                    }
                    else
                    {
                      console.log(myDoc);
                    }
                    });
                }
                }
              }
            });
          }
    }
    if (autoclose)
    {
      setTimeout(function(){
      // Protect Mongo Database from an extremely large influx of data: 
      // 60 seconds to fetch data from JSON files in a given directory.
      console.log("Closing Database for file: " + file);
      db.close();
      }, 60000);
    }
  }); 	
}
module.exports.uploadJSONToMongo = uploadJSON;
var fs = require('fs');
var uploader = require('./module_uploadfile');
// Must have Meteor running on localport:3000 for upload to Mongo to function !
var dir = process.argv[2]; 
// Reads all JSON files in a given directory 
fs.readdir(dir, 
function(err, files)
{
  if (err)
  {
    console.log("Error reading directory: " + dir + " with error: " + err); 
  }
  else
  {
    console.log("Opening the following files: ")
    console.log("");
    if (dir.charAt(dir.length - 1) != "/")
    {
      dir = dir.concat("/"); 
    }
    // For each file - format each JSON doc in file and insert it into the Mongo Database 
    for(i = 0; i < files.length; i++)
    {
      file = dir + files[i];
      uploader.uploadJSONToMongo(file, true);
    }
  }  
}); // End Read Directory

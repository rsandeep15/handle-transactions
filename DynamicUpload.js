var fs = require('fs');
var watch = require('watch'); 
var dir = process.argv[2];

if (dir.charAt(dir.length - 1) != "/")
{
    dir = dir.concat("/"); 
}
console.log("Waiting for new files in directory: " + dir + "..." );
var uploader = require('./module_uploadfile');  
watch.createMonitor(dir, function(monitor){
	var stat = dir + "/.zshrc";
	monitor.files[stat]; 
	monitor.on("created", function (file, stat){
		// Handle new files
		console.log("created: " + file);
		// No autoclose 
		uploader.uploadJSONToMongo(file, false); 
	})
	monitor.on("removed", function(file, stat)
	{
		console.log("removed: " + file); 
	})
});

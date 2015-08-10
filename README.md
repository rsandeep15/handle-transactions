# handle-transactions
<p>Use this node app to upload large JSON Transaction documents to the ZenLeaderBoard meteor application. </p>

* Use DynamicUpload.js to watch for new JSON Transaction files coming into the directory and
update the Mongo Database

    <b>node DynamicUpload.js /PATH/TO/DIRECTORY/</b>

* Use StaticUpload.js to read all existing JSON Transaction files in the directory and update
the Mongo Database

    <b>node StaticUpload.js /PATH/TO/DIRECTORY/</b>

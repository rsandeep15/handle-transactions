// Helper methods to format documents before inserting them into Mongo Database
var formatFile = function formatJSON (JSONDoc)
{
  var newJSON = {};
  if( typeof JSONDoc["items"] != 'undefined' && typeof JSONDoc["items"][0]["acctId"] != 'undefined')
  {
    newJSON["acctId"] = JSONDoc["items"][0]["acctId"].toString(); 
  }
  else if (typeof JSONDoc["acctId"] != 'undefined')
  {
    newJSON["acctId"] = JSONDoc["acctId"].toString(); 
  }
  else
  {
    newJSON["acctId"] = "Unknown"; 
  }

  if( typeof JSONDoc["items"] != 'undefined' && typeof JSONDoc["items"][0]["tranCode"] != 'undefined')
  {
    newJSON['tranCode'] = JSONDoc["items"][0]["tranCode"]; 
  }
  else if (typeof JSONDoc["tranCode"] != 'undefined')
  {
    newJSON['tranCode'] = JSONDoc['tranCode']; 
  }
  else
  {
    newJSON['tranCode'] = "Unknown"; 
  }

  if( typeof JSONDoc["items"] != 'undefined' && typeof JSONDoc['baseCurrency'] != 'undefined')
  {
    newJSON['baseCurrency'] = JSONDoc['baseCurrency']; 
  }
  else if (typeof JSONDoc['currency'] != 'undefined')
  {
    newJSON['baseCurrency'] = JSONDoc['currency']; 
  }
  else
  {
    newJSON['baseCurrency'] = "Unknown"; 
  }

  if (typeof JSONDoc["items"] != 'undefined' && typeof JSONDoc['items'][0]['currency'] != 'undefined')
  {
    newJSON['currency'] = JSONDoc['items'][0]['currency']; 
  }
  else if (typeof JSONDoc['currency'] != 'undefined')
  {
    newJSON['currency'] = JSONDoc['currency']; 
  }
  else
  {
    newJSON['currency'] = "Unknown"; 
  }

  if ( typeof JSONDoc["items"] != 'undefined' && typeof JSONDoc['items'][0]['amount'] != 'undefined' )
  {
    newJSON['amount'] = fixAmount(JSONDoc['items'][0]['amount']);
  }
  else if (typeof JSONDoc['amount'] != 'undefined')
  {
    newJSON['amount'] = fixAmount(JSONDoc['amount']); 
  }
  else
  {
    newJSON['amount'] = "Unknown"; 
  }

  if ( typeof JSONDoc['timeStamp'] != 'undefined')
  {
    newJSON['timeStamp'] = JSONDoc['timeStamp']; 
  }
  else if (typeof JSONDoc['hostDate'] != 'undefined')
  {
    newJSON['timeStamp'] = JSONDoc['hostDate']; 
  }
  else
  {
    newJSON['timeStamp'] = "Unknown"; 
  }
  return newJSON; 
}
function fixAmount (amount) {
  var amountStr = amount + ""; 
  var index = amountStr.indexOf("#");
  if (index >= 0)
  {
    return parseFloat(amountStr.substring(0, index)).toFixed(2); 
  }
  else
  {
    return parseFloat(amountStr).toFixed(2); 
  }
}
module.exports.formatJSON = formatFile; 
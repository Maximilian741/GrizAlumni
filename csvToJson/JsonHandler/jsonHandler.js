const backupFileLocation = '../BACKUP/BackupJsonFile/BACKUP.json';
var isBackupEnabled = false;

class JsonHandler {
    constructor(jsonFileLocation){
        const fs = require('fs');
        const path = require('path');
        // first we check if the back up json file excists in the backup folder
        // if it does not, then we initialize the json file using the json file location
        this.jsonFileLocation = jsonFileLocation;

        if (fs.existsSync(path.resolve(__dirname, backupFileLocation), "utf8")){
            // if the file exists, then we read the file and set the json object to the file contents
            this.jsonObject = JSON.parse(fs.readFileSync(path.resolve(__dirname, backupFileLocation), "utf8"));
        }
        else{
            this.jsonObject = JSON.parse(fs.readFileSync(path.resolve(__dirname, this.jsonFileLocation), "utf8"));
            isBackupEnabled = true;
        }
    }

    // function to just grab and return the json object in case of backup
    getJsonObjectFromBackup(){
        if (isBackupEnabled){
            return this.jsonObject;
        }
        else{
            return null;
        }
    }

    // function to clean the json object removing all the empty object and "\n" values
    cleanJsonObject(jsonObject){
        // first we need to remove all the empty objects
        for (let i = 0; i < jsonObject.length; i++){
            if (Object.keys(jsonObject[i]).length === 0){
                jsonObject.splice(i, 1);
            }
        }

        // then we need to remove all the "\n" values
        for (let i = 0; i < jsonObject.length; i++){
            for (let key in jsonObject[i]){
                if (jsonObject[i][key] === "\n"){
                    delete jsonObject[i][key];
                }
            }
        }
        return jsonObject;
    }

    // function to write the json object to the json file
    writeJsonObjectToFile(newJsonArray){
        const fs = require('fs');
        const path = require('path');
        // first we need to clean the json object
        const jsonobj = this.cleanJsonObject(newJsonArray);
        // then we need to write the json object to the json file
        fs.writeFileSync(path.resolve(__dirname, this.jsonFileLocation), JSON.stringify(jsonobj));
    }

    // function to seperate the json object by their keys
    seperateJsonObjectByKeys(){
        // the json object has two types of objects, generic and business
        // if the key is generic, then we can disregard it
        // if the key is business, then we need to seperate it into its own json object with all the other business objects
        // we will do this by creating a new json object and adding the business objects to it
        // then we will add the new json object to the json array

        // first we need to create a new json array
        const newJsonArray = [];
        // then we need to loop through the json object
        for (let i = 0; i < this.jsonObject.length; i++){
            // if the key is generic, then we can disregard it
            if (Object.keys(this.jsonObject[i])[0] === "generic"){
                continue;
            }
            // if the key is business, then we need to seperate it into its own json object with all the other business objects
            else{
                // we will do this by creating a new json object and adding the business objects to it
                const newJsonObject = {[Object.keys(this.jsonObject[i])[0]] : {}};
                // extract the keys from the business object
                const keys = Object.keys(this.jsonObject[i][Object.keys(this.jsonObject[i])[0]]);
                // loop through the keys
                for (let j = 0; j < keys.length; j++){
                    // add the key and value to the new json object
                    newJsonObject[Object.keys(this.jsonObject[i])[0]][keys[j]] = this.jsonObject[i][Object.keys(this.jsonObject[i])[0]][keys[j]];
                }
                // then we will add the new json object to the json array
                newJsonArray.push(newJsonObject);
            }
        }
        this.writeJsonObjectToFile(newJsonArray);
    }
}

exports = module.exports = JsonHandler;

// test the json handler
// const jsonHandler = new JsonHandler("../jsonStorage/Alumni.json");
// jsonHandler.seperateJsonObjectByKeys();
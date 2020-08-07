"use strict";

var fs = require('fs');
var  xml2js = require('xml2js');
var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

function updateConnString(){
	const argumentsArray = getArgumentsObjects();
	const settingsFile = `${argumentsArray["configPath"]}/connectionStrings.config`;
	console.log(settingsFile);
	fs.readFile( settingsFile, function(err, data) {
		parser.parseString(data, function (err, result) {
			var attrs = result["connectionStrings"]["add"][0]["$"];
			attrs["connectionString"] = argumentsArray["connectionString"];
			var xml = builder.buildObject(result);		
			fs.writeFile(settingsFile, xml, function(err, data) {
				if (err) {
				  console.error(err);
				}
				else {
				  console.log("Updated!!!");
				}
			  });
			
		});
	});
}

function getArgumentsObjects() {
	let configPath = "";
    const argumentsArray = [],
        args = process.argv.slice(2);
    for (let j = 0; j < args.length; j++) {
        const arg = args[j].split("=");
        argumentsArray[arg.shift()] = arg.join('=');
    }
    return argumentsArray;
}


updateConnString();
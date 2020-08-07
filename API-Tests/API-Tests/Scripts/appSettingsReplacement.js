"use strict";

const editJsonFile = require("edit-json-file");

replaceConfigVariables();

function getArgumentsObjects() {
    const argumentsArray = [],
        args = process.argv.slice(2);
    for (let j = 0; j < args.length; j++) {
        const arg = args[j].split("=");
        argumentsArray[arg.shift()] = arg.join('=');
    }
    return argumentsArray;
}

function replaceConfigVariables() {
    let configPath = "";
    const argumentsArray = getArgumentsObjects();
	let file = editJsonFile(`${argumentsArray["configPath"]}/appsettings.json`);
 
	file.set("ConnectionStrings.DefaultConnection", argumentsArray["defaultConnection"]);
	file.save();
	console.log("Updated!!! " + argumentsArray["defaultConnection"] +" // " + " " + configPath);
}
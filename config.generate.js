let fs = require("fs");

function generateConfigurationIfItDoesntExist(fileName, className, properties) {
    
    if (fs.existsSync(fileName)) {
        return;
    }

    let variableEntries = [];

    properties.forEach(property => {
        switch(property.type) {
            case "string":
                property.value = process.env[property.environmentVariableName] ? `"${process.env[property.environmentVariableName]}"` : undefined;
                break;
            case "boolean":
            case "number":
                property.value = process.env[property.environmentVariableName];
                break;
        }
        variableEntries.push(`${property.name}: ${property.type} = ${property.value};`)
    });

    let fileBody = `import { I${className} } from "./config.interface";
export class ${className} implements I${className} {
    ${variableEntries.join('\n    ')}
}`;

    fs.writeFileSync(fileName, fileBody);
}

let configInterfaceFilePath = "./config.interface.ts";
let configInterfaceContents = fs.readFileSync(configInterfaceFilePath, 'utf-8');
let interfaceBodyPattern = /I(\w*)\s*{([^}]*)/g;

let interfaceBodyMatch;
while((interfaceBodyMatch = interfaceBodyPattern.exec(configInterfaceContents)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if(interfaceBodyMatch.index === interfaceBodyPattern.lastIndex) {
        interfaceBodyPattern.lastIndex++;
    }
    
    let className = interfaceBodyMatch[1];
    let classBody = interfaceBodyMatch[2];

    let interfaceEntryPattern = /\s*\/\*\s*(process.env.\w*)\s*\*\/\s*(\w*)\s*:\s*(number|string|boolean)/g;
    let interfaceEntryMatch;
    let properties = [];
    while((interfaceEntryMatch = interfaceEntryPattern.exec(classBody)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if(interfaceEntryMatch.index === interfaceEntryPattern.lastIndex) {
            interfaceEntryPattern.lastIndex++;
        }
        properties.push({
            environmentVariableName: interfaceEntryMatch[1],
            name: interfaceEntryMatch[2],
            type: interfaceEntryMatch[3]
        });    
    }
    switch(className) {
        case "ClientConfiguration":
            generateConfigurationIfItDoesntExist("./config.client.ts", className, properties);
            break;
        case "ServerConfiguration":
            generateConfigurationIfItDoesntExist("./config.server.ts", className, properties);
            break;
        default:
            break;
    }
}



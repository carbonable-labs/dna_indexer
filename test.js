const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];
const fullPath = path.resolve(filePath);
const fileContent = fs.readFileSync(fullPath, 'utf8');
const jsonContent = JSON.parse(fileContent);
console.log(jsonContent.abi);

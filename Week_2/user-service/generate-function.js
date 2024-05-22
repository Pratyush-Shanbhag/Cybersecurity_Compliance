const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// Define the data to be used in the template
const data = {
  functionName: 'hello',
  handlerFile: 'hello.js',  // File name for the generated function file
  message: 'Hello, Serverless!'
};

// Path for the function template
const functionTemplatePath = path.join(__dirname, 'templates', 'function-template.ejs');

// Read the EJS template file
const functionTemplate = fs.readFileSync(functionTemplatePath, 'utf-8');

// Render the template with the data
const renderedFunction = ejs.render(functionTemplate, data);

// Define the output path for the rendered function file
const functionOutputPath = path.join(__dirname, 'src', 'functions', data.handlerFile);

// Write the rendered content to the function file
fs.writeFileSync(functionOutputPath, renderedFunction, 'utf-8');

console.log('Function file generated at', functionOutputPath);
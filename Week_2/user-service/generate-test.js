const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// Define the data to be used in the template
const data = {
  functionName: 'hello',
  handlerFile: 'hello.js',  // File name for the function file to be tested
  message: 'Hello, Serverless!'
};

// Path for the test template
const testTemplatePath = path.join(__dirname, 'templates', 'test-template.ejs');

// Read the EJS template file
const testTemplate = fs.readFileSync(testTemplatePath, 'utf-8');

// Render the template with the data
const renderedTest = ejs.render(testTemplate, data);

// Define the output path for the rendered test file
const testOutputPath = path.join(__dirname, 'src', 'tests', `${path.basename(data.handlerFile, '.js')}.test.js`);

// Ensure the tests directory exists
if (!fs.existsSync(path.join(__dirname, 'src', 'tests'))) {
  fs.mkdirSync(path.join(__dirname, 'src', 'tests'));
}

// Write the rendered content to the test file
fs.writeFileSync(testOutputPath, renderedTest, 'utf-8');

console.log('Test file generated at', testOutputPath);

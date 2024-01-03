// I HAD SOME ISSUES WITH GIT AND WASNT ABLE TO MAKE COMMITS REGUALRLY BUT I COMMENTED MY CHANGES WITHIN THE CODE

// Added inquirer
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = [
  // TITLE
  {
    type: 'input',
    message: 'Enter the title of your application',
    name: 'title',
    default: 'Project-Title',
  },
  // DESCRIPTION
  {
    type: 'input',
    message: 'Provide a short description of your application',
    name: 'description',
    default: 'This application will...',
  },
  // removed table of contents and implemented it later in the code
  // INSTALLATION
  {
    type: 'input',
    message: 'How can a user install your application',
    name: 'installation',
    default: 'How to install...',
  },
  // USAGE
  {
    type: 'input',
    message: 'What are the usage instructions for this application?',
    name: 'usage',
    default: 'To use this application...',
  },
  // LICENSE
  {
    type: 'input',
    message: 'What is the SPDX abbreviation of the license your application is using?',
    name: 'license',
    default: 'MIT, Apache-2.0,',
  },
  // CONTRIBUTION
  {
    type: 'input',
    message: 'Please enter the link to your REPO',
    name: 'contribute',
    default: 'ex: https://github.com/C-Dresser/readme-generator',
  },
  // TEST
  {
    type: 'input',
    message: 'Enter test instructions',
    name: 'test',
    default: 'Running a test...',
  },
  // QUESTIONS
  {
    type: 'input',
    message: 'Enter your GitHub username',
    name: 'questions',
    default: 'User-name',
  },
  {
    type: 'input',
    message: 'What email can users conact you at with questions?',
    name: 'email',
    default: 'none@donotreply.com'
  },
];
// added function to write readme content
function generateReadme(data) {
  // updated function to generate table of contents dynamically and link the sections
  // updated function to add a link to the user's GitHub profile
  //updated verbage of the readme contents
  const tableOfContents = `
  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [How to Contribute](#how-to-contribute)
  - [Tests](#tests)
  - [Questions](#questions)
    `;
// added license badge
//updated license badge url to properly implement user input
  return `
  ![LicenseBadge](https://img.shields.io/badge/License-${encodeURIComponent(data.license)}-brightgreen)

  # ${data.title}
  
  ${tableOfContents}
  
  ## Description
  ${data.description}
  
  ## Installation
  ${data.installation}
  
  ## Usage
  ${data.usage}
  
  ## License
  This app is using the ${data.license} license, linked here:
  [License Link](https://opensource.org/licenses/${data.license})
  
  ## How to Contribute
  Contributions to this app can be made here: [App Link](${data.contribute})
  
  ## Tests
  ${data.test}

  ## Questions
  If you have any questions, they can be directed here:
  [Profile Link](https://github.com/${data.questions}) or email me at ${data.email}.
    `;
}

// added function to write to a file, and create it if it doesn't exist
function writeToFile(fileName, data) {
  const readmeContent = generateReadme(data);

  if (!fs.existsSync('./output')) {
    fs.mkdirSync('./output');
  }

  fs.writeFileSync('./output/readme.md', readmeContent);
}

// added function to initialize the app
function init() {
  console.log('Init function called!');
  inquirer.prompt(questions).then((answers) => {
    writeToFile('readme.md', answers);
  });
}

init();

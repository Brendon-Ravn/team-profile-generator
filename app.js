const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const workArray = [];

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "Employee's name:"
  },
  {
    type: 'input',
    name: 'id',
    message: "Employee's id:"
  },
  {
    type: 'input',
    name: 'email',
    message: "Employee's email:"
  }
];

const engineerQuestions = [
  ...questions,
  {
    type: 'input',
    name: 'github',
    message: 'What is their GitHub username?'
  }
];

const internQuestions = [
  ...questions,
  {
    type: 'input',
    name: 'school',
    message: 'What is their current or most recent institute of education?'
  }
];

const managerQuestions = [
  ...questions,
  {
    type: 'input',
    name: 'officeNumber',
    message: "Manager's office number:"
  }
];

function engineerInfo() {
  inquirer.prompt(engineerQuestions)
    .then((response) => {
      const engineer = new Engineer(response.name, response.id, response.email, response.github);
      workArray.push(engineer);
      employeeInfo();
    });
}

function internInfo() {
  inquirer.prompt(internQuestions)
    .then((response) => {
      const intern = new Intern(response.name, response.id, response.email, response.school);
      workArray.push(intern);
      employeeInfo();
    });
}

function createHTML(){
  
    const html = render(workArray);
    fs.writeFile(outputPath, html, err => {
      if (err) {
        console.log(err);
      }
    });
}

function employeeInfo() {
  const whichEmp = [
    {
      name: 'choice',
      type: 'list',
      message: 'What employee type are we adding?',
      choices: ['Engineer', 'Intern', 'Finished']
    }
  ];
  inquirer.prompt(whichEmp)
    .then((answers) => {
      if (answers.choice === 'Engineer') {
        engineerInfo();
      }
      if (answers.choice === 'Intern') {
        internInfo();
      }
      if (answers.choice === 'Finished') {
        createHTML();
      }
    });
}

inquirer.prompt(managerQuestions)
  .then((response) => {
    const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
    workArray.push(manager);
    employeeInfo();
  });
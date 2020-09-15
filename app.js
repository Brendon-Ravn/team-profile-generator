const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

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
    message: 'What is your GitHub username?'
  }
];

const internQuestions = [
  ...questions,
  {
    type: 'input',
    name: 'school',
    message: 'What is your current or most recent institute of education?'
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
      team.push(engineer);
      employeeInfo();
    });
}

function internInfo() {
  inquirer.prompt(internQuestions)
    .then((response) => {
      const intern = new Intern(response.name, response.id, response.email, response.school);
      team.push(intern);
      employeeInfo();
    });
}

function createHTML(){
  try {
    const html = render(team);
    fs.writeFileSync(outputPath, html);
  } catch (err) {
    console.log(err);
  }
}

function employeeInfo() {
  const whichEmp = [
    {
      name: 'choice',
      type: 'checkbox',
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
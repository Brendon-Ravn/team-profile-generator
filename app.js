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
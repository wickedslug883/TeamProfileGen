const generateHTML = require('./src/genTML');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

const fs = require('fs'); 
const inquirer = require('inquirer');

const teamArray = []; 

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: "Enter manager's name", 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Provide name");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter manager's ID",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Provide ID")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter manager's email",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('Provide email')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Enter manager's office number",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ('Provide office number')
                    return false; 
                } else {
                    return true;
                }
            }
        }
    ])
    .then(managerInput => {
        const  { name, id, email, officeNumber } = managerInput; 
        const manager = new Manager (name, id, email, officeNumber);

        teamArray.push(manager); 
        console.log(manager); 
    })
};

const addEmployee = () => {
    console.log(` Adding employees to team`);

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "Select employee role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "Enter employee's name", 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Provide name");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter employee's ID",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Provide ID")
                    return false; 
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter employee's email",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } else {
                    console.log ('Provide email')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter employee's github",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput ) {
                    return true;
                } else {
                    console.log ("Provide github")
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter intern's school",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log ("Provide school")
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        // data for employee types 

        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData; 
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        teamArray.push(employee); 

        if (confirmAddEmployee) {
            return addEmployee(teamArray); 
        } else {
            return teamArray;
        }
    })

};



const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
       
        if (err) {
            console.log(err);
            return;
  
        } else {
            console.log("Your team has been created.")
        }
    })
}; 

addManager()
  .then(addEmployee)
  .then(teamArray => {
    return generateHTML(teamArray);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
 console.log(err);
  });
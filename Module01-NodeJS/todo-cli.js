
const fs = require('fs');
const { Command } = require('commander');

let filepath = new Date()
                        .toLocaleDateString()
                        .replaceAll('/', '-')
                + "-task.json";

console.log(filepath);


const program = new Command();

program
    .name('todocli')
    .description('a simple cli todo app using JS')
    .version('1.0.0')
    .alias('tc')

// command for adding task

program.command('add')
    .description('add new task in todo list')
    .argument('<string>', 'string to define the task')
    .action((newTask) => {

        // creating a file and writing the tasks on it
        if(fs.existsSync(filepath)){
            fs.appendFile(filepath, `\n${newTask}`, (err) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(`You added: ${newTask}`);
                }
            });
        }
        else {
            fs.writeFile(filepath, newTask.toString(), (err) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(`You added: ${newTask}`);
                }
            });
        }

    });

// command for showing the list of task

program.command('show')
    .description('list all the pending tasks')
    .action(() => {
        if(fs.existsSync(filepath)) {
            fs.readFile(filepath, 'utf-8', (err, data) => {
                
                let task_lists = data.split('\n');
                
                console.log("Your Today's Tasks are: ");
                console.log("----------------------------");
                
                for(var i = 0; i < task_lists.length; ++i) {
                    console.log(`${i + 1} -> ${task_lists[i]}`);
                }
                
                console.log("----------------------------");
            });
        }
        else {
            console.log("You have no Tasks for Today!!!");
        }
    });

program.parse();
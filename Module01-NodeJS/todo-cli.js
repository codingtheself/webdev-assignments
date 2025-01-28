
const chalk = new (require('chalk').Chalk);

const { Command } = require('commander');
const fs = require('fs');


let filepath = new Date()
                        .toLocaleDateString()
                        .replaceAll('/', '-')
                + "-task.json";


function addTasks(newTask) {

    const taskJson = {};

    // creating a file and writing the tasks on it
    if (fs.existsSync(filepath)) {

        let taskJson = fs.readFileSync(filepath);
        
        taskJson = JSON.parse(taskJson);

        taskJson.pending.push(newTask);

        fs.writeFile(filepath, JSON.stringify(taskJson), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(chalk.green("Tasked Added!"));
        }
        });
    } else {

        taskJson.completed = [];
        taskJson.pending = [];

        taskJson.pending.push(newTask);

        fs.writeFile(filepath, JSON.stringify(taskJson), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(chalk.green("Tasked Added!"));
        }
        });
    }
}

function showTasks() {
    const taskJson = {};

    if (fs.existsSync(filepath)) {

        let taskJson = fs.readFileSync(filepath);
        
        taskJson = JSON.parse(taskJson);

        let task_lists = taskJson.pending;
        let task_completed = taskJson.completed;

        console.log(chalk.bold("Your Today's Tasks are: "));
        console.log(chalk.dim("----------------------------\n"));
        
        for(var i = 0; i < task_lists.length; ++i) {
            console.log(chalk.yellow(`${i + 1} -> ${task_lists[i]}`));
        }

        console.log(chalk.dim("\n----------------------------\n"));

        console.log(chalk.bold('Tasks you have Completed:'));

        console.log(chalk.dim("----------------------------"));

        for(var i = 0; i < task_completed.length; ++i){
            console.log(chalk.magenta.strikethrough(`-> ${task_completed[i]}`));
        }
        
        console.log(chalk.dim("----------------------------"));
    }
}

function deleteTask(taskNum) {
    const taskJson = {};

    if (fs.existsSync(filepath)) {
      let taskJson = fs.readFileSync(filepath);

      taskJson = JSON.parse(taskJson);


      taskJson.pending.pop(taskNum - 1);

      fs.writeFile(filepath, JSON.stringify(taskJson), (err) => {
        if(err)
            console.log(err);
        else
            console.log(chalk.green("Task "+ chalk.red("Deleted!")));
      });
      
    }

    
}

function doneTask(taskNum) {
    const taskJson = {};

    if (fs.existsSync(filepath)) {
      let taskJson = fs.readFileSync(filepath);

      taskJson = JSON.parse(taskJson);

      let popped = taskJson.pending.pop(taskNum - 1);

      taskJson.completed.push(popped);

      fs.writeFile(filepath, JSON.stringify(taskJson), (err) => {
        if (err) console.log(err);
        else console.log(chalk.green("Congrats, 1 Task Done!"));
      });
    }
}

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
    .action((newTask) => {addTasks(newTask);});

// command for showing the list of task

program.command('show')
    .description('list all the pending tasks')
    .action(showTasks);

// command for deleting the task

program
  .command("del")
  .description(
    "delete the particular task from list using del <number> of task in list"
  )
  .argument("<int>", "the task number in the list")
  .action((taskNum) => {
    deleteTask(taskNum);
  });

// command for completing the task

program
  .command("done")
  .description(
    "mark a task as done or completed"
  )
  .argument("<int>", "the task number in the list")
  .action((taskNum) => {
    doneTask(taskNum);
  });

program.parse();
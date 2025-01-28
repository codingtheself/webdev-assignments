
const fs = require('fs');
const { Command } = require('commander');

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
            console.log(`Tasked Added!`);
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
            console.log(`Task Added!`);
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

        console.log("Your Today's Tasks are: ");
        console.log("----------------------------");
        
        for(var i = 0; i < task_lists.length; ++i) {
            console.log(`${i + 1} -> ${task_lists[i]}`);
        }
        
        console.log("----------------------------");
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
            console.log("Task Deleted!");
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

program.parse();
const readline = require('readline'); // for reading input


function guess() {

    let input = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    input.question("Guess the number between 1-10 or q for quit: ", (ans) => {
        if(ans == "q") {
            console.log("bye!");
            return input.close();
            
        }

        let num = Math.floor(Math.random() * 11);

        console.log(`${num} is the hinted num`);

        if(parseInt(ans) == num) {
            console.log("Congrats, you won!");
            return input.close();
            
        } else {
            console.log("Wrong!");
            guess();
        }

    });
}


guess();

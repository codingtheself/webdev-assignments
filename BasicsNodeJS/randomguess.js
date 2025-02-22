const { exit } = require('process');
const readline = require('readline'); // for reading input

function guess(guessNum) {

    let num = Math.floor(Math.random() * 11);

    console.log(`${num} was answer`);

    if(parseInt(guessNum) == num) {
        console.log("Congrats, you won!");
        exit(0);
        
    } else {
        console.log("Wrong!");
        takeInput();
    }

}

function takeInput() {

    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    input.question("Guess the number between 1-10 or q for quit: ", (ans) => {
        if(ans == "q") {
            console.log("bye!");
            input.close();
            process.exit(0);
        }

        input.close();
        guess(ans);
    });
}

takeInput();
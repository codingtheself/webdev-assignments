# What I've Learned

In *randomguess.js*, I found that I am unable to take user input from `readline` multiple times.

One of the reasons I found is maybe because of the Nodejs non-blocking feature.

And one of the solutions someone in the *stackoverflow* suggested to use *recursion*.

### Non-Blocking Nature of Nodejs

it basically means that: Nodejs accepts all the requests coming from the client without blocking and returns the response whichever happens to be done.

That's why maybe in the *randomguess.js*, it instead of waiting for the response from the guess() function or the readline interface, it continued to move ahead.

so it is important to always close this interface which is waiting for the signal or stream of input from process.stdin

and then, keep calling the function for taking input separately.

So, I created a function *takeInput()* which will take input and also ensure that the process is close everything after it's done and returns the input from the user to *guess(guessNum)*.


## Quoter.js

about `quoter.js`, I am trying to fetch the json data from the API [https://zenquotes.io/api/random](https://zenquotes.io/api/random).

I am trying to use `http` module but it is not working for some reasons. Well, I will figure it out later
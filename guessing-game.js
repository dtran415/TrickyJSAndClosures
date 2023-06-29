function guessingGame() {
    const answer = Math.floor(Math.random() * 100);
    let isOver = false;
    let numGuesses = 0;

    return function guess(num) {
        if (isOver)
            return "The game is over, you already won!";

        numGuesses++;
        if (num === answer) {
            isOver = true;
            const msg = `You win! You found ${answer} in ${numGuesses} guesses.`;
            return msg;
        } else if (num < answer) {
            return `${num} is too low!`;
        } else {
            return `${num} is too high!`
        }
    }
}

module.exports = { guessingGame };

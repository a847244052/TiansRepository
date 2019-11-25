module.exports = function(playerAction) {
    var computerAction;
    var random = Math.random() * 3;
    if (random < 1) {
        computerAction = 'rock';
    } else if (random > 2) {
        computerAction = 'scissor'
    } else {
        computerAction = 'paper'
    }

    if (playerAction == computerAction) {
        return 0;
    } else if (
        computerAction == 'rock' && playerAction == 'scissor' ||
        computerAction == 'scissor' && playerAction == 'paper' ||
        computerAction == 'paper' && playerAction == 'rock'
    ) {
        return -1;
    } else {
        return 1;
    }
}
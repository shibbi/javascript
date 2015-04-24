var Board = require('./board.js');

function Game(reader) {
  this.board = new Board();
  this.reader = reader;
  this.currentPlayer = 'x';
}

Game.prototype.switchPlayer = function() {
  if(this.currentPlayer === 'x') {
    this.currentPlayer = 'o';
  } else {
    this.currentPlayer = 'x';
  }
};

Game.prototype.run = function(completionCallback) {
  var game = this;
  this.promptMove(function(pos) {
    if (!game.board.placeMark(pos, game.currentPlayer)) {
      console.log('Invalid move yo');
    }
    else {
      game.switchPlayer();
    }
    if (!game.board.won()) {
      game.run(completionCallback);
    } else {
      console.log('Game over!!! The winner is ' + game.board.winner);
      game.board.print();
      completionCallback();
    }
  });
};

Game.prototype.promptMove = function(callback) {
  this.board.print();
  this.reader.question('Current player is ' + this.currentPlayer +
                       '. Where do you want to place? (i.e. a2) ',
                       function(input) {
                         var pos = [];
                         pos.push(parseInt(input[1]));
                         switch(input[0]) {
                           case 'a':
                             pos.push(0);
                             break;
                           case 'b':
                             pos.push(1);
                             break;
                           case 'c':
                             pos.push(2);
                             break;
                           default:
                             pos.push(-1);
                          }
                          callback(pos);
                        });
};

module.exports = Game;

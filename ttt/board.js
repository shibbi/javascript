var BOARDSIZE = 3;

function _setUpBoard(board) {
  board.grid = [];
  for (var i = 0; i < BOARDSIZE; i++) {
    board.grid.push(Array(BOARDSIZE));
    for (var j = 0; j < board.grid[i].length; j++) {
      board.grid[i][j] = '_';
    }
  }
}

function Board() {
  _setUpBoard(this);
  this.winner = 'no one';
}

Board.prototype.print = function() {
  console.log("    a   b   c");
  for (var i = 0; i < this.grid.length; i++) {
    console.log(i + " " + JSON.stringify(this.grid[i]));
  }
};

Board.prototype.setWinner = function(line){
  this.winner = line[0];
};

function _winningLine(board, line) {
  if (line[0] === line[1] && line[1] === line[2] && line[0] !== '_') {
    board.setWinner(line[0]);
    return true;
  }
  return false;
}

function _transposeCol(board, col) {
  var row = [];
  for (var i = 0; i < board.grid[col].length; i++) {
    row.push(board.grid[i][col]);
  }
  return row;
}

function _checkRows(board) {
  for (var i = 0; i < board.grid.length; i++) {
    var row = board.grid[i];
    if(_winningLine(board, row)) {
      return true;
    }
  }
  return false;
}

function _checkCols(board) {
  for (var row = 0; row < board.grid.length; row++) {
    var newCol = _transposeCol(board, row);
    if (_winningLine(board, newCol)) {
      return true;
    }
  }
  return false;
}

function _checkDiags(board) {
  var diagOne = [board.grid[0][0], board.grid[1][1], board.grid[2][2]];
  var diagTwo = [board.grid[0][2], board.grid[1][1], board.grid[2][0]];
  if (_winningLine(board, diagOne) || _winningLine(board, diagTwo)) {
    return true;
  }
  return false;
}

Board.prototype.won = function() {
  if (_checkRows(this) || _checkCols(this) || _checkDiags(this)) {
    return true;
  }
  return false;
};

function _isValidPos(pos) {
  var x = pos[0];
  var y = pos[1];
  if (x < 0 || x > 2 || y < 0 || y > 2) {
    return false;
  }
  return true;
}

Board.prototype.placeMark = function(pos, mark) {
  if (!_isValidPos(pos)) {
    return false;
  }
  var x = pos[0];
  var y = pos[1];
  if (this.grid[x][y] !== 'x') {
    this.grid[x][y] = mark;
    return true;
  }
  return false;
};

module.exports = Board;

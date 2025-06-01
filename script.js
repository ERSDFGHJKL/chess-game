const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const game = new Chess();

function onDragStart(source, piece, position, orientation) {
  // Do not pick up pieces if the game is over or it's not the player's turn
  if (game.isGameOver() ||
      (game.turn() === 'w' && piece.startsWith('b')) ||
      (game.turn() === 'b' && piece.startsWith('w'))) {
    return false;
  }
}

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q' // always promote to a queen
  });

  if (move === null) return 'snapback';

  updateStatus();
}

function onSnapEnd() {
  board.position(game.fen());
}

function updateStatus() {
  let status = '';

  if (game.inCheckmate()) {
    status = 'Checkmate! ' + (game.turn() === 'w' ? 'Black' : 'White') + ' wins!';
  } else if (game.inDraw()) {
    status = 'Draw!';
  } else {
    status = (game.turn() === 'w' ? 'White' : 'Black') + ' to move';
    if (game.inCheck()) {
      status += ' (Check)';
    }
  }

  statusElement.textContent = status;
}

const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
});

updateStatus();

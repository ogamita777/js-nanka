import Board from "./board.js"
const shogi = {};

document.addEventListener('DOMContentLoaded', function() {
  shogi.board = new Board();
  shogi.board.setInitBoard();
  shogi.board.draw();

  document.addEventListener('click', function(e) {

    const boardIndex = shogi.board.getBoardIndex(e.offsetX, e.offsetY);

    if(boardIndex === null) {
      return;
    }

    if(shogi.board.isSelectedIndex()) {
      shogi.board.setBoardPiece(boardIndex);
    } else {
      shogi.board.setSelectedIndex(boardIndex);
    }

    shogi.board.draw();
  }, false);

}, false);

import Board from "./board.js"
const shogi = {};

document.addEventListener('DOMContentLoaded', function() {
  shogi.board = new Board();
  shogi.board.setInitBoard();
  shogi.board.draw();

  document.addEventListener('click', function(e) {
    const cellSize = shogi.board.m_cellSize;

    const coulmn = parseInt(e.offsetX / cellSize);
    const row = parseInt(e.offsetY / cellSize);

    if(shogi.board.isSelectedIndex()) {
      shogi.board.setBoardPiece(coulmn, row);
    } else {
      shogi.board.setSelectedIndex(coulmn, row);
    }

    shogi.board.draw();
  }, false);

}, false);

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
    shogi.board.promotionBoardPiece(coulmn, row);
    shogi.board.draw();
  }, false);

}, false);

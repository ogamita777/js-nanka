import Board from "./board.js"
const shogi = {};

document.addEventListener('DOMContentLoaded', function() {
  shogi.board = new Board();
  shogi.board.setInitBoard();
  shogi.board.draw();

  document.addEventListener('click', function(e) {
    const cellSize = shogi.board.m_cellSize;
    shogi.board.promotionBoardPiece(parseInt(e.offsetX / cellSize), parseInt(e.offsetY / cellSize));
    shogi.board.draw();
  }, false);

}, false);

import Board from "./board.js"
const shogi = {};

document.addEventListener('DOMContentLoaded', function() {
  shogi.board = new Board();
  shogi.board.setInitBoard();
  shogi.board.draw();

}, false);

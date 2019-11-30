const shogi = {};

document.addEventListener('DOMContentLoaded', function() {
  shogi.board = new Board();
  shogi.board.draw();
}, false);

class Board {
  constructor() {
    this.m_column = 9;
    this.m_row = 9;
    this.m_cellSize = 64;
  }

  draw() {
    const canvas = document.getElementById('board');

    if(!canvas || !canvas.getContext) {
      return;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, this.m_column * this.m_cellSize, this.m_row * this.m_cellSize);
    ctx.strokeStyle = 'black';

    for(let i = 0; i < this.m_column + 1; i++) {
        const fromX = i * this.m_cellSize;
        const fromY = 0;
        const toX = fromX;
        const toY = this.m_cellSize * this.m_row;

        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    }

    for(let i = 0; i < this.m_row + 1; i++) {
        const fromX = 0;
        const fromY = i * this.m_cellSize;
        const toX = this.m_column * this.m_cellSize;
        const toY = fromY;

        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
    }
  }
}

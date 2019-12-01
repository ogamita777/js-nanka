import Piece from "./piece.js";

export default class {
  constructor() {
    this.m_column = 9;
    this.m_row = 9;
    this.m_cellSize = 64;
    this.m_pieceSize = this.m_cellSize - 7;
    this.m_boardArray = new Array(this.m_column * this.m_row);
    this.m_piece = new Piece();
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

    // テストで駒を表示
    ctx.font = this.m_pieceSize + 'px serif';
    ctx.textAlign = 'center';

    for(let row = 0; row < this.m_row; row++) {
      for(let coulmn = 0; coulmn < this.m_column; coulmn++) {
        const pieceType = this.m_boardArray[row * this.m_column + coulmn];

        if(pieceType == this.m_piece.BLANK) {
          continue;
        }

        const pieceString = this.m_piece.getPieceString(pieceType);
        
        if(pieceString == undefined) {
          continue;
        }

        const x = (coulmn + 0.5) * this.m_cellSize;
        const y = (row + 1) * this.m_cellSize - (this.m_cellSize - this.m_pieceSize);
        ctx.fillText(pieceString, x, y);
      }
    }
  }

  setInitBoard() {
    this.m_boardArray = new Array(this.m_column * this.m_row);

    for(let row = 0; row < this.m_row; row++) {
      for(let coulmn = 0; coulmn < this.m_column; coulmn++) {
        this.m_boardArray[row * this.m_coulmn + coulmn] = this.m_piece.BLANK;
      }
    }

    // @todo どうしよう
    this.m_boardArray[54] = this.m_piece.WHITE_PAWN;
    this.m_boardArray[55] = this.m_piece.WHITE_PAWN;
    this.m_boardArray[56] = this.m_piece.WHITE_PAWN;
    this.m_boardArray[57] = this.m_piece.WHITE_PAWN;
    this.m_boardArray[58] = this.m_piece.WHITE_PAWN;
    this.m_boardArray[59] = this.m_piece.WHITE_PAWN;
    this.m_boardArray[60] = this.m_piece.WHITE_PAWN;
    this.m_boardArray[61] = this.m_piece.WHITE_PAWN;
    this.m_boardArray[62] = this.m_piece.WHITE_PAWN;
    this.m_boardArray[64] = this.m_piece.WHITE_BISHOP;
    this.m_boardArray[70] = this.m_piece.WHITE_ROOK;
    this.m_boardArray[72] = this.m_piece.WHITE_LANCE;
    this.m_boardArray[73] = this.m_piece.WHITE_KNIGHT;
    this.m_boardArray[74] = this.m_piece.WHITE_SILVER;
    this.m_boardArray[75] = this.m_piece.WHITE_GOLD;
    this.m_boardArray[76] = this.m_piece.WHITE_KING;
    this.m_boardArray[77] = this.m_piece.WHITE_GOLD;
    this.m_boardArray[78] = this.m_piece.WHITE_SILVER;
    this.m_boardArray[79] = this.m_piece.WHITE_KNIGHT;
    this.m_boardArray[80] = this.m_piece.WHITE_LANCE;
  }
}

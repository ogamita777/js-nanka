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

        const pieceRawType = this.m_piece.getPieceType(pieceType);

        if(pieceRawType == this.m_piece.BLANK) {
          continue;
        }

        const pieceString = this.m_piece.getPieceString(pieceRawType);
        
        if(pieceString == undefined) {
          continue;
        }

        const isBlack = this.m_piece.isTurn(this.m_piece.BLACK, pieceType);

        ctx.save();

        const x = (coulmn + 0.5) * this.m_cellSize;

        if(isBlack) {
          const y = row * this.m_cellSize + (this.m_cellSize - this.m_pieceSize);
          ctx.translate(x, y);

          // 文字を180度回転させる
          ctx.rotate(Math.PI);
        } else {
          const y = (row + 1) * this.m_cellSize - (this.m_cellSize - this.m_pieceSize);
          ctx.translate(x, y);
        }
        ctx.fillText(pieceString, 0, 0);
        ctx.restore();
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
    this.m_boardArray[18] = this.m_piece.BLACK_PAWN;
    this.m_boardArray[19] = this.m_piece.BLACK_PAWN;
    this.m_boardArray[20] = this.m_piece.BLACK_PAWN;
    this.m_boardArray[21] = this.m_piece.BLACK_PAWN;
    this.m_boardArray[22] = this.m_piece.BLACK_PAWN;
    this.m_boardArray[23] = this.m_piece.BLACK_PAWN;
    this.m_boardArray[24] = this.m_piece.BLACK_PAWN;
    this.m_boardArray[25] = this.m_piece.BLACK_PAWN;
    this.m_boardArray[26] = this.m_piece.BLACK_PAWN;
    this.m_boardArray[16] = this.m_piece.BLACK_BISHOP;
    this.m_boardArray[10] = this.m_piece.BLACK_ROOK;
    this.m_boardArray[0] = this.m_piece.BLACK_LANCE;
    this.m_boardArray[1] = this.m_piece.BLACK_KNIGHT;
    this.m_boardArray[2] = this.m_piece.BLACK_SILVER;
    this.m_boardArray[3] = this.m_piece.BLACK_GOLD;
    this.m_boardArray[4] = this.m_piece.BLACK_KING;
    this.m_boardArray[5] = this.m_piece.BLACK_GOLD;
    this.m_boardArray[6] = this.m_piece.BLACK_SILVER;
    this.m_boardArray[7] = this.m_piece.BLACK_KNIGHT;
    this.m_boardArray[8] = this.m_piece.BLACK_LANCE;

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

  promotionBoardPiece(coulmn, row) {

    if(coulmn > this.m_column - 1) {
      return;
    }

    if(row > this.m_row - 1) {
      return;
    }

    const index = coulmn + row * this.m_column;

    if(!this.m_piece.canPromotion(this.m_boardArray[index])) {
      return;
    }

    this.m_boardArray[index] ^= this.m_piece.PROMOTION;
  }
}

import Piece from "./piece.js";

export default class {
  constructor() {
    this.m_column = 9;
    this.m_row = 9;
    this.m_cellSize = 48;
    this.m_pieceSize = this.m_cellSize - 7;
    this.m_boardArray = new Array(this.m_column * this.m_row);
    this.m_piece = new Piece();

    this.m_capture = new Map();

    for(let i = this.m_piece.PAWN; i <= this.m_piece.ROOK;i++) {
      this.m_capture.set(i | this.m_piece.WHITE, 0);
      this.m_capture.set(i | this.m_piece.BLACK, 0);
    }

    this.m_selectedIndex = -1;
    this.m_boardOffsetY = this.m_cellSize * 1.5;
    this.m_offsetY = this.m_cellSize * 3;
  }

  draw() {
    const canvas = document.getElementById('board');

    if(!canvas || !canvas.getContext) {
      return;
    }

    const width = this.m_cellSize * this.m_column;
    const height = this.m_cellSize * this.m_row + this.m_offsetY;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.translate(0, this.m_boardOffsetY);

    if(this.m_selectedIndex !== -1) {
      ctx.save();
      {
        const column = this.m_selectedIndex % this.m_column;
        const row = parseInt(this.m_selectedIndex / this.m_row);
        ctx.fillStyle = 'red';
        ctx.fillRect(column * this.m_cellSize, row * this.m_cellSize, this.m_cellSize, this.m_cellSize);
      }
      ctx.restore();
    }
    
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
        {
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
        }
        ctx.restore();
      }
    }

    // 持ち駒の表示
    for(let [key, value] of this.m_capture) {
      if(value === 0) {
        continue;
      }

      const pieceRawType = this.m_piece.getPieceType(key);
      const pieceString = this.m_piece.getPieceString(pieceRawType);
      
      if(pieceString == undefined) {
        continue;
      }

      ctx.save();
      {

        const isBlack = this.m_piece.isTurn(this.m_piece.BLACK, key);
  
        const x = this.m_cellSize * (key & this.m_piece.TYPE_MASK);
  
        if(isBlack) {
          const y = -this.m_cellSize;
          ctx.translate(x, y);
  
          // 文字を180度回転させる
          ctx.rotate(Math.PI);
        } else {
          const y = (this.m_row + 1) * this.m_cellSize - (this.m_cellSize - this.m_pieceSize);
          ctx.translate(x, y);
        }
        ctx.fillText(pieceString, 0, 0);
  
        // 所持数が1の場合は数字は書かない
        if(value !== 1) {
          ctx.save();
          {
            const captureFontSize = this.m_pieceSize / 2;
            ctx.translate(0, captureFontSize);
            ctx.font = captureFontSize + 'px serif';
            ctx.fillText(value, 0, 0);
          }
          ctx.restore();
        }
      }
      ctx.restore();
    }
  }

  setInitBoard() {
    this.m_boardArray = new Array(this.m_column * this.m_row);

    for(let row = 0; row < this.m_row; row++) {
      for(let column = 0; column < this.m_column; column++) {
        this.m_boardArray[row * this.m_column + column] = this.m_piece.BLANK;
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

  isSelectedIndex() {
    return this.m_selectedIndex !== -1;
  }

  setSelectedIndex(index) {
    if(this.m_boardArray[index] === this.m_piece.BLANK) {
      return;
    }

    this.m_selectedIndex = index;
  }

  setBoardPiece(index) {

    // @todo ここでやることではない気がする
    if
    (
      this.m_boardArray[index] !== this.m_piece.BLANK 
      && this.m_piece.sameTurn(this.m_boardArray[index], this.m_boardArray[this.m_selectedIndex])
    )
    {
      console.log(this.m_boardArray[index]);
      this.m_selectedIndex = index;
      return false;
    }

    // 持ち駒に入れる
    if
    (
      this.m_boardArray[index] !== this.m_piece.BLANK
      && (this.m_boardArray[index] & this.m_piece.TYPE_MASK) !== this.m_piece.KING // 玉は取っても持ち駒に入れない
    )
    {
      const piece = (this.m_boardArray[index] ^ this.m_piece.TURN_BIT) & ~this.m_piece.PROMOTION;
      this.m_capture.set(piece, this.m_capture.get(piece) + 1);
    }

    this.m_boardArray[index] = this.m_boardArray[this.m_selectedIndex];
    this.m_boardArray[this.m_selectedIndex] = this.m_piece.BLANK;

    this.m_selectedIndex = -1;
  }

  getBoardIndex(x, y) {
    const coulmn = parseInt(x / this.m_cellSize);
    const row = parseInt((y - (this.m_offsetY / 2)) / this.m_cellSize);

    if(coulmn > this.m_column - 1) {
      return null;
    }

    if(row > this.m_row - 1) {
      return null;
    }

    const index = coulmn + row * this.m_column;
    return index;
  }
}

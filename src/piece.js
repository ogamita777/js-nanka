/**
 * 駒
 * 
 * @module
 */
export default class {

  constructor() {
    // @todo 何かもっと良い書き方がありそう

    this.BLANK = 0;
    this.PAWN = 1;
    this.LANCE = 2;
    this.KNIGHT = 3;
    this.SILVER = 4;
    this.GOLD = 5;
    this.BISHOP = 6;
    this.ROOK = 7;
    this.KING = 8;

    this.TYPE_MASK = 0xf;

    this.PROMOTION = 0x10;

    this.PROMOTION_PAWN = this.setPromotion(this.PAWN);
    this.PROMOTION_LANCE = this.setPromotion(this.LANCE);
    this.PROMOTION_KNIGHT = this.setPromotion(this.KNIGHT);
    this.PROMOTION_SILVER = this.setPromotion(this.SILVER);
    this.PROMOTION_BISHOP = this.setPromotion(this.BISHOP);
    this.PROMOTION_ROOK = this.setPromotion(this.ROOK);

    this.WHITE = 0x00;
    this.BLACK = 0x20;
    this.TURN_BIT = 0x20;

    this.WHITE_PAWN = this.setTurn(this.WHITE, this.PAWN);
    this.WHITE_LANCE = this.setTurn(this.WHITE, this.LANCE);
    this.WHITE_KNIGHT = this.setTurn(this.WHITE, this.KNIGHT);
    this.WHITE_SILVER = this.setTurn(this.WHITE, this.SILVER);
    this.WHITE_GOLD = this.setTurn(this.WHITE, this.GOLD);
    this.WHITE_BISHOP = this.setTurn(this.WHITE, this.BISHOP);
    this.WHITE_ROOK = this.setTurn(this.WHITE, this.ROOK);
    this.WHITE_KING = this.setTurn(this.WHITE, this.KING);
    this.WHITE_PROMOTION_PAWN = this.setTurn(this.WHITE, this.PROMOTION_PAWN);
    this.WHITE_PROMOTION_LANCE = this.setTurn(this.WHITE, this.PROMOTION_LANCE);
    this.WHITE_PROMOTION_KNIGHT = this.setTurn(this.WHITE, this.PROMOTION_KNIGHT);
    this.WHITE_PROMOTION_SILVER = this.setTurn(this.WHITE, this.PROMOTION_SILVER);
    this.WHITE_PROMOTION_BISHOP = this.setTurn(this.WHITE, this.PROMOTION_BISHOP);
    this.WHITE_PROMOTION_ROOK = this.setTurn(this.WHITE, this.PROMOTION_ROOK);

    this.BLACK_PAWN = this.setTurn(this.BLACK, this.PAWN);
    this.BLACK_LANCE = this.setTurn(this.BLACK, this.LANCE);
    this.BLACK_KNIGHT = this.setTurn(this.BLACK, this.KNIGHT);
    this.BLACK_SILVER = this.setTurn(this.BLACK, this.SILVER);
    this.BLACK_GOLD = this.setTurn(this.BLACK, this.GOLD);
    this.BLACK_BISHOP = this.setTurn(this.BLACK, this.BISHOP);
    this.BLACK_ROOK = this.setTurn(this.BLACK, this.ROOK);
    this.BLACK_KING = this.setTurn(this.BLACK, this.KING);
    this.BLACK_PROMOTION_PAWN = this.setTurn(this.BLACK, this.PROMOTION_PAWN);
    this.BLACK_PROMOTION_LANCE = this.setTurn(this.BLACK, this.PROMOTION_LANCE);
    this.BLACK_PROMOTION_KNIGHT = this.setTurn(this.BLACK, this.PROMOTION_KNIGHT);
    this.BLACK_PROMOTION_SILVER = this.setTurn(this.BLACK, this.PROMOTION_SILVER);
    this.BLACK_PROMOTION_BISHOP = this.setTurn(this.BLACK, this.PROMOTION_BISHOP);
    this.BLACK_PROMOTION_ROOK = this.setTurn(this.BLACK, this.PROMOTION_ROOK);

    this.m_pieceToStringMap = new Map();
    this.m_pieceToStringMap.set(this.PAWN, '歩');
    this.m_pieceToStringMap.set(this.LANCE, '香');
    this.m_pieceToStringMap.set(this.KNIGHT, '桂');
    this.m_pieceToStringMap.set(this.SILVER, '銀');
    this.m_pieceToStringMap.set(this.GOLD, '金');
    this.m_pieceToStringMap.set(this.BISHOP, '角');
    this.m_pieceToStringMap.set(this.ROOK, '飛');
    this.m_pieceToStringMap.set(this.KING, '玉');
    this.m_pieceToStringMap.set(this.PROMOTION_PAWN, 'と');
    this.m_pieceToStringMap.set(this.PROMOTION_LANCE, '杏');
    this.m_pieceToStringMap.set(this.PROMOTION_KNIGHT, '圭');
    this.m_pieceToStringMap.set(this.PROMOTION_SILVER, '全');
    this.m_pieceToStringMap.set(this.PROMOTION_BISHOP, '馬');
    this.m_pieceToStringMap.set(this.PROMOTION_ROOK, '竜');
  }

  /**
   * 成る
   */
  setPromotion(piece) {
    return piece | this.PROMOTION;
  }

  /**
   * 成っているか
   */
  isPromotion(piece) {
    return (piece & this.PROMOTION) != 0;
  }

  /**
   * 成ることができる駒の種類か
   */
  canPromotion(piece) {
    // @todo もっと良い方法がありそうな気がする

    const type = piece & this.TYPE_MASK;

    if
    (
      type == this.PAWN
      || type == this.LANCE
      || type == this.KNIGHT
      || type == this.SILVER
      || type == this.BISHOP
      || type == this.ROOK
    ) 
    {
      return true;
    }

    return false;
  }

  setTurn(turn, piece) {
    piece &= ~this.TURN_BIT;
    return turn | piece;
  }

  isTurn(turn, piece) {
    return (this.TURN_BIT & piece) === turn;
  }

  sameTurn(myPiece, otherPiece) {
    return (this.TURN_BIT & myPiece) === (this.TURN_BIT & otherPiece);
  }

  getPieceString(piece) {
    return this.m_pieceToStringMap.get(piece);
  }

  getPieceType(piece) {
    return piece & (this.TYPE_MASK | this.PROMOTION);
  }
}

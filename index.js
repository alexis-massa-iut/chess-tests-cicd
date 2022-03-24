const Piece = require('./src/piece.js');
const Pawn = require('./src/pawn.js');
const King = require('./src/king.js');
const Queen = require('./src/queen.js');
const Bishop = require('./src/bishop.js');
const Rook = require('./src/rook.js');
const Knight = require('./src/knight.js');
const Notification = require('./src/notifications/notification.js');
const MoveNotification = require('./src/notifications/move.js');
const CaptureNotification = require('./src/notifications/capture.js');
const Chessboard = require('./src/chessboard.js');
const Color = require('./src/color.js');

const Chess = {
  Chessboard: Chessboard,
  Color: Color,
  pieces: {
    Piece: Piece,
    Pawn: Pawn,
    King: King,
    Queen: Queen,
    Bishop: Bishop,
    Rook: Rook,
    Knight: Knight
  },
  notifications: {
    Notification: Notification,
    MoveNotification: MoveNotification,
    CaptureNotification: CaptureNotification
  }
};

module.exports = Chess;

const Notification = require('./notification.js');

/**
 * MoveNotification constructor.
 * @param {?Object} options - an optional list of options.
 * @constructor
 */
const MoveNotification = function (options) {
  options = options || {};

  /**
   * The piece position before moving.
   * @type {Object}
   */
  this.oldPosition = options.oldPosition || {
    rank: 1,
    file: 1
  };

  /**
   * The piece position after moving.
   * @type {Object}
   */
  this.newPosition = options.newPosition || {
    rank: 1,
    file: 1
  };
};

// Inheritance definition
MoveNotification.prototype = Object.create(Notification.prototype);
MoveNotification.prototype.constructor = MoveNotification;

module.exports = MoveNotification;

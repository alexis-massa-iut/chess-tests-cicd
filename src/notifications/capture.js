const Notification = require('./notification.js');

/**
 * CaptureNotification constructor.
 * @param {?Object} options - an optional list of options.
 * @constructor
 */
const CaptureNotification = function (options) {
  options = options || {};

  /**
   * The position of the piece being captured.
   * @type {Object}
   */
  this.pos = options.pos || {
    rank: 1,
    file: 1
  };
};

// Inheritance definition
CaptureNotification.prototype = Object.create(Notification.prototype);
CaptureNotification.prototype.constructor = CaptureNotification;

module.exports = CaptureNotification;

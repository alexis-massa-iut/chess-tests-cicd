(function () {
  // eslint-disable-next-line no-undef
  const chessPkg = chess;
  const Chessboard = chessPkg.Chessboard;
  const CaptureNotification = chessPkg.notifications.CaptureNotification;
  const MoveNotification = chessPkg.notifications.MoveNotification;

  /**
   * Dom element containing the messages to display to the history.
   * @type {HTMLDivElement}
   */
  const historyContainer = document
    .getElementById('history')
    .querySelector('div');

  /**
   * Chessboard instance.
   * @type {Chessboard}
   */
  const chessboard = new Chessboard();

  /**
   * Dom element representing the chessboard
   * @type {HTMLDivElement}
   */
  const dom = document.getElementById('chessboard');

  /**
   * Rows of the Chessboard.
   * A row represent a rank in a reversed order.
   * @type {Array.<HTMLDivElement>}
   */
  const rankElements = [...dom.querySelectorAll('.rank')];

  /**
   * An object containing the icons of the pieces.
   * @type {Object.<number, HTMLImageElement>}
   */
  const icons = {};

  /**
   * The currently selected piece if any.
   * @type {Piece}
   */
  let current = null;

  /**
   * From a file number, get the corresponding letter.
   * Rank are 1-indexed.
   * Letters are 97-indexed to get lower-alpha characters.
   * @param {number} file - the file in its number representation.
   * @return {string} returns the file in its string representation.
   */
  const convertFileToString = function (file) {
    return String.fromCharCode(97 - 1 + file);
  };

  /**
   * Clear the history panel.
   */
  const clearHistory = function () {
    historyContainer.innerHTML = '';
  };

  /**
   * Add a message to the history panel.
   * @param {string} msg - the message to add.
   */
  const addToHistory = function (msg) {
    historyContainer.innerHTML += `<p>${msg}</p>`;
  };

  /**
   * Clear the chessboard.
   * This function only clear the DOM element.
   * It does not affect the data model.
   */
  const clearChessboard = function () {
    let icons = dom.querySelectorAll('img');
    for (let i = 0; i < icons.length; i++) {
      const icon = icons[i];
      icon.remove();
    }
    icons = {};
  };

  /**
   * Update the icon of a piece on the chessboard.
   * If the piece has been captured, remove the icon.
   * Otherwise, update its position.
   * @param {Piece} piece - the piece graphically represented by the icon.
   */
  const updateIcon = function (piece) {
    const row = 8 - piece.rank,
      col = piece.file - 1;

    if (piece.isCaptured) {
      icons[piece.id].remove();
      return;
    }

    const rankElement = dom.querySelectorAll('.rank')[row],
      fileElement = rankElement.children[col];

    fileElement.append(icons[piece.id]);
    icons[piece.id].setAttribute('draggable', false);
  };

  /**
   * Observe any state update of a piece.
   * This function is called whenever a notification has been yield.
   * Depending on the notification kind, add a specific message
   * to the history panel.
   * @param {Piece} piece - the piece that yields the notification.
   * @param {Notification} notification - the yield notification.
   */
  const observe = function (piece, notification) {
    updateIcon(piece);
    const color = piece.color,
      name = piece.constructor.name;

    if (notification instanceof MoveNotification) {
      const { oldPosition, newPosition } = notification;

      oldPosition.file = convertFileToString(oldPosition.file);
      newPosition.file = convertFileToString(newPosition.file);

      addToHistory(`
      ${color} ${name} moved from
      ${oldPosition.file}${oldPosition.rank} to
      ${newPosition.file}${newPosition.rank}`);
    } else if (notification instanceof CaptureNotification) {
      const { pos } = notification;

      pos.file = convertFileToString(pos.file);
      addToHistory(`
      ${color} ${name} at ${pos.file}${pos.rank}
    has been captured`);
    }
  };

  /**
   * Init the chessboard and prepare the different pieces..
   */
  const init = function () {
    chessboard.init();
    chessboard.pieces.forEach((p) => {
      const img = new Image();
      img.src = `assets/img/icons/${p.constructor.name.toLowerCase()}_${
        p.color
      }.png`;
      icons[p.id] = img;
      updateIcon(p);
      p.subscribe({
        notify: observe
      });
    });
  };

  /**
   * A reset function that successively clear the history panel,
   * clear the chesboard, and prepare a new game.
   */
  const reset = function (e) {
    e.preventDefault();
    clearHistory();
    clearChessboard();
    init();
  };

  /**
   * Callback function when a cell on the chessboard has been clicked.
   * Depending on whether a piece has already been grabbed,
   * grab a piece, release a piece, or move/capture.
   * @param {MouseEvent} e - the mouse event.
   */
  const handleClick = function (e) {
    e.preventDefault();

    // Retrieve the cell and its container.
    // The cell's container is the row representing the rank.
    const cell = e.currentTarget,
      container = cell.parentNode;

    // Retrieve the col and row numbers of the cell
    const col = [...container.children].indexOf(cell),
      row = [...container.parentNode.children].indexOf(container);

    // Convert the col and row into the rank and file.
    // Row and col are 0-indexed
    // Rank and files are 1-indexed. Rank is in revesed order.
    const rank = 8 - row,
      file = col + 1;

    // Retrive a piece to a specific rank and file (if any).
    const piece = chessboard.getPiece(rank, file);

    // Grab a piece
    if (!current && piece) {
      current = piece;
      cell.classList.add('active');
    }
    // Release without moving
    else if (current && piece && current === piece) {
      cell.classList.remove('active');
      current = null;
    }
    // Move and possibly capture an opponent piece
    else if (current) {
      if (current.canMove(rank, file)) {
        // Before moving, remove the active state of the cell
        // where the piece currently lies in.
        const oldRow = 8 - current.rank,
          oldCol = current.file - 1;

        rankElements[oldRow].children[oldCol].classList.remove('active');

        // Move the piece
        current.move(rank, file);

        // Release (un-grab) the piece.
        current = null;
      }
    }
  };

  // Bind an event to the reset button
  document.getElementById('reset-btn').addEventListener('click', reset);

  // Iterate over the chessboard and bind an even to each cell.
  rankElements.forEach((rank) => {
    [...rank.children].forEach((cell) => {
      cell.addEventListener('click', handleClick);
    });
  });

  init();
})();

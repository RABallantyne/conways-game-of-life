(function() {
  let _ = (self.Life = function(seed) {
    this.seed = seed;
    this.height = seed.length;
    this.width = seed[0].length;

    this.prevBoard = [];

    this.board = cloneArray(seed);
  });
  _.prototype = {
    next: function() {
      this.prevBoad = cloneArray(this.board);
    },
    toString: function() {
      return this.board
        .map(row => {
          return row.join(' ');
        })
        .join('\n');
    }
  };

  //helpers
  function cloneArray(array) {
    return array.slice().map(row => {
      return row.slice();
    });
  }
})();

let game = new Life([
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0]
]);

console.log(game + '');
game.next();
console.log(game + '');

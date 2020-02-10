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
      this.prevBoard = cloneArray(this.board);

      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          let neighbors = this.aliveNeighbors(this.prevBoard, x, y);
          let alive = !!this.board[y][x];
          if (alive) {
            if (neighbors < 2 || neighbors > 3) {
              this.board[y][x] = 0;
            }
          } else {
            if (neighbors == 3) {
              this.board[y][x] = 1;
            }
          }
        }
      }
    },

    aliveNeighbors: (array, x, y) => {
      let prevRow = array[y - 1] || [];
      let nextRow = array[y + 1] || [];
      return [
        prevRow[x - 1],
        prevRow[x],
        prevRow[x + 1],
        array[y][x - 1],
        array[y][x + 1],
        nextRow[x - 1],
        nextRow[x],
        nextRow[x + 1]
      ].reduce((prev, cur) => {
        return prev + +!!cur;
      }, 0);
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

(function() {
  var _ = (self.LifeView = function(table, size) {
    this.grid = table;
    this.size = size;
    this.createGrid();
  });
  _.prototype = {
    createGrid: function() {
      let fragment = document.createDocumentFragment();
      this.grid.innerHTML = '';
      this.checkboxes = [];
      for (let y = 0; y < this.size; y++) {
        let row = document.createElement('tr');
        this.checkboxes[y] = [];
        for (let x = 0; x < this.size; x++) {
          let cell = document.createElement('td');
          let checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          this.checkboxes[y][x] = checkbox;
          cell.appendChild(checkbox);
          row.appendChild(cell);
        }
        fragment.appendChild(row);
      }
      this.grid.appendChild(fragment);
    },

    get boardArray() {
      return this.checkboxes.map(row => {
        return row.map(cell => {
          return +cell.checked;
        });
      });
    },
    play: function() {
      this.game = new Life(this.boardArray);
    },
    next: function() {
      this.game.next();
      let board = this.game.board;
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          console.log(board[y][x]);
          this.checkboxes[y][x].checked = !!board[y][x];
        }
      }
    }
  };
})();
let lifeView = new LifeView(document.getElementById('grid'), 12);

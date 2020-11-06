import { Component, OnInit } from '@angular/core';
import { Square, Value } from './models/value';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  squares: Square[];
  currentPlayer: Value;
  winner: Value;

  constructor() {}

  ngOnInit(): void {
    this.createNewGame();
  }

  createNewGame(): void {
    this.winner = null;
    this.currentPlayer = Value.X;
    this.squares = new Array(9).fill(null).map((s) => new Square());
  }

  clickSquare(index: number): void {
    if (!this.squares[index].value) {
      this.squares[index].value = this.currentPlayer;
      if (this.isWin()) {
        this.winner = this.currentPlayer;
      } else {
        this.changePlayer();
      }
    }
  }

  changePlayer(): void {
    if (this.currentPlayer === Value.X) {
      this.currentPlayer = Value.O;
    } else {
      this.currentPlayer = Value.X;
    }
  }

  isWin(): boolean {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const i of combinations) {
      const [a, b, c] = i;

      if (
        this.squares[a].value &&
        this.squares[a].value === this.squares[b].value &&
        this.squares[a].value === this.squares[c].value
      ) {
        this.squares[a].isWin = true;
        this.squares[b].isWin = true;
        this.squares[c].isWin = true;
        return true;
      }
    }

    return false;
  }

  isEndGame(): boolean {
    return this.winner != null || this.squares.every((s: Square) => !!s.value);
  }
}

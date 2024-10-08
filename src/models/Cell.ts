import { Figure, FigureNames } from "./figures/Figure";
import { Colors } from "./Colors";
import { Board } from "./Board";
import { King } from "./figures/King";
import { Rook } from "./figures/Rook";
export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.figure = figure;
    this.color = color;
    this.available = false;
    this.id = Math.random();
  }
  isEmpty() {
    return this.figure === null;
  }
  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  isEmptyVertical(target: Cell): boolean {
    if (this.x !== target.x) {
      return false;
    }
    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);
    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  isEmptyHorizontal(target: Cell): boolean {
    if (this.y !== target.y) {
      return false;
    }
    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);
    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absY !== absX) {
      return false;
    }
    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;
    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
        return false;
      }
    }
    return true;
  }
  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }
  addLostFigure(figure: Figure) {
    figure.color === Colors.WHITE
      ? this.board.lostWhiteFigures.push(figure)
      : this.board.lostBlackFigures.push(figure);
  }

  moveFigure(target: Cell) {
    if (
      this?.figure?.name === FigureNames.KING &&
      this?.figure?.color === Colors.BLACK &&
      target === this.board.cells[0][2]
    ) {
      this.board.cells[this.y][this.x].figure = null;
      this.board.cells[0][4].figure = null;
      this.board.cells[0][0].figure = null;
      new King(Colors.BLACK, this.board.cells[0][2]);
      new Rook(Colors.BLACK, this.board.cells[0][3]);
    }
    if (
      this?.figure?.name === FigureNames.KING &&
      this?.figure?.color === Colors.BLACK &&
      target === this.board.cells[0][6]
    ) {
      this.board.cells[this.y][this.x].figure = null;
      this.board.cells[0][4].figure = null;
      this.board.cells[0][7].figure = null;
      new King(Colors.BLACK, this.board.cells[0][6]);
      new Rook(Colors.BLACK, this.board.cells[0][5]);
    }
    if (
      this?.figure?.name === FigureNames.KING &&
      this?.figure?.color === Colors.WHITE &&
      target === this.board.cells[7][6]
    ) {
      this.board.cells[this.y][this.x].figure = null;
      this.board.cells[7][4].figure = null;
      this.board.cells[7][7].figure = null;
      new King(Colors.WHITE, this.board.cells[7][6]);
      new Rook(Colors.WHITE, this.board.cells[7][5]);
    }
    if (
      this?.figure?.name === FigureNames.KING &&
      this?.figure?.color === Colors.WHITE &&
      target === this.board.cells[7][2]
    ) {
      this.board.cells[this.y][this.x].figure = null;
      this.board.cells[7][4].figure = null;
      this.board.cells[7][0].figure = null;
      new King(Colors.WHITE, this.board.cells[7][2]);
      new Rook(Colors.WHITE, this.board.cells[7][3]);
    } else {
      if (this.figure && this.figure?.canMove(target)) {
        this.figure.moveFigure(target);
        if (target.figure) {
          this.addLostFigure(target.figure);
        }
        target.setFigure(this.figure);
        this.figure = null;
      }
    }
  }
}

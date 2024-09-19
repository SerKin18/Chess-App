import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (
      (target.y === this.cell.y + 1 || target.y === this.cell.y - 1) &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }
    if (
      (target.y === this.cell.y + 1 || target.y === this.cell.y - 1) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }
    if (
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      target.y === this.cell.y &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    return false;
  }
}

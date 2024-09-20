import React, { FC, useEffect, useState } from "react";

import { Cell } from "../models/Cell";
import { Board } from "../models/Board";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import CellComponent from "./CellComponent";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  currentPlayer,
  swapPlayer,
  setBoard,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }
  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell, currentPlayer?.color);
    updateBoard();
  }
  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h2
        style={{ fontSize: "35px", textAlign: "center", paddingBottom: "20px" }}
      >
        <b
          style={{
            color: currentPlayer?.color === Colors.WHITE ? "white" : "black",
            textTransform: "uppercase",
          }}
        >
          {currentPlayer?.color + "'s "}
        </b>
        move
      </h2>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                click={click}
                cell={cell}
                key={cell.id}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;

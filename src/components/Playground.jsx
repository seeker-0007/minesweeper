import { useState } from "react";

import playgroundSetup from "../utils/playgroundSetup";

import { INITIAL_SETUP_DATA } from "../utils/constants";

const playGroundArr = playgroundSetup(INITIAL_SETUP_DATA);

// PLAYGROUND COMPONENT
export default function Playground({ bombCount, changeBombCount }) {
  const coveredBackgroundColor = {
    backgroundColor: "#bcdcf5",
  };

  const [isPressed, setIndex] = useState(
    Array.from({ length: vars.height }, () => Array(vars.width).fill(0))
  );

  // if opened and 0 then open all nearby
  // if opened and clicked again then check whether all bombs are discovered and open all nearby if yes

  const handleLeftClick = (rowNumber, colNumber) => {
    if (isPressed[rowNumber][colNumber] === 2) return;

    const newIsPressed = [...isPressed];
    newIsPressed[rowNumber][colNumber] = 1;
    setIndex(newIsPressed);

    if (playGroundArr[rowNumber][colNumber] === 0) {
      const positions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      for (const [rowOffset, colOffset] of positions) {
        const newRow = rowNumber + rowOffset;
        const newCol = colNumber + colOffset;

        if (
          newRow >= 0 &&
          newCol >= 0 &&
          newRow < vars.height &&
          newCol < vars.width &&
          isPressed[newRow][newCol] !== 1
        ) {
          handleLeftClick(newRow, newCol);
        }
      }
    }
  };

  const handleRightClick = (event, rowNumber, colNumber) => {
    event.preventDefault();

    if (isPressed[rowNumber][colNumber] === 1) return;

    const newIsPressed = [...isPressed];

    if (isPressed[rowNumber][colNumber] === 2) {
      newIsPressed[rowNumber][colNumber] = 0;
      changeBombCount(bombCount + 1);
    } else {
      newIsPressed[rowNumber][colNumber] = 2;
      changeBombCount(bombCount - 1);
    }

    setIndex(newIsPressed);
  };

  return (
    <div>
      <table style={{ tableLayout: "fixed" }}>
        {playGroundArr.map((row, rowNumber) => (
          <tr key={rowNumber}>
            {row.map((elem, colNumber) => (
              <td
                key={colNumber}
                style={
                  isPressed[rowNumber][colNumber] === 1
                    ? {
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color:
                          elem === 1
                            ? "blue"
                            : elem === 2
                            ? "green"
                            : elem === 4
                            ? "#2d3dca"
                            : elem === 5
                            ? "##851414"
                            : null,
                      }
                    : isPressed[rowNumber][colNumber] === 0
                    ? coveredBackgroundColor
                    : {
                        border: "2px solid red",
                      }
                }
                onClick={() => handleLeftClick(rowNumber, colNumber)}
                onContextMenu={(event) =>
                  handleRightClick(event, rowNumber, colNumber)
                }
              >
                {isPressed[rowNumber][colNumber] === 1
                  ? elem !== 0
                    ? elem
                    : null
                  : isPressed[rowNumber][colNumber] === 2
                  ? "\u{1F6A9}"
                  : null}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}

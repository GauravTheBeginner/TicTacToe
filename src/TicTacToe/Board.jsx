import React, { useState } from "react";
import Square from "./Square";
import { motion, AnimatePresence } from "framer-motion";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXturn, setIsXturn] = useState(true);

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }

    return null;
  };

  const isWinner = checkWinner();

  const handleClick = (index) => {
    if (isWinner || state[index] !== null) {
      return;
    }

    const copyState = [...state];
    copyState[index] = isXturn ? "X" : "O";
    setIsXturn(!isXturn);
    setState(copyState);
  };
  const handlereset = () => {
    setState(Array(9).fill(null));
  };

  return (
    <div className="board-container">
      <AnimatePresence>
        {isWinner ? (
          <>
            <motion.div
              className="winner-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span>{isWinner} is won!</span>
              <br />
              <motion.button
                onClick={handlereset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                Play Again
              </motion.button>
            </motion.div>
          </>
        ) : (
          <>
            {state.every((square) => square !== null) ? (
              <motion.div
                className="draw-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                It's a draw! <br />
                <motion.button
                  onClick={handlereset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  Play Again
                </motion.button>
              </motion.div>
            ) : (
              <div className="board">
                <div className="board-row">
                  <Square onClick={() => handleClick(0)} value={state[0]} />
                  <Square onClick={() => handleClick(1)} value={state[1]} />
                  <Square onClick={() => handleClick(2)} value={state[2]} />
                </div>
                <div className="board-row">
                  <Square onClick={() => handleClick(3)} value={state[3]} />
                  <Square onClick={() => handleClick(4)} value={state[4]} />
                  <Square onClick={() => handleClick(5)} value={state[5]} />
                </div>
                <div className="board-row">
                  <Square onClick={() => handleClick(6)} value={state[6]} />
                  <Square onClick={() => handleClick(7)} value={state[7]} />
                  <Square onClick={() => handleClick(8)} value={state[8]} />
                </div>
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Board;

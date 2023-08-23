import React from "react";
import { motion } from "framer-motion";
const Square = (props) => {
  return (
    <motion.div
      className="square"
      onClick={props.onClick}
      whileHover={{ scale: 1.1 }}
    >
      <h5>{props.value}</h5>
    </motion.div>
  );
};

export default Square;

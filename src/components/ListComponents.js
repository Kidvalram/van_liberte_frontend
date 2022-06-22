import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

const ListComponents = (current,components,variants) => {
    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div 
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={current}
            transition={{ duration: 1 }}
            >
            {components[current-1]}
            </motion.div>
        </AnimatePresence>
    )
}

export default ListComponents

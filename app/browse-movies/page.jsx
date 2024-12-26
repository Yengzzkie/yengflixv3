import { motion } from "framer-motion";

const BrowseMoviesPage = () => {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
      style={{ padding: "20px", textAlign: "center" }}
    >
      <div>BrowseMoviesPage</div>
    </motion.div>
  );
};

export default BrowseMoviesPage;

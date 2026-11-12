import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Initials Logo */}
            <motion.div
              className="text-5xl md:text-6xl font-bold gradient-text"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              II
            </motion.div>

            {/* Spinner */}
            <div className="loading-spinner" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';

interface SlideshowProps {
  images: string[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Slideshow = ({ images }: SlideshowProps): React.ReactNode => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const imageIndex = page % images.length;

  const paginate = (newDirection: number) => {
    setPage([(page + newDirection + images.length) % images.length, newDirection]);
  };

  useEffect(() => {
    if (isHovered) return;

    const timer = setTimeout(() => {
      paginate(1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [page, isHovered, paginate]);


  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[75vh] max-h-[800px] max-w-7xl mx-auto flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl bg-black/80"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          alt={`Member photo ${imageIndex + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>
      <motion.button
        aria-label="Previous image"
        className="absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-black/40 rounded-full p-2 cursor-pointer"
        onClick={() => paginate(-1)}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.6)' }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeftIcon className="h-8 w-8 text-white" />
      </motion.button>
      <motion.button
        aria-label="Next image"
        className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-black/40 rounded-full p-2 cursor-pointer"
        onClick={() => paginate(1)}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.6)' }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRightIcon className="h-8 w-8 text-white" />
      </motion.button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {images.map((_, i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
              i === imageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => setPage([i, i > page ? 1 : -1])}
            whileHover={{ scale: 1.5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
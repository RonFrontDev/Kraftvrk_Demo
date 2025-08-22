
import React from 'react';
import { InstagramIcon } from './IconComponents';

const FloatingChatButton = (): React.ReactNode => {
  return (
    <a
      href="https://ig.me/m/kraftvrk.gym" // Replace with your actual Instagram username
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on Instagram"
      className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-accent bg-gradient-accent-hover flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
    >
      <InstagramIcon className="h-8 w-8 text-black" />
    </a>
  );
};

export default FloatingChatButton;
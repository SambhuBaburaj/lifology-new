import React from 'react';
import { motion } from 'framer-motion';

export default function Modal({ setModalOpen, timeUpdate, userDetails }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
    >
      <div className="relative w-auto max-w-lg mx-auto my-6">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg relative flex flex-col w-full p-8"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Hello {userDetails?.username}</h2>
          <h2 className="text-3xl font-bold mb-4 text-center">Welcome to Task Master</h2>
          <h2 className="text-xl font-bold mb-4 text-center">Let's start your journey</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={timeUpdate}
            className="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md self-center"
          >
            Let's start
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

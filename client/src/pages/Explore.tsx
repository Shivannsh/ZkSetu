import React from 'react';
import { motion } from 'framer-motion';

export const Explore: React.FC<{}> = (props) => {
  return (
    <section className="pt-0 pb-20 md:pb-10 bg-gradient-to-b from-white via-green-300 to-green-400 overflow-x-clip h-screen w-screen"> 
      <div className="container mx-auto px-4">
        <div className="md:flex items-center justify-between">
          
          {/* Left Section - Text and Buttons */}
          <div className="md:w-[478px]">
            <div className="tag text-black mt-[100px]">Version 1.0 is here</div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-b from-green-300 via-green-400 to-green-600 text-transparent bg-clip-text mt-6">
              P2P aligned layer
            </h1>
            <p className="text-xl text-black tracking-tight mt-6">
              Simplifying the tracking
            </p>
            <div className="flex gap-3 items-center mt-[30px]">
              <a href="">
                <button className="btn btn-primary px-5 py-3 bg-black text-white rounded-md">Get Started</button>
              </a>
              <button className="btn btn-text gap-1 px-5 py-3 bg-transparent text-black border-green-500 border rounded-md">
                <span>Learn more</span>
                <svg
                  className="h-5 w-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Floating Logos */}
            <div className="relative mt-10">
              <motion.div
                className="flex gap-10"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 12,  // Adjust speed here
                  ease: 'linear'
                }}
              >
                <img
                  src="https://www.optimism.io/optimism.svg"
                  alt="Optimism Logo"
                  className="h-12 w-36"
                />
                <img
                  src="https://www.base.org/_next/static/media/logo.f6fdedfc.svg"
                  alt="Base Logo"
                  className="h-12 w-auto"
                />
                <img
                  src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024"
                  alt="Ethereum Logo"
                  className="h-12 w-auto"
                />
                <img
                  src="https://cryptologos.cc/logos/aptos-apt-logo.svg?v=024"
                  alt="Aptos Logo"
                  className="h-12 w-auto"
                />
                <img
                  src="https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=024"
                  alt="Arbitrum Logo"
                  className="h-12 w-auto"
                />
                <img
                  src="https://cryptologos.cc/logos/polygon-matic-logo.svg?v=024"
                  alt="Polygon Logo"
                  className="h-12 w-auto"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Section - Animated Image */}
          <motion.div
            className="md:w-[478px] md:mt-[30px]"
            initial={{ x: 300, opacity: 0 }}  // Start off-screen to the right
            animate={{ x: 0, opacity: 1 }}    // Slide in from the right
            transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }} // 2-second delay for initial animation
          >
            {/* Infinite Y-axis up and down movement */}
            <motion.img
              src="https://pbs.twimg.com/profile_images/1839426364669304832/tT590_qH_400x400.jpg"
              alt="Aligned Layer Image"
              className="rounded-lg shadow-lg h-[200px]"
              animate={{ y: [-10, 10, -10] }}  // Moves 10px up and down
              transition={{ 
                repeat: Infinity,               // Infinite loop
                duration: 3,                    // 2 seconds for the full loop
                ease: 'easeInOut',              // Smooth easing
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};



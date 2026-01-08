import { motion } from 'framer-motion';
// Bug component to handle individual movement
const Bug = ({ initialPos, duration, delay }:{
    initialPos: { x: number; y: number };
    duration: number;
    delay: number;
}) => (
<motion.div
    initial={initialPos}
    animate={{ 
    x: [initialPos.x, initialPos.x + 20, initialPos.x - 10, initialPos.x],
    y: [initialPos.y, initialPos.y - 15, initialPos.y + 10, initialPos.y],
    rotate: [0, 10, -10, 0]
    }}
    transition={{
    duration: duration,
    repeat: Infinity,
    delay: delay,
    ease: "linear"
    }}
    className="absolute text-green-400 opacity-80"
>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,7H16.19C15.74,5.26 14.18,4 12.31,4H11.69C9.82,4 8.26,5.26 7.81,7H5V9H7.13C7.05,9.33 7,9.66 7,10V11H5V13H7V14C7,14.34 7.05,14.67 7.13,15H5V17H7.81C8.26,18.74 9.82,20 11.69,20H12.31C14.18,20 15.74,18.74 16.19,17H19V15H16.87C16.95,14.67 17,14.34 17,14V13H19V11H17V10C17,9.66 16.95,9.33 16.87,9H19V7Z" />
    </svg>
</motion.div>
);

const NotFound = () => {


  return (
    <div className="min-h-screen bg-[#6b46c1] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Bugs */}
      <Bug initialPos={{ x: -200, y: -150 }} duration={5} delay={0} />
      <Bug initialPos={{ x: 300, y: -200 }} duration={7} delay={1} />
      <Bug initialPos={{ x: -350, y: 100 }} duration={6} delay={2} />
      <Bug initialPos={{ x: 400, y: 200 }} duration={8} delay={0.5} />

      {/* Main Content Card */}
      <div className="bg-black w-full max-w-4xl rounded-[40px] p-12 md:p-20 flex flex-col items-center text-center relative z-10 shadow-2xl">
        
        {/* Header Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="bg-yellow-400 rounded-full p-1 text-black font-bold text-xs">WN</div>
          <span className="text-white font-medium tracking-tight">WhisperNode</span>
        </div>

        {/* 404 Display */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <h1 className="text-white text-[120px] md:text-[200px] font-black leading-none">4</h1>
          
          {/* Jumping Emoji Container */}
          <div className="flex flex-col items-center">
            <motion.div 
              animate={{ y: [0, -40, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 md:w-24 md:h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl border-4 border-black"
            >
              😵‍💫
            </motion.div>
            <div className="w-12 h-2 bg-white/20 rounded-full mt-4 blur-sm" />
          </div>

          <h1 className="text-white text-[120px] md:text-[200px] font-black leading-none">4</h1>
        </div>

        {/* Text Section */}
        <p className="text-gray-400 max-w-md text-sm md:text-base mb-10 leading-relaxed">
          The Page You're Looking for Can't be Found, It's Looks Like You're Trying to Access a Page That Either Has Been Deleted or Never Existed...
        </p>

        {/* Home Button */}
        <button className="bg-yellow-400 hover:bg-yellow-300 transition-colors text-black font-bold py-3 px-10 rounded-xl uppercase text-sm tracking-wider">
          Home Page
        </button>

        {/* Footer */}
        <div className="w-full mt-20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-xs">© 2026 ApolloNFT. All rights reserved</p>
        
        </div>
      </div>
    </div>
  );
};


export default NotFound;
import React from "react";
import { useSpring, animated, config } from "@react-spring/web";

const Loading = () => {
  const props = useSpring({
    loop: true,
    from: { scale: 0.8, opacity: 0.5 },
    to: [
      { scale: 1.1, opacity: 1 },
      { scale: 0.8, opacity: 0.5 },
    ],
    config: config.molasses,
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 bg-opacity-20 z-50">
      <animated.div style={props}>
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin shadow-lg"></div>
          
          {/* Inner glowing circle */}
          <div className="w-12 h-12 bg-green-500 rounded-full animate-pulse shadow-inner"></div>

          {/* Optional text */}
          <span className="absolute text-green-700 text-lg font-semibold top-full mt-4">
            Loading...
          </span>
        </div>
      </animated.div>
    </div>
  );
};

export default Loading;
import React, { useState, useEffect } from 'react';

const MobileWarning = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm sm:text-base">
            For the best experience, please view this website on a desktop device. Mobile version is still under development!
          </p>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="ml-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default MobileWarning; 
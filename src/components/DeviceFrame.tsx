import React from 'react';
import { Wifi, Battery, Signal, Zap } from 'lucide-react';
import { ThemeConfig } from '../types';

interface DeviceFrameProps {
  children: React.ReactNode;
  theme: ThemeConfig;
  isDeviceFrame: boolean;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  theme,
  isDeviceFrame,
}) => {
  if (!isDeviceFrame) {
    return <div className="w-full min-h-screen">{children}</div>;
  }

  return (
    <div className="w-full min-h-screen py-3 sm:py-6 px-0 sm:px-4 flex items-center justify-center bg-zinc-950/80">
      {/* Smartphone Mockup: Realme P3 (12 GB RAM, AMOLED 120Hz) */}
      <div className="w-full max-w-[430px] rounded-[44px] p-3 bg-[#111115] shadow-[0_0_50px_rgba(0,0,0,0.9),0_20px_40px_rgba(0,0,0,0.8)] border-[6px] border-[#25252E] relative flex flex-col overflow-hidden">
        {/* Device Speaker / Microphone subtle bar */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-1 bg-zinc-800 rounded-full z-50 pointer-events-none" />

        {/* Screen Bezel Inner Container */}
        <div 
          className={`w-full rounded-[36px] overflow-hidden flex flex-col relative min-h-[820px] max-h-[92vh] border border-white/5 ${theme.bgClass}`}
        >
          {/* Realme Status Bar */}
          <div className="pt-2 px-5 pb-1 flex items-center justify-between text-[11px] font-medium tracking-tight select-none z-50 pointer-events-none shrink-0 bg-transparent text-white/80">
            {/* Left: Time */}
            <span className="font-semibold text-xs">13:45</span>

            {/* Center: Punch-Hole Camera */}
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-zinc-800 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-950/80" />
            </div>

            {/* Right: Realme P3 Specs Status Icons */}
            <div className="flex items-center gap-1.5 text-[10px] font-mono">
              <span className="px-1 rounded bg-white/10 text-[9px] font-bold text-sky-300">
                120Hz
              </span>
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <div className="flex items-center gap-0.5">
                <span className="text-[9px]">98%</span>
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 overflow-y-auto relative no-scrollbar">
            {children}
          </div>

          {/* Bottom Android Gesture Bar */}
          <div className="py-1 flex justify-center z-50 pointer-events-none bg-transparent">
            <div className="w-28 h-1 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

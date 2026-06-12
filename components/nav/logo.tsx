'use client';

import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="relative flex w-[40px] h-[40px]  rounded-lg border border-gold-700 overflow-hidden ">
      <Image
        src="/ai-avatar.png"
        // src="/favicon.png"
        alt="xonnect Logo"
        fill
        className=" object-cover absolute"
      />
    </div>
  );
};

export default Logo;

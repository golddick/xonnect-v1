'use client';

import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="relative flex w-5 h-5 md:w-[40px] md:h-[40px]  rounded-lg border border-gold-700 overflow-hidden ">
      <Image
        src="/xonnect-logo.png"
        alt="xonnect Logo"
        fill
        className=" object-cover absolute"
      />
    </div>
  );
};

export default Logo;

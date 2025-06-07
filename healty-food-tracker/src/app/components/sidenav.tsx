'use client'

import NavLinks from '@/app/components/dashboard/nav-links';
import React from 'react';

const SideNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col px-3 py-4 md:px-2 bg-white shadow-lg z-10">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}

export default SideNav;

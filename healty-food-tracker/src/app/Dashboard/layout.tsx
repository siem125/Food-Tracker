'use client'

import SideNav from '@/app/components/sidenav';
import React from 'react';
import { ModalProvider } from '@/app/components/Modal/ModalContext/ModalContext';
import CustomModal from '@/app/components/Modal/Modals/CustomModal';
import { ThemeProvider } from '@/app/components/ThemeChanger/ThemeContext/ThemeContext'; // Import ThemeContext for theme management

interface LayoutProps {
  children: React.ReactNode;
  useStorySideNav?: boolean; // Optional prop, default is false
}

export default function Layout({ children, useStorySideNav = false }: LayoutProps) {
  return (
    <ThemeProvider>
      <ModalProvider>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
              <div className="w-full flex-none md:w-64">
                {<SideNav />}
              </div>
              <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
          </div>
          <CustomModal />
      </ModalProvider>
    </ThemeProvider>
  );
}
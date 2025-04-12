"use client";

import React, { useEffect } from "react";
import Navbar from "@/(components)/Navbar";
import Sidebar from "@/(components)/Sidebar";
import StoreProvider from "./StoreProvider";
import { useAppSelector } from "@/lib/hooks";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  /** 
  @description useEffect to add dark class to html element
  @reason This is to make sure that the dark mode is applied to the whole app
  */
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />

      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />

        {children}
      </main>
    </div>
  );
};
/**
 *
 * @description This is the wrapper for the dashboard layout
 * @param {React.ReactNode} children - The children to be rendered inside the dashboard layout
 * @explanation This is to make sure that the store provider is wrapped around the dashboard layout
 * @explanation We want to set this as use client but we can't set it in the layout
 * @explanation because it will cause the layout to be a client component
 * @explanation So we have to set it in the wrapper
 * @explanation This is to make sure that the store provider is wrapped around the dashboard layout
 */
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;

"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setIsSidebarCollapsed } from "@/lib/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import { SidebarLink } from "./sidebar-link";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16 " : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8
          ${isSidebarCollapsed ? "px-5" : "px-8"}`}
      >
        <Image
          src="https://s3-inventory-management-bucket1.s3.ca-central-1.amazonaws.com/logo.png"
          alt="Logo"
          width={27}
          height={27}
          className="rounded-full w-8"
        />
        <h1
          className={`font-extrabold text-2xl uppercase ${
            isSidebarCollapsed ? "hidden" : "block"
          }`}
        >
          footywear
        </h1>

        <button
          className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          icon={CircleDollarSign}
          label="Expenses"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2025 Mark Corbin
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

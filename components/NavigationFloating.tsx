'use client';

import { FloatingNav } from "@/components/ui/floating-navbar";
import LoginModalAnimated from './LoginModalAnimated';

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Docs",
    link: "/docs",
  },
];

export default function NavigationFloating() {
  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[5001]">
        <div className="text-2xl md:text-3xl font-bold tracking-[0.3em]">
          SOSA
        </div>
      </div>
      <FloatingNav navItems={navItems}>
        <LoginModalAnimated triggerClassName="border text-sm font-medium relative border-white/[0.2] text-white px-4 py-2 rounded-full" />
      </FloatingNav>
    </>
  );
}
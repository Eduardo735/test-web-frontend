"use client";

import { Menu, Settings, X } from "lucide-react";

import Link from "next/link";
import { Suspense, useState } from "react";

import { cn } from "@/app/lib/utils";
import { Button } from "../ui/button";
import { JoinTurtleCommunity } from "../user-detail/join-turtle-community";
import { UserAvatarInfo } from "../user-detail/user-avatar-info";
import styles from "./protected-header.module.css";

export default function ProtectedHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const configSheet = {
  //   icon: <Settings className="flex items-center justify-center" />,
  //   title: <p>Configuración</p>,
  // };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-black/95">
      <div className={cn(styles.container, "flex justify-between")}>
        <div className="flex justify-between items-center py-4 px-2 gap-2">
          <span className="text-white font-bold text-lg pb-1">🐢</span>
          <span className="text-xl font-bold text-slate-900">TurtleTrader</span>
        </div>
        <div className="hidden md:flex justify-between items-center py-4 px-2 gap-4">
          <Link
            href="#features"
            className="text-slate-600 hover:text-green-800"
          >
            Funciones
          </Link>
          <Link href="#pricing" className="text-slate-600 hover:text-green-800">
            Precios
          </Link>
          <Link href="#pricing">
            <Button size="sm">Inicia una prueba gratis</Button>
          </Link>
          <Link href="/home" className="text-slate-600 hover:text-green-800">
            Ir a la aplicación
          </Link>
          <Suspense fallback={<div className="h-9" />}>
            <JoinTurtleCommunity />
            <UserAvatarInfo />
          </Suspense>
        </div>
        <button
          className="md:hidden py-4 px-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden py-4 border-t">
          <div className="flex justify-end mr-3">
            <Suspense fallback={<div className="h-9" />}>
              <JoinTurtleCommunity />
              <UserAvatarInfo />
            </Suspense>
            {/* <MenuSheet {...configSheet}>
              <div className="flex justify-end items-center">
                <div className="pr-2">Theme</div>
              </div>
            </MenuSheet> */}
          </div>
          <nav className="flex flex-col gap-4 pl-8">
            <Link
              href="#services"
              className="text-sm font-medium transition-colors hover:text-green-800"
            >
              Funciones
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-green-800"
            >
              Pricing
            </Link>
            <Link
              href="/home"
              className="text-sm font-medium transition-colors hover:text-green-800"
            >
              Ir a la aplicación
            </Link>
            <Link href="/home">
              <Button size="sm">Inicia una prueba gratis</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
function useTranslations(arg0: string) {
  throw new Error("Function not implemented.");
}

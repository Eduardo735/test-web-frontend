"use client";

import Link from "next/link";
import { Button } from "./components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Burbujas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-4 h-4 bg-blue-200 rounded-full animate-bounce opacity-60"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-6 h-6 bg-blue-300 rounded-full animate-bounce opacity-40"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-3 h-3 bg-green-200 rounded-full animate-bounce opacity-50"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-5 h-5 bg-blue-400 rounded-full animate-bounce opacity-30"
          style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
        ></div>
      </div>

      <div className="text-center z-10 max-w-md mx-auto">
        {/* Tortuga SVG Animada */}
        <div className="mb-8 relative">
          <div className="animate-float"></div>

          {/* Ondas de agua */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-blue-300 rounded-full animate-wave opacity-60"></div>
              <div
                className="w-12 h-1 bg-blue-400 rounded-full animate-wave opacity-40"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-8 h-1 bg-blue-300 rounded-full animate-wave opacity-60"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Texto 404 */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-green-600 mb-2 animate-bounce">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            ¡Página no encontrada!
          </h2>
        </div>

        {/* Botón de regreso */}
        <Link href="/">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
            🏠 Volver al inicio
          </Button>
        </Link>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }

        @keyframes wave {
          0%,
          100% {
            transform: scaleX(1);
            opacity: 0.6;
          }
          50% {
            transform: scaleX(1.2);
            opacity: 0.3;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

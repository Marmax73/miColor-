import { useState, useEffect } from "react";
import Link from "next/link";

export default function RegistroDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta si es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-sm font-medium text-[var(--color-accent-rose)] bg-white rounded-md shadow hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] focus:outline-none"
      >
        Registro
      </button>

      {isOpen && (
        <div
          className={`absolute mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-[var(--color-accent-rose)] ring-opacity-50 z-50 transition-all duration-300 ease-in-out`}
        >
          <div className="py-1">
            <Link
              href="/RegistroCliente"
              className="block px-4 py-2 text-sm text-[var(--color-accent-rose)] hover:bg-[var(--color-accent-rose]"
              onClick={() => setIsOpen(false)}
            >
              Registro Cliente
            </Link>
            <Link
              href="/RegistroTienda"
              className="block px-4 py-2 text-sm text-[var(--color-accent-rose)] hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Registro Tienda
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

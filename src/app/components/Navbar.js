"use client";
import { useState } from "react";
import Link from "next/link";
import RegistroDropdown from "./RegistroDropdown/RegistroDropdown";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleCloseMenu = () => setOpen(false);

  return (
    <nav className="bg-bg text-accent-rose px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo + Links principales (desktop) */}
        <div className="flex items-center gap-6 ">
          <Link
            href="/"
            className="text-2xl font-bold"
            onClick={handleCloseMenu}
          >
          <h1 className="text-3xl font-bold text-[var(--color-accent-rose)] hover:text-white">       
            Vidriera
          </h1>
            
          </Link>

          {/* Links principales (solo desktop) */}
          <ul className="hidden md:flex gap-6">
            <li className="px-2 rounded-sm hover:bg-accent-rose hover:text-white">
              <Link href="/" onClick={handleCloseMenu}>Inicio</Link>
            </li>
            <li className="px-2 rounded-sm hover:bg-accent-rose hover:text-white">
              <Link href="/about" onClick={handleCloseMenu}>Nosotros</Link>
            </li>
            <li className="px-2 rounded-sm hover:bg-accent-rose hover:text-white">
              <Link href="/contact" onClick={handleCloseMenu}>Contacto</Link>
            </li>
          </ul>
        </div>

        {/* Botón hamburguesa (solo mobile) */}
        <button
          className="md:hidden text-[var(--color-accent-rose)] text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>

        {/* Botones de acción (solo desktop) */}
        <ul className="hidden md:flex gap-4">
          <li className="mr-3 mt-0.8 pt-2 pb-2 px-3 border-3 border-white rounded-lg hover:border border-[var(--color-gold-strong)] hover:text-[var(--color-gold-strong)]">
            <Link href="/" onClick={handleCloseMenu}>Ingresar</Link>
          </li>
          <li className="px-3 pt-1 pb-1 rounded-lg hover:border border-[var(--color-accent-rose)]] hover:text-white justify-items-start">
            <RegistroDropdown onLinkClick={handleCloseMenu} />
          </li>
        </ul>
      </div>

      {/* Menú desplegable (mobile) */}
      {open && (
        <ul className="flex flex-col mt-4 gap-4 md:hidden">
          <li><Link href="/" onClick={handleCloseMenu}>Inicio</Link></li>
          <li><Link href="/about" onClick={handleCloseMenu}>Nosotros</Link></li>
          <li><Link href="/contact" onClick={handleCloseMenu}>Contacto</Link></li>
          <li className="hover:scale-105 hover:border border[var(--color-accent-rose) hover:text-center] hover:rounded-md pl-2">
            <Link href="/" onClick={handleCloseMenu}>Ingresar</Link>
          </li>
          <RegistroDropdown onLinkClick={handleCloseMenu} />
        </ul>
      )}
    </nav>
  );
}

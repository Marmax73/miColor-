import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegistroDropdown from "./RegistroDropdown";

// Mock de next/link
jest.mock("next/link", () => {
  return ({ children, href, onClick }) => (
     <a href={href} onClick={onClick}>{children}</a>
  );
});

describe("RegistroDropdown component", () => {
  beforeEach(() => {
    // Resetear tamaño de ventana antes de cada test
    window.innerWidth = 1024; // Desktop por defecto
    fireEvent(window, new Event("resize"));
  });

  test("renderiza el botón 'Registro'", () => {
    render(<RegistroDropdown />);
    expect(screen.getByText("Registro")).toBeInTheDocument();
  });

  test("toggle del dropdown al hacer click en el botón", () => {
    render(<RegistroDropdown />);
    const button = screen.getByText("Registro");

    // Dropdown no visible al inicio
    expect(screen.queryByText("Registro Tienda")).not.toBeInTheDocument();

    // Abrir
    fireEvent.click(button);
    expect(screen.getByText("Registro Tienda")).toBeInTheDocument();

    // Cerrar
    fireEvent.click(button);
    expect(screen.queryByText("Registro Tienda")).not.toBeInTheDocument();
  });

  test("al hacer click en un link, cierra el dropdown y llama a onLinkClick", () => {
    const mockOnLinkClick = jest.fn();
    render(<RegistroDropdown onLinkClick={mockOnLinkClick} />);
    const button = screen.getByText("Registro");

    fireEvent.click(button); // Abrir dropdown
    const link = screen.getByText("Registro Tienda");
    fireEvent.click(link);

    expect(screen.queryByText("Registro Tienda")).not.toBeInTheDocument();
    expect(mockOnLinkClick).toHaveBeenCalledTimes(1);
  });

  test("cambia la clase del dropdown según el tamaño de la ventana (modo móvil)", () => {
    render(<RegistroDropdown />);
    const button = screen.getByText("Registro");

    // Simular pantalla móvil
    window.innerWidth = 375;
    fireEvent(window, new Event("resize"));

    fireEvent.click(button); // Abrir dropdown

    const dropdown = screen.getByText("Registro Tienda").parentElement.parentElement;
    expect(dropdown.className).toMatch(/left-1\/5/); // Clase que indica modo móvil
  });

  test("mantiene clase de desktop en pantalla grande", () => {
    render(<RegistroDropdown />);
    const button = screen.getByText("Registro");

    window.innerWidth = 1024;
    fireEvent(window, new Event("resize"));

    fireEvent.click(button); // Abrir dropdown

    const dropdown = screen.getByText("Registro Tienda").parentElement.parentElement;
    expect(dropdown.className).toMatch(/left-0/); // Clase que indica modo desktop
  });
});

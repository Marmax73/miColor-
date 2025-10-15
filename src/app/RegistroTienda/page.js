
"use client";

import { useState } from 'react';
import { encryptData } from '../utils/jwt';
import TextoIndicativo from '../components/TextoGenerico/texto';

export default function RegistroTienda() {
  const [form, setForm] = useState({ nombre: '', apellido: '', localidad: '', numeroDeMobil: '', direccionComercial: '', cuit: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = encryptData(form);

    const res = await fetch('/api/userTienda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    if (data.success) alert('Usuario creado: ' + data.userId);
    else alert('Error: ' + data.error);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="w-full p-2 border rounded"/>
      <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} className="w-full p-2 border rounded"/>
      <input name="localidad" placeholder="Localidad" value={form.localidad} onChange={handleChange} className="w-full p-2 border rounded"/>
      <input name="numeroDeMobil" placeholder="Número de móvil" value={form.numeroDeMobil} onChange={handleChange} className="w-full p-2 border rounded"/>
      <input name="direccionComercial" placeholder="Dirección Comercial" value={form.direccionComercial} onChange={handleChange} className="w-full p-2 border rounded"/>
      <input name="cuit" placeholder="CUIT" value={form.cuit} onChange={handleChange} className="w-full p-2 border rounded"/>
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Registrar Tienda</button><hr />
      <TextoIndicativo />
    </form>
  );
}

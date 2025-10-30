"use client";
import React, { useState } from 'react';
import {
  validateName,
  validateEmail,
  validateApellido,
  validatePassword,
  validatePhone
} from '@/utils/validations/validations';

const UserForm = () => {
  const [formData, setFormData] = useState({
    perfil: 'userCliente',
    nombre: '',
    apellido: '',
    telefono: '',
    localidad: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!validateName(formData.nombre)) {
      validationErrors.nombre = 'Nombre inválido (mínimo 3 letras)';
    }
    if (!validateApellido(formData.apellido)) {
      validationErrors.apellido = 'Apellido inválido (mínimo 3 letras, ni símbolos ni números)';
    }
    if (!validatePhone(formData.telefono)) {
      validationErrors.telefono = 'Teléfono inválido (formato argentino)';
    }
    if (!validateEmail(formData.email)) {
      validationErrors.email = 'Email inválido';
    }
    if (!validatePassword(formData.password)) {
      validationErrors.password = 'La contraseña debe tener 8+ caracteres, 1 mayúscula, 1 número y 1 caracter especial';
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        

        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
        });

        const rawText = await response.text(); // ⚠ obtenemos SIEMPRE el cuerpo como texto
        console.log("🧾 Respuesta cruda del servidor:", rawText);

        let data;
        try {
          data = JSON.parse(rawText);
        } catch (err) {
          console.error("⚠️ El servidor no devolvió JSON válido");
          alert("El servidor devolvió una respuesta inesperada. Ver consola para detalles.");
          return;
        }


        if (response.ok) {
          alert('Registro exitoso');
          setFormData({
            nombre: '',
            apellido: '',
            telefono: '',
            localidad: '',
            email: '',
            password: ''
          });
          setErrors({});
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error en el envío:', error);
        alert('No se pudo enviar el formulario. Intenta nuevamente.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="mt-24 w-full px-4 lg:w-[30%] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-[#DB5F7A] rounded-lg p-6 shadow-md bg-white"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#DB5F7A]">Registro cliente</h2>

        {[
          { id: 'nombre', label: 'Nombre' },
          { id: 'apellido', label: 'Apellido' },
          { id: 'telefono', label: 'Teléfono' },
          { id: 'localidad', label: 'Localidad' },
          { id: 'email', label: 'Email', type: 'email' },
          { id: 'password', label: 'Contraseña', type: 'password' }
        ].map(({ id, label, type = 'text' }) => (
          <div key={id} className="mb-4">
            <label
              htmlFor={id}
              className="block text-sm font-medium text-[#666666] mb-1"
            >
              {label}
            </label>
            <input
              type={type}
              id={id}
              name={id}
              value={formData[id]}
              onChange={handleChange}
              className="w-full border border-[#666666] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DB5F7A] text-[#666666]"
            />
            {errors[id] && (
              <p className="text-sm text-red-500 mt-1">{errors[id]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-[#DB5F7A] text-white py-2 rounded-md hover:bg-[#c44e6a] transition-colors"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default UserForm;

"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Strength({ password }: { password: string }) {
  const [strength, setStrength] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const calculateStrength = () => {
      let score = 0;
      
      if (!password) {
        setStrength(0);
        setMessage("");
        return;
      }

      // Comprimento
      if (password.length >= 5) score++;
      if (password.length >= 10) score++;

      // Letras maiúsculas
      if (/[A-Z]/.test(password)) score++;
      
      // Letras minúsculas
      if (/[a-z]/.test(password)) score++;
      
      // Números
      if (/[0-9]/.test(password)) score++;
      
      // Caracteres especiais
      if (/[^A-Za-z0-9]/.test(password)) score++;

      // Calcular porcentagem (máximo 6 pontos)
      const percentage = Math.min((score / 6) * 100, 100);
      setStrength(percentage);

      // Definir mensagem
      if (percentage <= 25) {
        setMessage("Senha fraca");
      } else if (percentage <= 50) {
        setMessage("Senha média");
      } else if (percentage <= 75) {
        setMessage("Senha boa");
      } else {
        setMessage("Senha excelente");
      }
    };

    calculateStrength();
  }, [password]);

  if (!password) return null;

  const getColor = () => {
    if (strength <= 25) return "bg-red-500";
    if (strength <= 50) return "bg-orange-500";
    if (strength <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getTextColor = () => {
    if (strength <= 25) return "text-red-600";
    if (strength <= 50) return "text-orange-600";
    if (strength <= 75) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="mt-2 space-y-1">
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getColor()}`}
          style={{ width: `${strength}%` }}
        />
      </div>
      <p className={`text-xs ${getTextColor()}`}>{message}</p>
    </div>
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`
        w-full bg-gray-800 bg-opacity-40 rounded 
        border border-gray-700 focus:outline-none 
        text-base outline-none text-gray-100 
        py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
        ${className}
      `}
      {...props}
    />
  );
}

export function Password({ className = "", showStrength = false, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(prevState => !prevState);

  return (
    <div className="relative">
      <Input
        props={{
          type: isVisible ? "text" : "password",
          ...props
        }}
        className={className}
      />
      <button
        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-foreground/80 hover:text-foreground/80 transition-colors"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={isVisible}
      >
        {isVisible ? (
          <EyeOff size={18} aria-hidden="true" />
        ) : (
          <Eye size={18} aria-hidden="true" />
        )}
      </button>
      {showStrength && <Strength password={props.value || ""} />}
    </div>
  );
}
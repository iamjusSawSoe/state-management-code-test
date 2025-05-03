"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = ({ text, ...props }: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out cursor-pointer"
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;

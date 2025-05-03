"use client";

import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footerContent,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 backdrop-blur-[2px] z-50 "
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
            <RiCloseCircleLine
              fontSize={25}
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
            />
          </div>

          <div className="p-6">{children}</div>

          {footerContent && (
            <div className="flex justify-end p-4 border-t">{footerContent}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;

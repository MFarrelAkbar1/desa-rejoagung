// components/DeleteConfirmation.tsx
"use client";

import { useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";

interface DeleteConfirmationProps {
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  buttonText?: string;
  buttonClassName?: string;
  requireTyping?: boolean;
  disabled?: boolean;
}

export default function DeleteConfirmation({
  onConfirm,
  title = "Konfirmasi Hapus",
  description = "Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.",
  confirmText = "HAPUS",
  buttonText,
  buttonClassName,
  requireTyping = false,
  disabled = false
}: DeleteConfirmationProps) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typedText, setTypedText] = useState("");

  const handleDelete = async () => {
    if (requireTyping && typedText !== confirmText) {
      alert(`Ketik "${confirmText}" untuk konfirmasi`);
      return;
    }

    setIsDeleting(true);
    try {
      await onConfirm();
      setShowModal(false);
      setTypedText("");
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setTypedText("");
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setShowModal(true)}
        disabled={disabled}
        className={
          buttonClassName ||
          "p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        }
        title={buttonText || "Hapus"}
      >
        {buttonText ? (
          <span className="flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            {buttonText}
          </span>
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">
                {description}
              </p>

              {/* Confirmation Input */}
              {requireTyping && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ketik <span className="font-bold text-red-600">"{confirmText}"</span> untuk konfirmasi:
                  </label>
                  <input
                    type="text"
                    value={typedText}
                    onChange={(e) => setTypedText(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder={confirmText}
                    autoComplete="off"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handleCancel}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={
                    isDeleting || 
                    (requireTyping && typedText !== confirmText)
                  }
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Menghapus...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Hapus
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
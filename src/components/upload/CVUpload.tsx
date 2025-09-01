'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface CVUploadProps {
  onUploadSuccess?: (file: File, url: string) => void;
  onUploadError?: (error: string) => void;
  className?: string;
}

interface UploadState {
  status: 'idle' | 'uploading' | 'success' | 'error';
  message?: string;
  file?: File;
}

export default function CVUpload({
  onUploadSuccess,
  onUploadError,
  className = ''
}: CVUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({ status: 'idle' });

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        setUploadState({
          status: 'error',
          message: error.code === 'file-invalid-type'
            ? 'Solo se permiten archivos PDF'
            : error.code === 'file-too-large'
            ? 'El archivo es demasiado grande (máximo 10MB)'
            : 'Error al procesar el archivo'
        });
        onUploadError?.(uploadState.message!);
        return;
      }

      // Handle accepted files
      const file = acceptedFiles[0];
      if (file) {
        setUploadState({
          status: 'uploading',
          file
        });

        // Simulate upload (replace with actual upload logic)
        setTimeout(() => {
          const mockUrl = `https://mock-storage.com/${file.name}`;
          setUploadState({
            status: 'success',
            file,
            message: 'CV subido exitosamente'
          });
          onUploadSuccess?.(file, mockUrl);
        }, 2000);
      }
    },
    [onUploadSuccess, onUploadError, uploadState.message]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    disabled: uploadState.status === 'uploading'
  });

  const resetUpload = () => {
    setUploadState({ status: 'idle' });
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragActive
            ? 'border-primary-400 bg-primary-50/50 scale-105'
            : 'border-primary-300 hover:border-primary-400 hover:bg-primary-50/30'
          }
          ${uploadState.status === 'uploading' ? 'pointer-events-none opacity-75' : ''}
          ${uploadState.status === 'success' ? 'border-green-400 bg-green-50/50' : ''}
          ${uploadState.status === 'error' ? 'border-red-400 bg-red-50/50' : ''}
        `}
      >
        <input {...getInputProps()} />

        {/* Upload Icon */}
        <div className="flex justify-center mb-6">
          {uploadState.status === 'uploading' ? (
            <Loader className="w-16 h-16 text-primary-500 animate-spin" />
          ) : uploadState.status === 'success' ? (
            <CheckCircle className="w-16 h-16 text-green-500" />
          ) : uploadState.status === 'error' ? (
            <AlertCircle className="w-16 h-16 text-red-500" />
          ) : (
            <div className="relative">
              <Upload className={`w-16 h-16 transition-colors ${
                isDragActive ? 'text-primary-500' : 'text-primary-400'
              }`} />
              <FileText className="w-8 h-8 text-white absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-1" />
            </div>
          )}
        </div>

        {/* Main Text */}
        <div className="mb-4">
          {uploadState.status === 'uploading' ? (
            <h3 className="text-xl font-display font-semibold text-primary-600 mb-2">
              Subiendo CV...
            </h3>
          ) : uploadState.status === 'success' ? (
            <h3 className="text-xl font-display font-semibold text-green-600 mb-2">
              ¡CV subido exitosamente!
            </h3>
          ) : uploadState.status === 'error' ? (
            <h3 className="text-xl font-display font-semibold text-red-600 mb-2">
              Error al subir CV
            </h3>
          ) : (
            <h3 className="text-xl font-display font-semibold text-dark-aqua mb-2">
              {isDragActive ? '¡Suelta el archivo aquí!' : 'Sube tu CV en PDF'}
            </h3>
          )}
        </div>

        {/* Description */}
        <div className="text-sm text-primary-600/80 font-sans">
          {uploadState.status === 'uploading' ? (
            <p>Procesando tu archivo, por favor espera...</p>
          ) : uploadState.status === 'success' ? (
            <p>Tu CV ha sido procesado y guardado correctamente</p>
          ) : uploadState.status === 'error' ? (
            <p className="text-red-600">{uploadState.message}</p>
          ) : (
            <div>
              <p className="mb-2">
                Arrastra y suelta tu archivo PDF aquí, o haz clic para seleccionar
              </p>
              <p className="text-xs opacity-60">
                Máximo 10MB • Solo archivos PDF
              </p>
            </div>
          )}
        </div>

        {/* File Info */}
        {uploadState.file && (
          <div className="mt-6 p-4 bg-white/50 rounded-xl border border-white/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-primary-500" />
                <div className="text-left">
                  <p className="font-sans font-medium text-dark-aqua truncate max-w-xs">
                    {uploadState.file.name}
                  </p>
                  <p className="text-xs text-primary-600/60">
                    {(uploadState.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {uploadState.status === 'success' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetUpload();
                  }}
                  className="p-1 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-primary-600" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Reset Button */}
        {(uploadState.status === 'success' || uploadState.status === 'error') && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              resetUpload();
            }}
            className="mt-4 px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white font-sans font-medium rounded-xl transition-colors"
          >
            {uploadState.status === 'success' ? 'Subir otro CV' : 'Intentar de nuevo'}
          </button>
        )}
      </div>
    </div>
  );
}

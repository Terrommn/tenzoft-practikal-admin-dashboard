'use client';

import DashboardLayout from '../../components/DashboardLayout';
import CVUpload from '../../components/upload/CVUpload';
import { useState } from 'react';

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ file: File; url: string; timestamp: Date }>>([]);

  const handleUploadSuccess = (file: File, url: string) => {
    setUploadedFiles(prev => [...prev, {
      file,
      url,
      timestamp: new Date()
    }]);
  };

  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
    // Aquí puedes mostrar un toast o notificación de error
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-white mb-4 drop-shadow-lg">
              Subir CV
            </h1>
            <p className="text-lg text-white/90 font-sans leading-relaxed">
              Sube el CV de un candidato y nuestro sistema lo procesará automáticamente
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-12">
            <CVUpload
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
            />
          </div>

          {/* Recent Uploads */}
          {uploadedFiles.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-display font-semibold text-white mb-6">
                CVs Subidos Recientemente
              </h2>

              <div className="space-y-4">
                              {uploadedFiles.map((upload, index) => (
                <div
                  key={`${upload.file.name}-${upload.timestamp.getTime()}`}
                    className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-sans font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-sans font-medium text-white">
                          {upload.file.name}
                        </h3>
                        <p className="text-sm text-white/70">
                          {(upload.file.size / 1024 / 1024).toFixed(2)} MB •
                          Subido el {upload.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-sans font-medium">
                        Procesado
                      </span>
                      <button
                        type="button"
                        className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-sans font-medium rounded-lg transition-colors"
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-12 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm rounded-2xl p-6 border border-primary-400/30">
            <h3 className="text-xl font-display font-semibold text-white mb-4">
              ¿Cómo funciona?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-sans font-semibold text-white">Sube el CV</h4>
                <p className="text-sm text-white/80">
                  Arrastra y suelta tu archivo PDF o haz clic para seleccionarlo
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-sans font-semibold text-white">Procesamiento Automático</h4>
                <p className="text-sm text-white/80">
                  N8N extrae la información y crea versiones formateadas del CV
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-sans font-semibold text-white">Guardado en Base de Datos</h4>
                <p className="text-sm text-white/80">
                  Toda la información se guarda y categoriza automáticamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

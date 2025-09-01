'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import CandidatesTable from '../../components/candidates/CandidatesTable';
import { Plus, Download, Filter } from 'lucide-react';

interface Candidate {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  age?: number;
  cv_uid: string;
  created_at: string;
  topSkills?: string[];
  experience_years?: number;
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const handleViewCandidate = (candidate: Candidate) => {
    console.log('View candidate:', candidate);
    // TODO: Navigate to candidate detail page
  };

  const handleEditCandidate = (candidate: Candidate) => {
    console.log('Edit candidate:', candidate);
    // TODO: Open edit modal or navigate to edit page
  };

  const handleDownloadCV = (candidate: Candidate) => {
    console.log('Download CV for:', candidate);
    // TODO: Implement CV download
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-display font-bold text-white mb-2 drop-shadow-lg">
                  Gestión de Candidatos
                </h1>
                <p className="text-lg text-white/90 font-sans leading-relaxed">
                  Administra todos los candidatos y sus CVs procesados
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-sans font-medium rounded-lg transition-colors border border-white/20">
                  <Download className="w-4 h-4" />
                  <span>Exportar</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-sans font-medium rounded-lg transition-colors">
                  <Plus className="w-5 h-5" />
                  <span>Agregar Candidato</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-sans text-white/60 uppercase tracking-wide">Total Candidatos</p>
                    <p className="text-3xl font-display font-bold text-white">147</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                    <Plus className="w-6 h-6 text-primary-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-green-400 font-sans font-medium">+12% este mes</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-sans text-white/60 uppercase tracking-wide">CVs Procesados</p>
                    <p className="text-3xl font-display font-bold text-white">89</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary-500/20 rounded-xl flex items-center justify-center">
                    <Filter className="w-6 h-6 text-secondary-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-blue-400 font-sans font-medium">Procesamiento activo</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-sans text-white/60 uppercase tracking-wide">Habilidades Extraídas</p>
                    <p className="text-3xl font-display font-bold text-white">1,247</p>
                  </div>
                  <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center">
                    <Download className="w-6 h-6 text-accent-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-orange-400 font-sans font-medium">+23% esta semana</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-sans text-white/60 uppercase tracking-wide">Empresas</p>
                    <p className="text-3xl font-display font-bold text-white">34</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Plus className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-green-400 font-sans font-medium">+3 nuevas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-semibold text-white">
                  Filtros Avanzados
                </h3>
                <button className="text-sm text-primary-400 hover:text-primary-300 font-sans font-medium transition-colors">
                  Limpiar filtros
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-sans focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent">
                  <option value="">Todas las experiencias</option>
                  <option value="junior">Junior (0-2 años)</option>
                  <option value="mid">Mid-level (3-5 años)</option>
                  <option value="senior">Senior (6+ años)</option>
                </select>

                <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-sans focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent">
                  <option value="">Todas las habilidades</option>
                  <option value="react">React</option>
                  <option value="python">Python</option>
                  <option value="typescript">TypeScript</option>
                  <option value="node">Node.js</option>
                </select>

                <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-sans focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent">
                  <option value="">Todos los idiomas</option>
                  <option value="spanish">Español</option>
                  <option value="english">Inglés</option>
                  <option value="french">Francés</option>
                </select>

                <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-sans focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent">
                  <option value="">Ubicación</option>
                  <option value="madrid">Madrid</option>
                  <option value="barcelona">Barcelona</option>
                  <option value="remote">Remoto</option>
                </select>
              </div>
            </div>
          </div>

          {/* Candidates Table */}
          <CandidatesTable
            candidates={candidates}
            onViewCandidate={handleViewCandidate}
            onEditCandidate={handleEditCandidate}
            onDownloadCV={handleDownloadCV}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

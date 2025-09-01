'use client';

import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Download, MoreVertical, Mail, Phone, Calendar } from 'lucide-react';

interface Candidate {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  age?: number;
  cv_uid: string;
  created_at: string;
  // Skills summary for quick view
  topSkills?: string[];
  experience_years?: number;
}

interface CandidatesTableProps {
  candidates: Candidate[];
  onViewCandidate: (candidate: Candidate) => void;
  onEditCandidate: (candidate: Candidate) => void;
  onDownloadCV: (candidate: Candidate) => void;
}

// Mock data for demonstration
const mockCandidates: Candidate[] = [
  {
    uid: '1',
    name: 'María García',
    email: 'maria.garcia@email.com',
    phone: '+34 612 345 678',
    linkedin_url: 'https://linkedin.com/in/mariagarcia',
    age: 28,
    cv_uid: 'cv_001',
    created_at: '2024-01-15T10:30:00Z',
    topSkills: ['React', 'TypeScript', 'Node.js'],
    experience_years: 5
  },
  {
    uid: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '+34 698 765 432',
    linkedin_url: 'https://linkedin.com/in/carlosrodriguez',
    age: 32,
    cv_uid: 'cv_002',
    created_at: '2024-01-14T14:20:00Z',
    topSkills: ['Python', 'Django', 'PostgreSQL'],
    experience_years: 7
  },
  {
    uid: '3',
    name: 'Ana López',
    email: 'ana.lopez@email.com',
    phone: '+34 677 890 123',
    linkedin_url: 'https://linkedin.com/in/analopez',
    age: 25,
    cv_uid: 'cv_003',
    created_at: '2024-01-13T09:15:00Z',
    topSkills: ['Vue.js', 'JavaScript', 'MongoDB'],
    experience_years: 3
  }
];

export default function CandidatesTable({
  candidates = mockCandidates,
  onViewCandidate,
  onEditCandidate,
  onDownloadCV
}: CandidatesTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.topSkills?.some(skill =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev =>
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-display font-semibold text-white">
            Candidatos ({filteredCandidates.length})
          </h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <input
                type="text"
                placeholder="Buscar candidatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-sans font-medium rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCandidates.length > 0 && (
          <div className="flex items-center space-x-3 p-3 bg-primary-500/20 rounded-lg border border-primary-400/30">
            <span className="text-white font-sans font-medium">
              {selectedCandidates.length} candidatos seleccionados
            </span>
            <button className="px-3 py-1 bg-primary-500 hover:bg-primary-600 text-white text-sm font-sans font-medium rounded-md transition-colors">
              Exportar
            </button>
            <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-sans font-medium rounded-md transition-colors">
              Eliminar
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-500 bg-white/10 border-white/20 rounded focus:ring-primary-400"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCandidates(filteredCandidates.map(c => c.uid));
                    } else {
                      setSelectedCandidates([]);
                    }
                  }}
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-white/80 uppercase tracking-wider">
                Candidato
              </th>
              <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-white/80 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-white/80 uppercase tracking-wider">
                Habilidades
              </th>
              <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-white/80 uppercase tracking-wider">
                Experiencia
              </th>
              <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-white/80 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-4 text-left text-xs font-sans font-semibold text-white/80 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.uid} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.uid)}
                    onChange={() => toggleCandidateSelection(candidate.uid)}
                    className="w-4 h-4 text-primary-500 bg-white/10 border-white/20 rounded focus:ring-primary-400"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-sans font-bold text-sm">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-sans font-medium text-white">
                        {candidate.name}
                      </div>
                      {candidate.age && (
                        <div className="text-sm text-white/60">
                          {candidate.age} años
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-white/80">
                      <Mail className="w-4 h-4 mr-2" />
                      {candidate.email}
                    </div>
                    {candidate.phone && (
                      <div className="flex items-center text-sm text-white/80">
                        <Phone className="w-4 h-4 mr-2" />
                        {candidate.phone}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {candidate.topSkills?.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs font-sans font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.topSkills && candidate.topSkills.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 text-white/60 text-xs font-sans font-medium rounded-full">
                        +{candidate.topSkills.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-white/80 font-sans">
                    {candidate.experience_years} años
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-white/80">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(candidate.created_at)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewCandidate(candidate)}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditCandidate(candidate)}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDownloadCV(candidate)}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      title="Descargar CV"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredCandidates.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-lg font-display font-semibold text-white mb-2">
            No se encontraron candidatos
          </h3>
          <p className="text-white/60 font-sans">
            {searchTerm
              ? `No hay resultados para "${searchTerm}"`
              : 'Aún no has subido ningún candidato'
            }
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10 bg-white/5">
        <div className="flex items-center justify-between text-sm text-white/60">
          <div>
            Mostrando {filteredCandidates.length} de {candidates.length} candidatos
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 hover:bg-white/10 rounded transition-colors">
              Anterior
            </button>
            <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded">
              1
            </span>
            <button className="px-3 py-1 hover:bg-white/10 rounded transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

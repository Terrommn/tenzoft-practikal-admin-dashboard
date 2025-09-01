'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
// import { useUIStore } from '../stores'; // Uncomment when using Zustand store

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Overview', href: '/overview' },
  { name: 'Upload CV', href: '/upload' },
  { name: 'Candidates', href: '/candidates' },
  { name: 'Analytics', href: '/analytics' },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  // Example of using Zustand store - can destructure theme, sidebar, etc. when needed
  // const { isSidebarOpen, toggleSidebar, theme } = useUIStore();

  return (
    <div className="flex h-screen bg-dark-aqua">
      {/* Sidebar - Glassmorphic Design */}
      <div className="w-64 relative">
        {/* Glassmorphic Background */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl"></div>

        {/* Sidebar Content */}
        <div className=" z-10 h-full text-white">
          {/* Logo Section */}
          <div className="p-6 flex items-center justify-between">
            <div className="relative w-32 h-32">
              <Image
                src="/assets/imagetype.png"
                alt="Logo"
                fill
                className="object-contain filter brightness-0 invert"
                priority
              />
            </div>
          
          </div>

          {/* Navigation */}
          <nav className="mt-8">
            <div className="px-6 space-y-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group block px-4 py-3 rounded-xl font-sans transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? 'bg-white/20 text-white font-semibold shadow-lg backdrop-blur-sm border border-white/30'
                        : 'text-white/90 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm hover:border-white/20'
                    }`}
                  >
                    {/* Subtle glow effect for active item */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-300/30 to-primary-600/30 rounded-xl"></div>
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-aqua/50 to-aqua/30"></div>

        <main className="flex-1 overflow-auto relative z-10">
          <div className="min-h-full bg-white/5 backdrop-blur-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

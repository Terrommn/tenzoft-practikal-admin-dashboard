import DashboardLayout from '../../components/DashboardLayout';

export default function OverviewPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-white/20 max-w-md w-full">
          <h1 className="text-5xl font-display font-bold text-white mb-6 drop-shadow-lg">
            Overview
          </h1>
          <p className="text-lg text-white/90 font-sans leading-relaxed">
            Welcome to your admin dashboard overview
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-primary-300 to-primary-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

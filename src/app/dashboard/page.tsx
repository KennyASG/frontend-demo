// app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-orange-900/20">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-xl border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold">S</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                SoundMax
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            ¡Bienvenido, {user.name}! 🎉
          </h2>
          <p className="text-gray-400">
            Estás autenticado correctamente en SoundMax
          </p>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">
                  {user.name.charAt(0)}{user.lastname.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Perfil</h3>
                <p className="text-gray-400 text-sm">{user.role}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="text-gray-500">Nombre:</span> {user.name} {user.lastname}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-500">Email:</span> {user.email}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-500">Teléfono:</span> {user.phone}
              </p>
            </div>
          </div>

          {/* Stats Card 1 */}
          <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Conciertos</h3>
              <span className="text-3xl">🎸</span>
            </div>
            <p className="text-4xl font-bold text-white mb-2">0</p>
            <p className="text-gray-400 text-sm">Tickets comprados</p>
          </div>

          {/* Stats Card 2 */}
          <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Favoritos</h3>
              <span className="text-3xl">❤️</span>
            </div>
            <p className="text-4xl font-bold text-white mb-2">0</p>
            <p className="text-gray-400 text-sm">Artistas guardados</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105 transition-all text-white py-3 px-6 rounded-xl font-semibold">
              Ver Conciertos
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 transition-colors text-white py-3 px-6 rounded-xl font-semibold">
              Mi Perfil
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 transition-colors text-white py-3 px-6 rounded-xl font-semibold">
              Mis Tickets
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
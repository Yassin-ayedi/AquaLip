
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Settings, Info, Mail, LogOut, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const authenticatedNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  const navItems = user ? authenticatedNavItems : publicNavItems;
  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Waves */}
          <div className="flex items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AquaLip</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            {user ? (
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-blue-100 bg-white">
        <div className="grid grid-cols-3 gap-1 p-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

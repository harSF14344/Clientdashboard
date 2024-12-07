import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Search, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">Harris Corp</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/search"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200
                ${location.pathname === '/search' 
                  ? 'bg-gray-100 dark:bg-gray-700' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200
                    ${location.pathname === '/admin' 
                      ? 'bg-gray-100 dark:bg-gray-700' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  Admin
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
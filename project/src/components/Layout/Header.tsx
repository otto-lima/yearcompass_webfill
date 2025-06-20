import React from 'react';
import { Compass, Save, User } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface HeaderProps {
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNavigation = false }) => {
  const { state, dispatch, saveProgress } = useApp();

  const handleSaveProgress = () => {
    saveProgress();
    // Show a brief success message
    const originalText = document.querySelector('[data-save-text]')?.textContent;
    const saveButton = document.querySelector('[data-save-text]');
    if (saveButton) {
      saveButton.textContent = 'Salvo!';
      setTimeout(() => {
        saveButton.textContent = originalText || 'Salvar Progresso';
      }, 2000);
    }
  };

  const navigateTo = (page: string) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigateTo('welcome')}
          >
            <Compass className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-serif font-semibold text-gray-900">
              YEAR COMPASS
            </span>
          </div>

          {/* Navigation */}
          {showNavigation && (
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigateTo('past-year')}
                className={`text-sm font-medium transition-colors ${
                  state.currentPage === 'past-year'
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                O Ano Passado
              </button>
              <button
                onClick={() => navigateTo('future-year')}
                className={`text-sm font-medium transition-colors ${
                  state.currentPage === 'future-year'
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                O Ano à Frente
              </button>
            </nav>
          )}

          {/* User Actions */}
          {state.user && (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSaveProgress}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                <span data-save-text>Salvar Progresso</span>
              </button>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{state.user.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
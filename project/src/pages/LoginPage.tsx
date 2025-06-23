import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Button from '../components/UI/Button';

declare global {
  interface Window {
    google: any;
  }
}

const LoginPage: React.FC = () => {
  const { dispatch } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com',
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleGoogleResponse = (response: any) => {
    setIsLoading(true);
    
    try {
      // Decode the JWT token to get user information
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const user = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };

      // Save user data to localStorage for persistence
      localStorage.setItem('yearcompass-user', JSON.stringify(user));
      
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_CURRENT_PAGE', payload: 'welcome' });
    } catch (error) {
      console.error('Error processing Google login:', error);
      alert('Erro ao fazer login com Google. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      alert('Google Identity Services não carregado. Recarregue a página e tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-enso bg-no-repeat bg-center transform rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-enso bg-no-repeat bg-center transform -rotate-45"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Compass className="h-12 w-12 text-primary-600" />
            <h1 className="text-3xl font-serif font-bold text-gray-900">
              YEAR COMPASS
            </h1>
          </div>
          <p className="text-gray-600">
            Planeje seu ano com reflexão e propósito
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Acesse sua conta
            </h2>
            <p className="text-gray-600 text-sm">
              Entre com sua conta Google para salvar seu progresso
            </p>
          </div>

          {/* Google Login Button */}
          <div className="space-y-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center space-x-3 border-2 hover:bg-gray-50"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="h-5 w-5"
              />
              <span>{isLoading ? 'Entrando...' : 'Continuar com Google'}</span>
            </Button>
          </div>

          {/* Info */}
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p>
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Política de Privacidade
              </a>
            </p>
            <p className="text-xs">
              Seus dados são salvos localmente e sincronizados com sua conta Google
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Por que usar o Google?</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Acesso seguro e rápido</li>
              <li>• Seus dados ficam salvos na sua conta</li>
              <li>• Acesse de qualquer dispositivo</li>
              <li>• Não precisamos de senhas adicionais</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
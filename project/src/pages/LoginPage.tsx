import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Button from '../components/UI/Button';

// Declaração para a variável global do Google
declare global {
  interface Window {
    google: any;
  }
}

const LoginPage: React.FC = () => {
  const { dispatch } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Carrega o script do Google Identity Services dinamicamente
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Quando o script carregar, inicializa o cliente do Google
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Lê o ID do .env
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      }
    };

    // Limpeza ao desmontar o componente
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // --- FUNÇÃO ALTERADA ---
  // Agora se comunica com a nossa API para validar o token
  const handleGoogleResponse = async (response: any) => {
    setIsLoading(true);

    try {
      // 1. Envia o token para a nossa API de backend para verificação
      const apiResponse = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential }),
      });

      if (!apiResponse.ok) {
        throw new Error(`Erro na API: ${apiResponse.statusText}`);
      }

      // 2. Recebe os dados do usuário já verificados pelo backend
      const data = await apiResponse.json();
      const user = data.user;

      // 3. Salva os dados do usuário e atualiza o estado da aplicação
      localStorage.setItem('yearcompass-user', JSON.stringify(user));
      
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_CURRENT_PAGE', payload: 'welcome' });

    } catch (error) {
      console.error('Erro ao processar login com Google:', error);
      alert('Erro ao fazer login com Google. Verifique o console e tente novamente.');
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
      {/* ... seu JSX continua exatamente o mesmo aqui ... */}
      <div className="relative max-w-md w-full">
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

        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Acesse sua conta
            </h2>
            <p className="text-gray-600 text-sm">
              Entre com sua conta Google para salvar seu progresso
            </p>
          </div>

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
          
           {/* ... resto do seu JSX ... */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
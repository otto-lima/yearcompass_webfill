import React, { useState } from 'react';
import { Compass, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';

const LoginPage: React.FC = () => {
  const { dispatch } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (!isLogin && formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Nome é obrigatório';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'Você deve aceitar os termos';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Simulate authentication
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: isLogin ? formData.email.split('@')[0] : formData.name,
      email: formData.email,
    };

    dispatch({ type: 'SET_USER', payload: user });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'welcome' });
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Usuário ${provider}`,
      email: `user@${provider.toLowerCase()}.com`,
    };

    dispatch({ type: 'SET_USER', payload: user });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'welcome' });
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
          {/* Tab Switcher */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                !isLogin
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {isLogin ? 'Acesse sua conta' : 'Crie sua conta'}
              </h2>
            </div>

            {!isLogin && (
              <Input
                label="Seu Nome"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.name}
                onChange={(value) => setFormData({ ...formData, name: value })}
                required
                error={errors.name}
              />
            )}

            <Input
              label="Email"
              type="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              required
              error={errors.email}
            />

            <div className="relative">
              <Input
                label={isLogin ? 'Senha' : 'Crie uma Senha'}
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={(value) => setFormData({ ...formData, password: value })}
                required
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                  Eu aceito os{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700">
                    Termos de Serviço
                  </a>{' '}
                  e a{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700">
                    Política de Privacidade
                  </a>
                </label>
              </div>
            )}

            {errors.acceptTerms && (
              <p className="text-sm text-red-600">{errors.acceptTerms}</p>
            )}

            <Button type="submit" size="lg" className="w-full">
              {isLogin ? 'Entrar' : 'Cadastrar Gratuitamente'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => handleSocialLogin('Google')}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Continuar com Google
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => handleSocialLogin('Facebook')}
            >
              <div className="h-5 w-5 mr-2 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">
                f
              </div>
              Continuar com Facebook
            </Button>
          </div>

          {/* Toggle Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-600"
            >
              {isLogin ? (
                <>Ainda não tem uma conta? <span className="text-primary-600 hover:text-primary-700 font-medium">Cadastre-se</span></>
              ) : (
                <>Já tem uma conta? <span className="text-primary-600 hover:text-primary-700 font-medium">Faça o login</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
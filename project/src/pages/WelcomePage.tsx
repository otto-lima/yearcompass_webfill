import React from 'react';
import { ArrowRight, Compass, Heart, Users, Clock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';

const WelcomePage: React.FC = () => {
  const { dispatch } = useApp();

  const startPlanning = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'past-year' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header showNavigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10">
            <div className="w-full h-full bg-enso bg-no-repeat bg-center bg-contain animate-float"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-gray-900">
                YEAR COMPASS
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-primary-600">
                2024 | 2025
              </h2>
              <h3 className="text-xl sm:text-2xl font-medium text-gray-700 max-w-2xl mx-auto leading-relaxed">
                "EU ACREDITO QUE TUDO É POSSÍVEL ESTE ANO."
              </h3>
            </div>

            <div className="pt-8">
              <Button
                size="xl"
                onClick={startPlanning}
                icon={ArrowRight}
                className="text-lg px-12 py-6 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Começar a Planejar Meu Ano
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold text-gray-900">
                  BOAS-VINDAS
                </h2>
                <h3 className="text-xl font-semibold text-primary-600">
                  O QUE É ISTO?
                </h3>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  É um YearCompass — o seu próprio YearCompass, para ser exato.
                </p>
                <p>
                  Ele é um livreto que ajuda você a refletir sobre o ano que passou 
                  e planejar o próximo.
                </p>
                <p>
                  Com um conjunto cuidadosamente selecionado de perguntas e exercícios, 
                  o YearCompass ajuda você a revelar seus padrões e projetar um ótimo 
                  ano para si.
                </p>
                <p>
                  Este livreto tem duas metades. A primeira metade ajuda você a refletir 
                  e se despedir do ano que está acabando. A segunda metade é sobre 
                  planejamento e preparação para o ano que está começando.
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Reflexão Profunda</h4>
                    <p className="text-sm text-gray-600">
                      Exercícios cuidadosamente elaborados para autoconhecimento
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Compass className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Planejamento</h4>
                    <p className="text-sm text-gray-600">
                      Defina metas claras e crie um caminho para o sucesso
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-primary-600 mb-4">
                  DO QUE EU PRECISO PARA PREENCHER O LIVRETO?
                </h3>
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-accent-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">
                    Algumas horas de foco ininterrupto, e uma mente aberta e honesta.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-primary-600 mb-4">
                  POSSO FAZER ISTO EM GRUPO?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-accent-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">
                      Claro que sim! Chame seus amigos, compartilhe o link do site 
                      e encontrem-se (virtualmente ou pessoalmente).
                    </p>
                  </div>
                  <div className="bg-accent-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Importante:</strong> Seja respeitoso com os limites 
                      dos seus companheiros. Algumas pessoas preferem manter certas 
                      reflexões privadas.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center pt-6">
                <Button
                  size="lg"
                  onClick={startPlanning}
                  icon={ArrowRight}
                  className="w-full sm:w-auto"
                >
                  Começar Minha Jornada
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WelcomePage;
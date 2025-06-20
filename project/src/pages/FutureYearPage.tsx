import React, { useState, useEffect } from 'react';
import { Check, Calendar, Heart, Target } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Header from '../components/Layout/Header';
import SectionNav from '../components/UI/SectionNav';
import TextArea from '../components/UI/TextArea';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import SummarySheet from '../components/SummarySheet';

const FutureYearPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeSection, setActiveSection] = useState('prepare');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const sections = [
    { id: 'prepare', title: 'Prepare-se' },
    { id: 'dream-big', title: 'Ouse sonhar alto' },
    { id: 'future-aspects', title: 'Meu próximo ano' },
    { id: 'magic-trios', title: 'Trios mágicos' },
    { id: 'future-sentences', title: 'Seis frases sobre o próximo ano' },
    { id: 'word-wish', title: 'Minha palavra e desejo secreto' },
    { id: 'completion', title: 'Finalização' },
  ];

  const lifeAspects = [
    { key: 'personalLife', label: 'VIDA PESSOAL, FAMÍLIA' },
    { key: 'career', label: 'CARREIRA, ESTUDOS' },
    { key: 'friends', label: 'AMIGOS, COMUNIDADE' },
    { key: 'rest', label: 'DESCANSO, HOBBIES, CRIATIVIDADE' },
    { key: 'physicalHealth', label: 'SAÚDE FÍSICA, ATIVIDADE FÍSICA' },
    { key: 'mentalHealth', label: 'SAÚDE MENTAL, AUTOCONHECIMENTO' },
    { key: 'habits', label: 'HÁBITOS QUE DEFINEM VOCÊ' },
    { key: 'betterTomorrow', label: 'UM AMANHÃ MELHOR' },
  ];

  const magicTrios = [
    { key: 'selfLove', label: 'Três coisas que amarei sobre mim' },
    { key: 'readyToDiscard', label: 'Três coisas das quais estou pronto para me livrar' },
    { key: 'wantToAchieve', label: 'Três coisas que eu mais quero alcançar' },
    { key: 'supportPillars', label: 'Três pessoas que serão meus pilares' },
    { key: 'dareToExplore', label: 'Três coisas que vou me atrever a explorar' },
    { key: 'powerToRefuse', label: 'Três coisas que terei o poder de recusar' },
    { key: 'betterEnvironments', label: 'Três coisas para tornar meus ambientes mais agradáveis' },
    { key: 'morningRoutine', label: 'Três coisas que farei todas as manhãs' },
    { key: 'selfCare', label: 'Três coisas para me mimar regularmente' },
    { key: 'placesToVisit', label: 'Três locais que vou visitar' },
    { key: 'connectionWays', label: 'Três maneiras de me conectar com quem amo' },
    { key: 'successRewards', label: 'Três presentes para recompensar meus sucessos' },
  ];

  const sixSentences = [
    'Este ano eu me comprometo a...',
    'Este ano eu vou parar de...',
    'Este ano eu vou começar a...',
    'Este ano eu vou aprender...',
    'Este ano eu vou criar...',
    'Este ano eu vou me tornar...',
  ];

  const preparationChecklist = [
    'Encontre um lugar confortável e silencioso',
    'Desligue todas as notificações',
    'Tenha uma bebida que você goste por perto',
    'Respire fundo três vezes',
    'Defina uma intenção positiva para este exercício',
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updateFutureYear = (data: any) => {
    dispatch({ type: 'UPDATE_FUTURE_YEAR', payload: data });
  };

  const completeYearCompass = () => {
    const today = new Date();
    const signature = state.user?.name || '';
    
    updateFutureYear({
      date: today.toLocaleDateString('pt-BR'),
      signature: signature,
    });
    
    setIsCompleted(true);
    setShowSummary(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isCompleted && !showSummary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center space-y-8 p-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-serif font-bold text-gray-900">
              Parabéns! 🎉
            </h1>
            <h2 className="text-2xl font-semibold text-primary-600">
              Você acabou de planejar seu ano!
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Agora você tem um mapa completo para navegar pelo próximo ano com propósito e clareza. 
              Revisite suas respostas regularmente e ajuste conforme necessário.
            </p>
            <p className="text-sm text-gray-500">
              Compartilhe sua jornada usando #yearcompass
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600 border-b pb-4">
              <span>Data:</span>
              <span>{state.futureYear.date}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Assinatura:</span>
              <span className="font-medium">{state.futureYear.signature}</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              onClick={() => setShowSummary(true)}
              className="w-full"
            >
              Ver Meu Resumo Completo
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: 'welcome' })}
              className="w-full"
            >
              Voltar ao Início
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation />
      
      <div className="pt-16 flex">
        {/* Sidebar Navigation */}
        <div className="w-80 flex-shrink-0">
          <SectionNav
            title="O Ano à Frente"
            sections={sections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto px-6 py-8 space-y-16">
          {/* Prepare Section */}
          <section id="prepare" className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              PREPARE-SE
            </h2>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-6">
                Antes de começar a sonhar com o futuro, prepare-se mentalmente para esta jornada:
              </p>
              
              <ul className="space-y-3">
                {preparationChecklist.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-medium text-primary-600">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Dream Big Section */}
          <section id="dream-big" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                OUSE SONHAR ALTO
              </h2>
              <p className="text-gray-600">
                Sem limites, sem julgamentos. Como seria seu ano ideal? O que você faria se 
                soubesse que não pode falhar? Permita-se sonhar grande.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-5 w-5 text-primary-600" />
                <span className="font-medium text-gray-900">Seu ano dos sonhos</span>
              </div>
              <TextArea
                placeholder="Descreva seu ano ideal em detalhes. Como você se sente? O que você conquistou? Como sua vida mudou?"
                value={state.futureYear.dreamBig}
                onChange={(value) => updateFutureYear({ dreamBig: value })}
                rows={8}
              />
            </div>
          </section>

          {/* Future Life Aspects Section */}
          <section id="future-aspects" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                MEU PRÓXIMO ANO SERÁ SOBRE
              </h2>
              <p className="text-gray-600">
                Defina seus objetivos e intenções para cada área da sua vida. 
                Seja específico sobre o que você quer alcançar.
              </p>
            </div>

            <div className="grid gap-6">
              {lifeAspects.map((aspect) => (
                <div key={aspect.key} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2 mb-3">
                    <Target className="h-5 w-5 text-primary-600" />
                    <h3 className="font-semibold text-gray-900">
                      {aspect.label}
                    </h3>
                  </div>
                  <TextArea
                    placeholder={`Suas metas e intenções para ${aspect.label.toLowerCase()}...`}
                    value={state.futureYear.lifeAspects[aspect.key as keyof typeof state.futureYear.lifeAspects]}
                    onChange={(value) => updateFutureYear({
                      lifeAspects: {
                        ...state.futureYear.lifeAspects,
                        [aspect.key]: value
                      }
                    })}
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Magic Trios Section */}
          <section id="magic-trios" className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              TRIOS MÁGICOS PARA O ANO QUE COMEÇA
            </h2>

            <div className="grid gap-6">
              {magicTrios.map((trio) => (
                <div key={trio.key} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {trio.label}
                  </h3>
                  <div className="grid gap-3">
                    {[0, 1, 2].map((index) => (
                      <Input
                        key={index}
                        placeholder={`${index + 1}. `}
                        value={state.futureYear.magicTrios[trio.key as keyof typeof state.futureYear.magicTrios][index] || ''}
                        onChange={(value) => {
                          const currentTrio = [...state.futureYear.magicTrios[trio.key as keyof typeof state.futureYear.magicTrios]];
                          currentTrio[index] = value;
                          updateFutureYear({
                            magicTrios: {
                              ...state.futureYear.magicTrios,
                              [trio.key]: currentTrio
                            }
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Future Six Sentences Section */}
          <section id="future-sentences" className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              SEIS FRASES SOBRE MEU PRÓXIMO ANO
            </h2>

            <div className="space-y-4">
              {sixSentences.map((sentence, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {index + 1}. {sentence}
                  </label>
                  <Input
                    placeholder="Complete a frase..."
                    value={state.futureYear.sixSentences[`sentence${index + 1}` as keyof typeof state.futureYear.sixSentences]}
                    onChange={(value) => updateFutureYear({
                      sixSentences: {
                        ...state.futureYear.sixSentences,
                        [`sentence${index + 1}`]: value
                      }
                    })}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Word and Wish Section */}
          <section id="word-wish" className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              MINHA PALAVRA E DESEJO
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-primary-700 mb-4">
                  MINHA PALAVRA PARA O ANO QUE COMEÇA
                </h3>
                <p className="text-gray-600 mb-4">
                  Escolha uma palavra que será seu guia, sua âncora, sua inspiração. 
                  Uma palavra que representa como você quer se sentir e ser este ano.
                </p>
                <div className="text-center">
                  <Input
                    placeholder="Sua palavra do ano..."
                    value={state.futureYear.yearWord}
                    onChange={(value) => updateFutureYear({ yearWord: value })}
                    className="text-center text-2xl font-serif font-bold"
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-purple-700 mb-4">
                  DESEJO SECRETO
                </h3>
                <p className="text-gray-600 mb-4">
                  Solte sua mente. Qual seu desejo secreto para o próximo ano? 
                  Algo que você mal ousa admitir, mas que faria seu coração cantar.
                </p>
                <TextArea
                  placeholder="Seu desejo mais profundo..."
                  value={state.futureYear.secretWish}
                  onChange={(value) => updateFutureYear({ secretWish: value })}
                  rows={6}
                />
              </div>
            </div>
          </section>

          {/* Completion Section */}
          <section id="completion" className="text-center py-12 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-serif font-bold text-gray-900">
                PARABÉNS, VOCÊ ACABOU DE PLANEJAR SEU ANO!
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Compartilhe sua jornada e inspire outros usando a hashtag <strong>#yearcompass</strong>
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto space-y-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>Data de conclusão</span>
              </div>
              
              <Input
                label="Data:"
                value={new Date().toLocaleDateString('pt-BR')}
                onChange={() => {}} // Read-only
                className="text-center"
              />
              
              <Input
                label="Assinatura:"
                placeholder="Digite seu nome"
                value={state.futureYear.signature}
                onChange={(value) => updateFutureYear({ signature: value })}
                className="text-center"
              />

              <Button
                size="xl"
                onClick={completeYearCompass}
                disabled={!state.futureYear.signature}
                className="w-full"
              >
                Finalizar e Ver Meu Resumo
              </Button>
            </div>
          </section>
        </div>
      </div>

      {/* Summary Sheet */}
      <SummarySheet 
        isOpen={showSummary} 
        onClose={() => setShowSummary(false)} 
      />
    </div>
  );
};

export default FutureYearPage;
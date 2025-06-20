import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Header from '../components/Layout/Header';
import SectionNav from '../components/UI/SectionNav';
import TextArea from '../components/UI/TextArea';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';

const PastYearPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeSection, setActiveSection] = useState('year-review');
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());

  const sections = [
    { id: 'year-review', title: 'Revisando seu ano' },
    { id: 'life-aspects', title: 'Meu ano em aspectos' },
    { id: 'six-sentences', title: 'Seis frases sobre o ano' },
    { id: 'six-questions', title: 'Seis perguntas sobre o ano' },
    { id: 'best-moments', title: 'Os melhores momentos' },
    { id: 'achievements-challenges', title: 'Realizações e desafios' },
    { id: 'year-book', title: 'O livro do meu ano' },
    { id: 'forgiveness', title: 'Perdão e Libertação' },
    { id: 'goodbye', title: 'Adeus ao ano que acaba' },
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

  const sixSentences = [
    { key: 'wisestDecision', text: 'A decisão mais sábia que eu tomei...' },
    { key: 'greatestLesson', text: 'A maior lição que aprendi...' },
    { key: 'biggestRisk', text: 'O maior risco que eu enfrentei...' },
    { key: 'biggestSurprise', text: 'A maior surpresa do ano...' },
    { key: 'importantThingForOthers', text: 'A coisa mais importante que eu fiz pelos outros...' },
    { key: 'greatestCompletion', text: 'A maior coisa que concluí...' },
  ];

  const sixQuestions = [
    { key: 'mostProud', text: 'O que mais te orgulha?' },
    { key: 'threeInfluencers', text: 'Quais são as três pessoas que mais influenciaram você?' },
    { key: 'threeInfluenced', text: 'Quais as três pessoas que você mais influenciou?' },
    { key: 'unachieved', text: 'O que você não foi capaz de alcançar?' },
    { key: 'bestDiscovery', text: 'Qual foi a melhor coisa que você descobriu sobre si mesmo?' },
    { key: 'mostGrateful', text: 'Pelo quê você mais se sente grato?' },
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updatePastYear = (data: any) => {
    dispatch({ type: 'UPDATE_PAST_YEAR', payload: data });
  };

  const toggleQuestion = (questionKey: string) => {
    const newOpenQuestions = new Set(openQuestions);
    if (newOpenQuestions.has(questionKey)) {
      newOpenQuestions.delete(questionKey);
    } else {
      newOpenQuestions.add(questionKey);
    }
    setOpenQuestions(newOpenQuestions);
  };

  const goToFutureYear = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 'future-year' });
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showNavigation />
      
      <div className="pt-16 flex">
        {/* Sidebar Navigation */}
        <div className="w-80 flex-shrink-0">
          <SectionNav
            title="O Ano Passado"
            sections={sections}
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto px-6 py-8 space-y-16">
          {/* Year Review Section */}
          <section id="year-review" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                REVISANDO SEU ANO
              </h2>
              <p className="text-gray-600">
                Reveja seu calendário do ano passado semana a semana. Se encontrar um evento importante, 
                reunião de família, encontro com amigos ou projeto significativo, anote aqui.
              </p>
            </div>
            
            <TextArea
              placeholder="Anote aqui os eventos importantes do seu ano..."
              value={state.pastYear.yearReview}
              onChange={(value) => updatePastYear({ yearReview: value })}
              rows={8}
            />
          </section>

          {/* Life Aspects Section */}
          <section id="life-aspects" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                MEU ANO PASSADO FOI SOBRE
              </h2>
              <p className="text-gray-600">
                Dê uma olhada nas áreas abaixo e pergunte-se quais foram os eventos significativos em cada uma delas.
              </p>
            </div>

            <div className="grid gap-6">
              {lifeAspects.map((aspect) => (
                <div key={aspect.key} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {aspect.label}
                    {aspect.key === 'betterTomorrow' && (
                      <span className="block text-sm font-normal text-gray-600 mt-1">
                        O que você fez nesse ano para deixar o mundo um pouco melhor do que o encontrou?
                      </span>
                    )}
                  </h3>
                  <TextArea
                    placeholder={`Reflita sobre ${aspect.label.toLowerCase()}...`}
                    value={state.pastYear.lifeAspects[aspect.key as keyof typeof state.pastYear.lifeAspects]}
                    onChange={(value) => updatePastYear({
                      lifeAspects: {
                        ...state.pastYear.lifeAspects,
                        [aspect.key]: value
                      }
                    })}
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Six Sentences Section */}
          <section id="six-sentences" className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              SEIS FRASES SOBRE O ANO QUE PASSOU
            </h2>

            <div className="space-y-4">
              {sixSentences.map((sentence, index) => (
                <div key={sentence.key} className="bg-white p-6 rounded-lg shadow-sm">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {index + 1}. {sentence.text}
                  </label>
                  <Input
                    placeholder="Complete a frase..."
                    value={state.pastYear.sixSentences[sentence.key as keyof typeof state.pastYear.sixSentences]}
                    onChange={(value) => updatePastYear({
                      sixSentences: {
                        ...state.pastYear.sixSentences,
                        [sentence.key]: value
                      }
                    })}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Six Questions Section */}
          <section id="six-questions" className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              SEIS PERGUNTAS SOBRE O ANO QUE PASSOU
            </h2>

            <div className="space-y-4">
              {sixQuestions.map((question, index) => (
                <div key={question.key} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleQuestion(question.key)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">
                      {index + 1}. {question.text}
                    </span>
                    {openQuestions.has(question.key) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  {openQuestions.has(question.key) && (
                    <div className="px-6 pb-6">
                      <TextArea
                        placeholder="Sua resposta..."
                        value={state.pastYear.sixQuestions[question.key as keyof typeof state.pastYear.sixQuestions]}
                        onChange={(value) => updatePastYear({
                          sixQuestions: {
                            ...state.pastYear.sixQuestions,
                            [question.key]: value
                          }
                        })}
                        rows={4}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Best Moments Section */}
          <section id="best-moments" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                OS MELHORES MOMENTOS
              </h2>
              <p className="text-gray-600">
                Descreva os momentos mais agradáveis, alegres e marcantes do último ano. 
                Como você se sentiu? Quem estava com você? O que você estava fazendo? 
                De quais cheiros, sons e sabores você consegue lembrar?
              </p>
            </div>
            
            <TextArea
              placeholder="Descreva seus melhores momentos do ano..."
              value={state.pastYear.bestMoments}
              onChange={(value) => updatePastYear({ bestMoments: value })}
              rows={8}
            />
          </section>

          {/* Achievements and Challenges Section */}
          <section id="achievements-challenges" className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              REALIZAÇÕES E DESAFIOS
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Achievements */}
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <h3 className="text-xl font-semibold text-green-700">
                  TRÊS DAS MINHAS MAIORES REALIZAÇÕES
                </h3>
                
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <Input
                      key={index}
                      placeholder={`Realização ${index + 1}`}
                      value={state.pastYear.achievements[index] || ''}
                      onChange={(value) => {
                        const newAchievements = [...state.pastYear.achievements];
                        newAchievements[index] = value;
                        updatePastYear({ achievements: newAchievements });
                      }}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <TextArea
                    label="O que você fez para alcançá-los?"
                    placeholder="Descreva suas estratégias e ações..."
                    value={state.pastYear.achievementHelp}
                    onChange={(value) => updatePastYear({ achievementHelp: value })}
                    rows={3}
                  />
                  
                  <TextArea
                    label="Quem ajudou você a alcançá-los? Como?"
                    placeholder="Reconheça quem te apoiou..."
                    value={state.pastYear.achievementSupporters}
                    onChange={(value) => updatePastYear({ achievementSupporters: value })}
                    rows={3}
                  />
                </div>
              </div>

              {/* Challenges */}
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                <h3 className="text-xl font-semibold text-orange-700">
                  TRÊS DOS MEUS MAIORES DESAFIOS
                </h3>
                
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <Input
                      key={index}
                      placeholder={`Desafio ${index + 1}`}
                      value={state.pastYear.challenges[index] || ''}
                      onChange={(value) => {
                        const newChallenges = [...state.pastYear.challenges];
                        newChallenges[index] = value;
                        updatePastYear({ challenges: newChallenges });
                      }}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <TextArea
                    label="Quem ou o quê ajudou você a superar esses desafios?"
                    placeholder="Identifique seus recursos e apoios..."
                    value={state.pastYear.challengeHelp}
                    onChange={(value) => updatePastYear({ challengeHelp: value })}
                    rows={3}
                  />
                  
                  <TextArea
                    label="O que você aprendeu sobre si mesmo enquanto superava esses desafios?"
                    placeholder="Reflita sobre seu crescimento pessoal..."
                    value={state.pastYear.challengeLearnings}
                    onChange={(value) => updatePastYear({ challengeLearnings: value })}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Year Book Section */}
          <section id="year-book" className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              O LIVRO DO MEU ANO PASSADO
            </h2>

            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Se seu ano passado fosse um livro ou filme, qual seria o título?
                </label>
                <Input
                  placeholder="Ex: 'O Ano das Descobertas', 'Capítulo de Crescimento'..."
                  value={state.pastYear.bookTitle}
                  onChange={(value) => updatePastYear({ bookTitle: value })}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  O ANO PASSADO EM TRÊS PALAVRAS
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[0, 1, 2].map((index) => (
                    <Input
                      key={index}
                      placeholder={`Palavra ${index + 1}`}
                      value={state.pastYear.threeWords[index] || ''}
                      onChange={(value) => {
                        const newWords = [...state.pastYear.threeWords];
                        newWords[index] = value;
                        updatePastYear({ threeWords: newWords });
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Forgiveness Section */}
          <section id="forgiveness" className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              PERDÃO E LIBERTAÇÃO
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  PERDÃO
                </h3>
                <p className="text-gray-600 mb-4">
                  É importante perdoar. Perdoar ações, palavras ou perdoar a si mesmo. 
                  O perdão não significa esquecer ou tolerar comportamentos inadequados. 
                  Significa libertar a raiva e o ressentimento para seguir em frente.
                </p>
                <TextArea
                  placeholder="O que ou quem você precisa perdoar? Como você pode fazer isso?"
                  value={state.pastYear.forgiveness}
                  onChange={(value) => updatePastYear({ forgiveness: value })}
                  rows={6}
                />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-purple-700 mb-4">
                  DEIXANDO PARTIR
                </h3>
                <p className="text-gray-600 mb-4">
                  O que você precisa deixar para trás para começar o próximo ano? 
                  Que pensamentos, hábitos, relacionamentos ou situações você precisa liberar?
                </p>
                <TextArea
                  placeholder="O que você está pronto para deixar ir?"
                  value={state.pastYear.lettingGo}
                  onChange={(value) => updatePastYear({ lettingGo: value })}
                  rows={6}
                />
              </div>
            </div>
          </section>

          {/* Goodbye Section */}
          <section id="goodbye" className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                ADEUS AO ANO QUE ACABA
              </h2>
              <p className="text-gray-600">
                Escreva uma despedida final para o ano que está terminando. 
                Agradeça pelas experiências, lições e momentos que ele trouxe.
              </p>
            </div>
            
            <TextArea
              placeholder="Sua despedida ao ano que passou..."
              value={state.pastYear.goodbye}
              onChange={(value) => updatePastYear({ goodbye: value })}
              rows={6}
            />
          </section>

          {/* Completion Section */}
          <section className="text-center py-12 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                PRONTO, O ANO PASSADO ESTÁ COMPLETO
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Você concluiu a primeira parte. Respire fundo. Descanse um pouco. 
                Quando estiver pronto, vamos começar a planejar o futuro.
              </p>
              <Button
                size="xl"
                onClick={goToFutureYear}
                icon={ArrowRight}
                className="text-lg px-12 py-6"
              >
                Iniciar o Planejamento de 2025
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PastYearPage;
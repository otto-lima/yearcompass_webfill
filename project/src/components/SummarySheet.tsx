import React, { useState } from 'react';
import { X, Download, FileText, Calendar, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext'; // O caminho para seu contexto pode variar
import Button from './UI/Button'; // O caminho para seu componente de botão pode variar
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface SummarySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Supondo uma estrutura para o estado do seu AppContext.
// Ajuste conforme a sua implementação real.
interface AppState {
    user?: { name?: string };
    pastYear: {
        yearReview: string;
        lifeAspects: { [key: string]: string };
        sixSentences: { [key: string]: string };
        sixQuestions: { [key: string]: string | string[] };
        bestMoments: string;
        achievements: string[];
        achievementHelp: string;
        achievementSupporters: string;
        challenges: string[];
        challengeHelp: string;
        challengeLearnings: string;
        bookTitle: string;
        threeWords: string;
        forgiveness: string;
        lettingGo: string;
        goodbye: string;
    };
    futureYear: {
        date: string;
        signature: string;
        dreamBig: string;
        lifeAspects: { [key: string]: string };
        magicTrios: { [key: string]: string[] };
        sixSentences: { [key: string]: string };
        yearWord: string;
        secretWish: string;
    };
}


const SummarySheet: React.FC<SummarySheetProps> = ({ isOpen, onClose }) => {
  const { state } = useApp() as { state: AppState }; // Tipagem para o estado
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  if (!isOpen) return null;

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    const element = document.getElementById('summary-content');

    if (!element) {
      alert('Erro: Elemento do conteúdo não encontrado.');
      setIsGeneratingPDF(false);
      return;
    }

    const originalStyle = {
        width: element.style.width,
        maxWidth: element.style.maxWidth,
    };

    element.style.width = '1024px';
    element.style.maxWidth = '1024px';

    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
        });

        element.style.width = originalStyle.width;
        element.style.maxWidth = originalStyle.maxWidth;

        const imgData = canvas.toDataURL('image/png', 0.95);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfPageWidth = pdf.internal.pageSize.getWidth();
        const pdfPageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const availableWidth = pdfPageWidth - (margin * 2);
        const availableHeight = pdfPageHeight - (margin * 2);
        const canvasAspectRatio = canvas.height / canvas.width;
        const totalPdfHeight = availableWidth * canvasAspectRatio;
        const totalPages = Math.ceil(totalPdfHeight / availableHeight);
        let canvasSliceY = 0;

        for (let i = 0; i < totalPages; i++) {
            if (i > 0) pdf.addPage();
            
            const pageContentHeight = Math.min(availableHeight, totalPdfHeight - (i * availableHeight));
            const sliceHeightPx = pageContentHeight * (canvas.width / availableWidth);
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = sliceHeightPx;
            const pageCtx = pageCanvas.getContext('2d');
            
            if (pageCtx) {
                pageCtx.drawImage(canvas, 0, canvasSliceY, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx);
                pdf.addImage(pageCanvas.toDataURL('image/png', 0.95), 'PNG', margin, margin, availableWidth, pageContentHeight);
                canvasSliceY += sliceHeightPx;
            }
        }
        
        const currentYear = new Date().getFullYear();
        const fileName = `YearCompass_${state.user?.name?.replace(/\s+/g, '_') || 'Usuario'}_${currentYear + 1}.pdf`;
        pdf.save(fileName);

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Erro ao gerar PDF. Tente novamente.');
        element.style.width = originalStyle.width;
        element.style.maxWidth = originalStyle.maxWidth;
    } finally {
        setIsGeneratingPDF(false);
    }
  };

  const formatAnswer = (answer: string | string[] | undefined) => {
    if (!answer) return 'Não respondido';
    if (Array.isArray(answer)) {
      return answer.filter(item => typeof item === 'string' && item.trim()).join(', ') || 'Não respondido';
    }
    if (typeof answer === 'string') {
        return answer.trim() || 'Não respondido';
    }
    return 'Não respondido';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-4xl bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-serif font-bold text-gray-900">Meu YearCompass Completo</h2>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="primary" onClick={generatePDF} disabled={isGeneratingPDF} icon={Download}>
                {isGeneratingPDF ? 'Gerando PDF...' : 'Salvar como PDF'}
              </Button>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-full overflow-y-auto pb-20">
          <div id="summary-content" className="w-full max-w-none mx-auto p-8 bg-white">
            <div className="text-center mb-12 border-b border-gray-200 pb-8">
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">YEAR COMPASS</h1>
              <h2 className="text-2xl font-serif text-primary-600 mb-6">{`${new Date().getFullYear()} | ${new Date().getFullYear() + 1}`}</h2>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2"><User className="h-4 w-4" /><span>{state.user?.name || 'Usuário'}</span></div>
                <div className="flex items-center space-x-2"><Calendar className="h-4 w-4" /><span>{state.futureYear.date}</span></div>
              </div>
            </div>

            <section className="mb-16" style={{ breakInside: 'avoid-page' }}>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 border-b-2 border-primary-200 pb-2">O ANO PASSADO</h2>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-3">Revisando seu ano</h3><div className="bg-gray-50 p-4 rounded-lg"><p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.pastYear.yearReview)}</p></div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-4">Meu ano passado foi sobre</h3><div className="space-y-4">{[{ key: 'personalLife', label: 'Vida Pessoal, Família' }, { key: 'career', label: 'Carreira, Estudos' }, { key: 'friends', label: 'Amigos, Comunidade' }, { key: 'rest', label: 'Descanso, Hobbies, Criatividade' }, { key: 'physicalHealth', label: 'Saúde Física, Atividade Física' }, { key: 'mentalHealth', label: 'Saúde Mental, Autoconhecimento' }, { key: 'habits', label: 'Hábitos que Definem Você' }, { key: 'betterTomorrow', label: 'Um Amanhã Melhor' }].map((aspect) => (<div key={aspect.key} className="border-l-4 border-primary-200 pl-4 py-2"><h4 className="font-semibold text-gray-800 mb-2">{aspect.label}</h4><p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">{formatAnswer(state.pastYear.lifeAspects[aspect.key as keyof typeof state.pastYear.lifeAspects])}</p></div>))}</div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-4">Seis frases sobre o ano que passou</h3><div className="space-y-3">{[{ key: 'wisestDecision', text: 'A decisão mais sábia que eu tomei...' }, { key: 'greatestLesson', text: 'A maior lição que aprendi...' }, { key: 'biggestRisk', text: 'O maior risco que eu enfrentei...' }, { key: 'biggestSurprise', text: 'A maior surpresa do ano...' }, { key: 'importantThingForOthers', text: 'A coisa mais importante que eu fiz pelos outros...' }, { key: 'greatestCompletion', text: 'A maior coisa que concluí...' }].map((sentence, index) => (<div key={sentence.key} className="bg-gray-50 p-4 rounded-lg"><p className="font-semibold text-gray-800 mb-2">{index + 1}. {sentence.text}</p><p className="text-gray-600 leading-relaxed">{formatAnswer(state.pastYear.sixSentences[sentence.key as keyof typeof state.pastYear.sixSentences])}</p></div>))}</div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-4">Seis perguntas sobre o ano que passou</h3><div className="space-y-3">{[{ key: 'mostProud', text: 'O que mais te orgulha?' }, { key: 'threeInfluencers', text: 'Quais são as três pessoas que mais influenciaram você?' }, { key: 'threeInfluenced', text: 'Quais as três pessoas que você mais influenciou?' }, { key: 'unachieved', text: 'O que você não foi capaz de alcançar?' }, { key: 'bestDiscovery', text: 'Qual foi a melhor coisa que você descobriu sobre si mesmo?' }, { key: 'mostGrateful', text: 'Pelo quê você mais se sente grato?' }].map((question, index) => (<div key={question.key} className="bg-gray-50 p-4 rounded-lg"><p className="font-semibold text-gray-800 mb-2">{index + 1}. {question.text}</p><p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.pastYear.sixQuestions[question.key as keyof typeof state.pastYear.sixQuestions])}</p></div>))}</div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-3">Os melhores momentos</h3><div className="bg-gray-50 p-4 rounded-lg"><p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.pastYear.bestMoments)}</p></div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-4">Realizações e Desafios</h3><div className="grid md:grid-cols-2 gap-8"><div className="bg-green-50 p-4 rounded-lg"><h4 className="font-semibold text-green-700 mb-3 text-lg">Três das minhas maiores realizações</h4><ul className="space-y-2 mb-4">{state.pastYear.achievements.map((achievement, index) => (<li key={index} className="text-gray-700"><span className="font-medium">{index + 1}.</span> {achievement || 'Não informado'}</li>))}</ul><div className="space-y-4"><div><p className="font-semibold text-gray-700 mb-2">O que você fez para alcançá-los?</p><p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.pastYear.achievementHelp)}</p></div><div><p className="font-semibold text-gray-700 mb-2">Quem ajudou você a alcançá-los?</p><p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.pastYear.achievementSupporters)}</p></div></div></div><div className="bg-orange-50 p-4 rounded-lg"><h4 className="font-semibold text-orange-700 mb-3 text-lg">Três dos meus maiores desafios</h4><ul className="space-y-2 mb-4">{state.pastYear.challenges.map((challenge, index) => (<li key={index} className="text-gray-700"><span className="font-medium">{index + 1}.</span> {challenge || 'Não informado'}</li>))}</ul><div className="space-y-4"><div><p className="font-semibold text-gray-700 mb-2">Quem ou o quê ajudou você a superar esses desafios?</p><p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.pastYear.challengeHelp)}</p></div><div><p className="font-semibold text-gray-700 mb-2">O que você aprendeu sobre si mesmo?</p><p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.pastYear.challengeLearnings)}</p></div></div></div></div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-4">O livro do meu ano passado</h3><div className="bg-gray-50 p-4 rounded-lg space-y-4"><div><p className="font-semibold text-gray-700 mb-2">Título do livro/filme:</p><p className="text-gray-600 text-lg italic">{formatAnswer(state.pastYear.bookTitle)}</p></div><div><p className="font-semibold text-gray-700 mb-2">O ano passado em três palavras:</p><p className="text-gray-600 text-lg font-medium">{formatAnswer(state.pastYear.threeWords)}</p></div></div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-4">Perdão e Libertação</h3><div className="grid md:grid-cols-2 gap-6"><div className="bg-blue-50 p-4 rounded-lg"><h4 className="font-semibold text-blue-700 mb-3 text-lg">Perdão</h4><p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.pastYear.forgiveness)}</p></div><div className="bg-purple-50 p-4 rounded-lg"><h4 className="font-semibold text-purple-700 mb-3 text-lg">Deixando Partir</h4><p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.pastYear.lettingGo)}</p></div></div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-3">Adeus ao ano que acaba</h3><div className="bg-gray-50 p-4 rounded-lg"><p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.pastYear.goodbye)}</p></div></div>
            </section>

            <section className="mb-16" style={{ breakInside: 'avoid-page' }}>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 border-b-2 border-primary-200 pb-2">O ANO À FRENTE</h2>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-3">Ouse sonhar alto</h3><div className="bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-lg"><p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.futureYear.dreamBig)}</p></div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-4">Meu próximo ano será sobre</h3><div className="space-y-4">{[{ key: 'personalLife', label: 'Vida Pessoal, Família' }, { key: 'career', label: 'Carreira, Estudos' }, { key: 'friends', label: 'Amigos, Comunidade' }, { key: 'rest', label: 'Descanso, Hobbies, Criatividade' }, { key: 'physicalHealth', label: 'Saúde Física, Atividade Física' }, { key: 'mentalHealth', label: 'Saúde Mental, Autoconhecimento' }, { key: 'habits', label: 'Hábitos que Definem Você' }, { key: 'betterTomorrow', label: 'Um Amanhã Melhor' }].map((aspect) => (<div key={aspect.key} className="border-l-4 border-accent-200 pl-4 py-2"><h4 className="font-semibold text-gray-800 mb-2">{aspect.label}</h4><p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.futureYear.lifeAspects[aspect.key as keyof typeof state.futureYear.lifeAspects])}</p></div>))}</div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-4">Trios mágicos para o ano que começa</h3><div className="grid gap-4">{[{ key: 'selfLove', label: 'Três coisas que amarei sobre mim' }, { key: 'readyToDiscard', label: 'Três coisas das quais estou pronto para me livrar' }, { key: 'wantToAchieve', label: 'Três coisas que eu mais quero alcançar' }, { key: 'supportPillars', label: 'Três pessoas que serão meus pilares' }, { key: 'dareToExplore', label: 'Três coisas que vou me atrever a explorar' }, { key: 'powerToRefuse', label: 'Três coisas que terei o poder de recusar' }, { key: 'betterEnvironments', label: 'Três coisas para tornar meus ambientes mais agradáveis' }, { key: 'morningRoutine', label: 'Três coisas que farei todas as manhãs' }, { key: 'selfCare', label: 'Três coisas para me mimar regularmente' }, { key: 'placesToVisit', label: 'Três locais que vou visitar' }, { key: 'connectionWays', label: 'Três maneiras de me conectar com quem amo' }, { key: 'successRewards', label: 'Três presentes para recompensar meus sucessos' }].map((trio) => (<div key={trio.key} className="bg-gray-50 p-4 rounded-lg"><h4 className="font-semibold text-gray-800 mb-2">{trio.label}</h4><p className="text-gray-600 leading-relaxed">{formatAnswer(state.futureYear.magicTrios[trio.key as keyof typeof state.futureYear.magicTrios])}</p></div>))}</div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-4">Seis frases sobre meu próximo ano</h3><div className="space-y-3">{['Este ano eu me comprometo a...', 'Este ano eu vou parar de...', 'Este ano eu vou começar a...', 'Este ano eu vou aprender...', 'Este ano eu vou criar...', 'Este ano eu vou me tornar...'].map((sentence, index) => (<div key={index} className="bg-gray-50 p-4 rounded-lg"><p className="font-semibold text-gray-800 mb-2">{index + 1}. {sentence}</p><p className="text-gray-600 leading-relaxed">{formatAnswer(state.futureYear.sixSentences[`sentence${index + 1}` as keyof typeof state.futureYear.sixSentences])}</p></div>))}</div></div>
              <div className="mb-8"><h3 className="text-xl font-semibold text-gray-800 mb-4">Minha palavra e desejo</h3><div className="grid md:grid-cols-2 gap-6"><div className="text-center bg-primary-50 p-6 rounded-lg"><h4 className="font-semibold text-primary-700 mb-4 text-lg">Minha palavra para o ano que começa</h4><div className="text-4xl font-serif font-bold text-primary-600 py-4">{state.futureYear.yearWord || 'Não definida'}</div></div><div className="bg-purple-50 p-6 rounded-lg"><h4 className="font-semibold text-purple-700 mb-4 text-lg">Desejo secreto</h4><p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{formatAnswer(state.futureYear.secretWish)}</p></div></div></div>
            </section>

            <div className="text-center pt-8 border-t-2 border-gray-200" style={{ breakInside: 'avoid-page' }}>
              <div className="space-y-6">
                <p className="text-2xl font-serif text-gray-800 font-semibold">"EU ACREDITO QUE TUDO É POSSÍVEL ESTE ANO."</p>
                <div className="flex items-center justify-center space-x-12 text-gray-600">
                  <div className="text-center"><p className="font-semibold mb-1">Data:</p><p className="text-lg">{state.futureYear.date}</p></div>
                  <div className="text-center"><p className="font-semibold mb-1">Assinatura:</p><p className="text-lg font-serif">{state.futureYear.signature}</p></div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySheet;
import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>por uma equipe internacional em Budapeste, Hungria</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <a
              href="https://yearcompass.com/br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
            >
              <span>yearcompass.com/br</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            <p className="mb-2">
              Este trabalho está licenciado pela licença internacional Creative Commons 
              Attribution-NonCommercial-ShareAlike 4.0 International.
            </p>
            <p>
              Caso você encontre algum erro de digitação, de gramática ou outros problemas, 
              seja gentil e nos avise pelo site oficial acima.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';

interface SectionNavProps {
  title: string;
  sections: Array<{
    id: string;
    title: string;
  }>;
  activeSection?: string;
  onSectionClick: (id: string) => void;
}

const SectionNav: React.FC<SectionNavProps> = ({
  title,
  sections,
  activeSection,
  onSectionClick,
}) => {
  return (
    <nav className="sticky top-20 bg-white border-r border-gray-200 h-fit">
      <div className="p-6">
        <h2 className="text-lg font-serif font-semibold text-gray-900 mb-6">
          {title}
        </h2>
        
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => onSectionClick(section.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SectionNav;
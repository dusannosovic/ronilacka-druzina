import React, { useEffect } from 'react';
import type { ReactNode } from 'react'; 
import { X } from 'lucide-react';

// 1. Definisanje tipova za props
interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode; // Prihvata bilo koji JSX sadržaj
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, children }) => {
  
  // 2. Onemogućavanje skrolovanja pozadine kada je modal otvoren
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Ako modal nije otvoren, ne renderuj ništa
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* OVERLAY: Zatamnjenje i zamućenje pozadine */}
      <div 
        className="absolute inset-0 bg-ocean/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* MODALNI PROZOR */}
      <div className="relative bg-white w-full max-w-2xl max-h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* HEADER: Naslov i X dugme */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100 bg-white">
          <h3 className="text-xl md:text-2xl font-black text-ocean tracking-tight">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 bg-ocean-light text-ocean rounded-full hover:bg-aqua hover:text-white transition-all duration-300"
            aria-label="Zatvori"
          >
            <X size={24} />
          </button>
        </div>

        {/* CONTENT: Ovde se ubacuje tvoj tekst politike ili uslova */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="prose prose-blue max-w-none">
            {children}
          </div>
        </div>

        {/* FOOTER: Dugme za zatvaranje */}
        <div className="p-6 border-t border-gray-50 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-ocean text-white font-bold rounded-xl hover:bg-aqua hover:text-ocean transition-all duration-300"
          >
            Razumem
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
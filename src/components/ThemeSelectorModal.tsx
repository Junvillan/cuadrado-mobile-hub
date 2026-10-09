import React, { useState } from 'react';
import { THEMES } from '../data/themes';
import { ThemeConfig } from '../types';
import { Palette, X, Check, Sparkles, Moon, Sun, BookOpen, Terminal } from 'lucide-react';

interface ThemeSelectorModalProps {
  currentTheme: ThemeConfig;
  onSelectTheme: (theme: ThemeConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  currentTheme,
  onSelectTheme,
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const categories = ['TODOS', 'AMOLED', 'Académico', 'Lectura', 'Cyber'];

  const filteredThemes = THEMES.filter((t) => {
    const matchesCategory = selectedCategory === 'TODOS' || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-lg max-h-[85vh] rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl border ${currentTheme.cardBgClass} ${currentTheme.borderClass} ${currentTheme.textClass}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div 
              className="p-2 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${currentTheme.accentColor}20`, color: currentTheme.accentColor }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Suite Notarial de 20 Temas</h3>
              <p className={`text-xs ${currentTheme.mutedTextClass}`}>
                Tema activo: <span className="font-semibold">{currentTheme.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-transform"
            aria-label="Cerrar selector de temas"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter categories */}
        <div className="px-4 pt-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-white/20 text-white font-semibold shadow-sm'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {cat === 'AMOLED' && <Moon className="w-3 h-3 inline mr-1" />}
              {cat === 'Académico' && <Sparkles className="w-3 h-3 inline mr-1" />}
              {cat === 'Lectura' && <BookOpen className="w-3 h-3 inline mr-1" />}
              {cat === 'Cyber' && <Terminal className="w-3 h-3 inline mr-1" />}
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="px-4 py-1.5">
          <input
            type="text"
            placeholder="Buscar entre los 20 temas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-lg bg-black/20 border border-white/10 focus:outline-none focus:border-white/30 placeholder-white/40"
          />
        </div>

        {/* Themes Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-2.5 sm:grid-cols-2">
          {filteredThemes.map((theme) => {
            const isSelected = currentTheme.id === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme);
                }}
                className={`flex flex-col text-left p-3 rounded-xl border transition-all text-xs relative ${
                  isSelected
                    ? 'border-2 ring-2 ring-offset-1 ring-offset-black/50 shadow-md scale-[1.02]'
                    : 'border-white/10 hover:border-white/20 hover:scale-[1.01]'
                }`}
                style={{
                  borderColor: isSelected ? theme.accentColor : undefined,
                  backgroundColor: theme.id === 'guardia-oled' ? '#000000' : 
                                   theme.id === 'ieee-claro' ? '#FFFFFF' :
                                   theme.id === 'sepia-ereader' ? '#F4ECD8' :
                                   theme.id === 'arbol-clinico' ? '#18122B' :
                                   theme.id === 'matrix' ? '#020C06' : '#141419',
                  color: theme.isLight ? '#1F2937' : '#F9FAFB',
                }}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-bold truncate text-[13px]">{theme.name}</span>
                  {isSelected && (
                    <span 
                      className="w-4 h-4 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-1">
                  <span 
                    className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                  <span className="text-[10px] opacity-75 truncate">{theme.category}</span>
                  {theme.isOled && (
                    <span className="ml-auto text-[9px] px-1 rounded bg-black text-sky-300 font-mono border border-zinc-700">
                      OLED
                    </span>
                  )}
                  {theme.isMatrix && (
                    <span className="ml-auto text-[9px] px-1 rounded bg-black text-[#00FF66] font-mono border border-[#00FF66]/50">
                      120Hz
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-white/10 text-center text-[11px] opacity-70">
          💡 Optimizado para ahorro de energía en AMOLED (120Hz Realme P3).
        </div>
      </div>
    </div>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { MAP_STYLES } from '../constants.ts';
import { StyleCategory, MapStyle } from '../types.ts';

interface StylePickerProps {
  selectedStyle: MapStyle;
  onSelect: (style: MapStyle) => void;
}

const StylePicker: React.FC<StylePickerProps> = ({ selectedStyle, onSelect }) => {
  const [activeCategory, setActiveCategory] = useState<StyleCategory>(StyleCategory.CARTOGRAPHIC);
  const stylesContainerRef = useRef<HTMLDivElement>(null);

  const categories = Object.values(StyleCategory);

  useEffect(() => {
    if (stylesContainerRef.current) {
      stylesContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-2 w-full max-w-[1800px] mx-auto px-4">
      {/* Category Navigation Bar - Ultra Compact */}
      <div className="flex overflow-x-auto gap-1 pb-1 scrollbar-hide no-scrollbar items-center">
        <span className="text-[8px] font-bold text-slate-500/60 uppercase tracking-widest mr-3 border-r border-slate-300/30 pr-3 shrink-0">Explore</span>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-md text-[9px] font-bold whitespace-nowrap transition-all uppercase tracking-wider border shrink-0 cursor-pointer ${
              activeCategory === cat
                ? 'bg-slate-800 text-white border-slate-800 shadow-sm scale-105'
                : 'bg-white/40 text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Style Horizontal Scroller - Small icons & Balanced spacing */}
      <div 
        ref={stylesContainerRef}
        className="flex overflow-x-auto gap-2 py-1 scrollbar-hide no-scrollbar scroll-smooth items-center min-h-[50px]"
      >
        {MAP_STYLES.filter(s => s.category === activeCategory).map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => onSelect(style)}
            className={`group flex items-center gap-2.5 p-2 px-4 rounded-xl border transition-all text-left shrink-0 relative overflow-hidden active:scale-[0.98] ${
              selectedStyle.id === style.id
                ? 'border-slate-800 bg-white text-slate-800 shadow-md z-10'
                : 'border-slate-200/50 bg-white/30 text-slate-600 hover:bg-white/60 hover:border-slate-300'
            }`}
          >
            {/* Minimalist Selection indicator */}
            {selectedStyle.id === style.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-800"></div>
            )}
            
            <div className={`text-xl shrink-0 transition-all duration-300 ${selectedStyle.id === style.id ? 'scale-110' : 'grayscale-[0.8] opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`}>
              {style.icon}
            </div>
            
            <div className="flex flex-col min-w-[80px]">
              <span className="font-bold text-[10px] uppercase tracking-tight leading-none">
                {style.name}
              </span>
              <span className="text-[7px] line-clamp-1 opacity-50 font-medium uppercase tracking-tighter mt-0.5">
                {style.description}
              </span>
            </div>
          </button>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default StylePicker;

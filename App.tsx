import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MAP_STYLES } from './constants';
import { MapStyle, GeneratedMap } from './types';
import { generateCityMap } from './services/geminiService';
import StylePicker from './components/StylePicker';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<MapStyle>(MAP_STYLES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMap, setCurrentMap] = useState<GeneratedMap | null>(null);
  const [history, setHistory] = useState<GeneratedMap[]>([]);
  const [loadingMessage, setLoadingMessage] = useState('Consulting satellites...');

  // Navigation state
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const loadingMessages = [
    'Sketching urban boundaries...',
    'Tracing metropolitan arteries...',
    'Applying artistic textures...',
    'Formatting cartographic layout...',
    'Finalizing city aesthetic...',
    'Rendering road network...'
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      let i = 0;
      interval = setInterval(() => {
        setLoadingMessage(loadingMessages[i % loadingMessages.length]);
        i++;
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);
    resetView();

    try {
      const { imageUrl } = await generateCityMap(city, selectedStyle);
      const newMap: GeneratedMap = {
        imageUrl,
        cityName: city,
        style: selectedStyle,
        timestamp: Date.now()
      };
      setCurrentMap(newMap);
      setHistory(prev => [newMap, ...prev.slice(0, 9)]);
    } catch (err: any) {
      setError(err.message || "An error occurred during generation.");
    } finally {
      setLoading(false);
    }
  };

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(prev + delta, 0.5), 10));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!currentMap) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!currentMap) return;
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    handleZoom(delta);
  };

  const handleDownload = () => {
    if (!currentMap) return;
    const link = document.createElement('a');
    link.href = currentMap.imageUrl;
    link.download = `MapMaker-${currentMap.cityName}-${currentMap.style.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-screen flex flex-col text-slate-900 font-sans selection:bg-amber-100 relative overflow-hidden bg-[#f4f1ea]">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ 
          backgroundImage: `url('https://www.transparenttextures.com/patterns/handmade-paper.png')`,
          filter: 'sepia(0.2)'
        }}></div>
      </div>

      {/* Header */}
      <header className="bg-white/40 backdrop-blur-md border-b border-slate-200/50 z-[100] px-4 py-2">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-1.5 rounded-lg shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h1 className="text-lg font-black tracking-tight text-slate-800 uppercase italic">Map Maker</h1>
          </div>

          <div className="flex flex-1 md:max-w-md gap-1.5">
            <input
              type="text"
              placeholder="Search city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              className="flex-1 bg-white/60 border border-slate-200 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-slate-400 outline-none transition-all placeholder:text-slate-400 font-bold text-xs"
            />
            <button 
              onClick={handleGenerate} 
              disabled={loading} 
              className={`px-5 py-1.5 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-2 uppercase tracking-widest text-[10px] ${loading ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
            >
              {loading ? <div className="h-3 w-3 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" /> : 'Generate'}
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white/20 border-b border-slate-200/40 z-[90] py-1.5">
        <StylePicker selectedStyle={selectedStyle} onSelect={setSelectedStyle} />
      </nav>

      <main className="flex-1 relative z-10 p-2 overflow-hidden flex flex-col">
        <div 
          ref={mapRef}
          className={`flex-1 relative bg-slate-200/20 rounded-2xl shadow-inner border border-white/40 overflow-hidden group ${currentMap ? 'cursor-grab active:cursor-grabbing' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          {!currentMap && !loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-8 text-center pointer-events-none">
              <h3 className="text-xl font-black text-slate-300 tracking-tight uppercase italic mb-2">Cartography Studio</h3>
              <p className="max-w-xs text-[10px] font-bold leading-relaxed uppercase tracking-[0.2em]">Enter a city to generate its artistic metropolitan grid.</p>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#f4f1ea]/90 backdrop-blur-sm z-[200]">
              <div className="h-32 w-32 border-8 border-slate-200 border-t-slate-800 rounded-full animate-spin shadow-xl" />
              <p className="mt-8 text-sm font-black tracking-[0.3em] uppercase italic animate-pulse">{loadingMessage}</p>
            </div>
          )}

          {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[250] bg-white text-red-600 px-6 py-3 rounded-lg shadow-xl border border-red-100 flex items-center gap-3">
              <span className="font-bold text-[10px] uppercase tracking-wider">{error}</span>
            </div>
          )}

          {currentMap && !loading && (
            <>
              <div 
                className="w-full h-full absolute transition-transform duration-75 ease-out will-change-transform"
                style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transformOrigin: 'center' }}
              >
                <img src={currentMap.imageUrl} className="w-full h-full object-contain bg-white pointer-events-none select-none" alt={currentMap.cityName} />
              </div>
              
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-50">
                <button onClick={() => handleZoom(0.2)} className="bg-white/80 p-2 rounded-lg shadow-md border border-slate-200 text-slate-600 hover:bg-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                </button>
                <button onClick={() => handleZoom(-0.2)} className="bg-white/80 p-2 rounded-lg shadow-md border border-slate-200 text-slate-600 hover:bg-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" /></svg>
                </button>
                <button onClick={resetView} className="bg-white/80 p-2 rounded-lg shadow-md border border-slate-200 text-slate-600 hover:bg-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
              </div>

              <div className="absolute bottom-4 inset-x-4 flex justify-between items-end pointer-events-none">
                <div className="bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-2xl pointer-events-auto border border-white/50 max-w-[320px]">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic leading-none truncate mb-1">{currentMap.cityName}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{currentMap.style.icon}</span>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-wide">{currentMap.style.name}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">
                      Note: These maps are AI-generated and inspired by real city topology. While they aim for accuracy, they remain artistic interpretations and may not be 100% faithful to the real-world terrain.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <button onClick={handleDownload} className="pointer-events-auto p-3 bg-slate-800 text-white rounded-lg shadow-lg hover:bg-slate-700 transition-all active:scale-90">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
                  {history.length > 1 && (
                    <div className="flex gap-1.5 p-1.5 bg-white/60 backdrop-blur-sm rounded-lg border border-white/50 pointer-events-auto overflow-x-auto max-w-[200px] no-scrollbar">
                      {history.slice(1, 6).map((h, i) => (
                        <button key={i} onClick={() => { setCurrentMap(h); resetView(); }} className="w-8 h-8 rounded-md overflow-hidden border border-slate-300 shrink-0 hover:scale-110 transition-transform">
                          <img src={h.imageUrl} className="w-full h-full object-cover" alt={h.cityName} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
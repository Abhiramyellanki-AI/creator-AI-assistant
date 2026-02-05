
import React, { useState } from 'react';
import { ToolId, ToolConfig, AnyInput } from './types';
import { TOOLS } from './constants';
import { generateContent } from './services/geminiService';
import { Button } from './components/Button';
import { OutputDisplay } from './components/OutputDisplay';

const App: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<ToolId | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [ytTopic, setYtTopic] = useState('');
  const [ytType, setYtType] = useState<'Short' | 'Long'>('Short');
  const [ytTone, setYtTone] = useState<'Educational' | 'Motivational' | 'Casual'>('Educational');

  const [liIdea, setLiIdea] = useState('');
  const [liAudience, setLiAudience] = useState<'Students' | 'Professionals' | 'Founders'>('Students');
  const [liTone, setLiTone] = useState<'Formal' | 'Friendly' | 'Authoritative'>('Formal');

  const [resContent, setResContent] = useState('');

  const [presTopic, setPresTopic] = useState('');
  const [presSlides, setPresSlides] = useState(5);
  const [presAudience, setPresAudience] = useState('');

  const activeTool = TOOLS.find(t => t.id === activeToolId);

  const handleGenerate = async () => {
    if (!activeToolId) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    let inputs: AnyInput;

    if (activeToolId === ToolId.YOUTUBE) {
      inputs = { topic: ytTopic, type: ytType, tone: ytTone };
    } else if (activeToolId === ToolId.LINKEDIN) {
      inputs = { idea: liIdea, audience: liAudience, tone: liTone };
    } else if (activeToolId === ToolId.RESUME) {
      inputs = { content: resContent };
    } else {
      inputs = { topic: presTopic, slides: presSlides, audience: presAudience };
    }

    try {
      const output = await generateContent(activeToolId, inputs);
      setResult(output);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveToolId(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleBack}
          >
            <div className="bg-indigo-600 text-white p-2 rounded-xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight hidden sm:block">AI Creator <span className="text-indigo-600">Pro</span></h1>
          </div>
          
          <nav className="flex items-center gap-5">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hidden md:block">Engine: Gemini 3 Flash</span>
             <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
             </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {!activeToolId ? (
          <section className="animate-in fade-in duration-1000">
            <div className="text-center mb-16">
              <h2 className="text-5xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
                Design Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Future</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                Experience the next generation of creative tools. Professional structure, optimized for students and creators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {TOOLS.map((tool) => (
                <div 
                  key={tool.id}
                  onClick={() => setActiveToolId(tool.id)}
                  className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group"
                >
                  <div className={`${tool.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{tool.name}</h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">{tool.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-24 p-12 rounded-[3rem] bg-indigo-600 text-white flex flex-col md:flex-row items-center gap-12 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="flex-1 text-center md:text-left z-10">
                 <h4 className="text-3xl font-black mb-4">Precision Engineering</h4>
                 <p className="text-indigo-100 text-lg font-medium leading-relaxed">Our logic utilizes advanced prompt engineering to ensure every output is not just text, but a formatted, ready-to-use professional asset.</p>
              </div>
              <div className="grid grid-cols-2 gap-6 z-10">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center">
                   <div className="text-white font-black text-3xl mb-1">10x</div>
                   <div className="text-[10px] text-indigo-200 uppercase font-bold tracking-[0.2em]">Efficiency</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center">
                   <div className="text-white font-black text-3xl mb-1">100%</div>
                   <div className="text-[10px] text-indigo-200 uppercase font-bold tracking-[0.2em]">Original</div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right-8 duration-700">
            <button 
              onClick={handleBack}
              className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 mb-8 font-bold text-sm uppercase tracking-widest transition-all group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>

            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-xl mb-10">
              <div className="flex items-center gap-6 mb-10">
                 <div className={`${activeTool?.color} w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-2xl text-white`}>
                   {activeTool?.icon}
                 </div>
                 <div>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight">{activeTool?.name}</h2>
                   <p className="text-slate-600 font-medium text-lg">{activeTool?.description}</p>
                 </div>
              </div>

              <div className="space-y-8">
                {activeToolId === ToolId.YOUTUBE && (
                  <>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Video Topic</label>
                      <input 
                        type="text" 
                        value={ytTopic} 
                        onChange={(e) => setYtTopic(e.target.value)}
                        placeholder="e.g. 5 Morning Habits for Success"
                        className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 transition-all outline-none font-semibold text-slate-800 placeholder:text-slate-400"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Format</label>
                        <select 
                          value={ytType}
                          onChange={(e) => setYtType(e.target.value as any)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 transition-all outline-none font-bold text-slate-700"
                        >
                          <option>Short</option>
                          <option>Long</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Style</label>
                        <select 
                          value={ytTone}
                          onChange={(e) => setYtTone(e.target.value as any)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 transition-all outline-none font-bold text-slate-700"
                        >
                          <option>Educational</option>
                          <option>Motivational</option>
                          <option>Casual</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {activeToolId === ToolId.LINKEDIN && (
                  <>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Experience Description</label>
                      <textarea 
                        rows={5}
                        value={liIdea} 
                        onChange={(e) => setLiIdea(e.target.value)}
                        placeholder="What happened? What's the key takeaway?..."
                        className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 transition-all outline-none font-semibold text-slate-800 placeholder:text-slate-400 resize-none leading-relaxed"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Audience</label>
                        <select 
                          value={liAudience}
                          onChange={(e) => setLiAudience(e.target.value as any)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 transition-all outline-none font-bold text-slate-700"
                        >
                          <option>Students</option>
                          <option>Professionals</option>
                          <option>Founders</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Tone</label>
                        <select 
                          value={liTone}
                          onChange={(e) => setLiTone(e.target.value as any)}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 transition-all outline-none font-bold text-slate-700"
                        >
                          <option>Formal</option>
                          <option>Friendly</option>
                          <option>Authoritative</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {activeToolId === ToolId.RESUME && (
                  <>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Resume Content</label>
                      <textarea 
                        rows={12}
                        value={resContent} 
                        onChange={(e) => setResContent(e.target.value)}
                        placeholder="Paste your resume here (Text format only)..."
                        className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 transition-all outline-none font-medium text-slate-800 placeholder:text-slate-400 resize-none font-mono text-[13px] leading-relaxed"
                      />
                    </div>
                  </>
                )}

                {activeToolId === ToolId.PRESENTATION && (
                  <>
                    <div className="space-y-3">
                      <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Topic</label>
                      <input 
                        type="text" 
                        value={presTopic} 
                        onChange={(e) => setPresTopic(e.target.value)}
                        placeholder="e.g. AI in Modern Healthcare"
                        className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 transition-all outline-none font-semibold text-slate-800 placeholder:text-slate-400"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Slide Count</label>
                        <input 
                          type="number" 
                          min={3}
                          max={20}
                          value={presSlides} 
                          onChange={(e) => setPresSlides(parseInt(e.target.value))}
                          className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 transition-all outline-none font-bold text-slate-700"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Target Audience</label>
                        <input 
                          type="text" 
                          value={presAudience} 
                          onChange={(e) => setPresAudience(e.target.value)}
                          placeholder="e.g. Investors, Staff..."
                          className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 transition-all outline-none font-semibold text-slate-800"
                        />
                      </div>
                    </div>
                  </>
                )}

                {error && (
                  <div className="p-5 bg-red-50 border-2 border-red-100 text-red-700 rounded-2xl text-sm font-bold flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                )}

                <Button 
                  onClick={handleGenerate} 
                  isLoading={loading}
                  className="w-full py-5 rounded-2xl text-xl font-black shadow-indigo-200 shadow-2xl hover:scale-[1.01] active:scale-95 transition-all"
                >
                  {loading ? 'Optimizing Response...' : 'Build It Now'}
                </Button>
              </div>
            </div>

            <OutputDisplay content={result || ''} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="bg-indigo-600 h-1.5 w-1.5 rounded-full animate-pulse"></div>
            <span className="text-slate-900 font-black tracking-widest text-xs uppercase">AI Assistant v1.0</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Built with precision for the modern web.</p>
          <div className="mt-8 flex justify-center gap-8">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Terms</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-[10px] font-black uppercase tracking-[0.2em]">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

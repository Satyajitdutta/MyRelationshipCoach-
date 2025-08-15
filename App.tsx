
import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { ChatMessage } from './types';
import { Rasa } from './types';
import { RASA_DETAILS, TRANSLATIONS, SUPPORTED_LANGUAGES } from './constants';
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

// --- NEW VIBRANT ICONS ---
const SendIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>;
const MicIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg>;
const SpeakerIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>;
const LifebuoyIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8a5 5 0 0110 0h-2a3 3 0 00-6 0H7zm3 3a3 3 0 006 0h2a5 5 0 01-10 0h2z"/></svg>;
const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>;
const MoreVertIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>;


// --- API SETUP ---
const API_KEY = process.env.API_KEY;
let ai: GoogleGenAI | undefined;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

// --- APP COMPONENT ---
const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>('en');
  
  // Load user from local storage on mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem('bandhan-mitra-user');
    if (loggedInUser) {
      setCurrentUser(loggedInUser);
    }
    const savedLang = localStorage.getItem('bandhan-mitra-lang');
    if(savedLang) setLanguage(savedLang);
  }, []);

  const handleLogin = (username: string) => {
    const trimmedUsername = username.trim();
    if (trimmedUsername) {
      localStorage.setItem('bandhan-mitra-user', trimmedUsername);
      setCurrentUser(trimmedUsername);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('bandhan-mitra-user');
    setCurrentUser(null);
  };
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('bandhan-mitra-lang', lang);
  }

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} language={language} />;
  }

  return <ChatScreen user={currentUser} onLogout={handleLogout} language={language} onLanguageChange={handleLanguageChange} />;
};

// --- LOGIN SCREEN ---
const LoginScreen: React.FC<{onLogin: (username: string) => void, language: string}> = ({ onLogin, language }) => {
  const t = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name);
  };

  const [name, setName] = useState('');

  return (
    <div className="bg-[#FFF8F0] text-[#4A2E2A] h-screen flex flex-col justify-center items-center p-4" style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3e%3cg fill-rule='evenodd'%3e%3cg id='hexagons' fill='%230d9488' fill-opacity='0.08' fill-rule='nonzero'%3e%3cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.99-7.5L26 15v18.5l-13 7.5L0 33.5V15z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e\")" }}>
      <div className="w-full max-w-sm text-center bg-white/70 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
        <h1 className="text-3xl md:text-4xl font-serif text-teal-700 font-bold">{t.loginTitle}</h1>
        <p className="mt-2 mb-6 opacity-80">{t.loginSubtitle}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.loginPlaceholder}
            className="w-full p-3 bg-transparent border-b-2 border-teal-500 focus:outline-none focus:border-teal-700 transition-colors"
            required
          />
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg p-3 font-semibold transition-colors shadow-md">
            {t.loginButton}
          </button>
        </form>
      </div>
    </div>
  );
};


// --- CHAT SCREEN ---
interface ChatScreenProps {
  user: string;
  onLogout: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
}

const CodeHighlight: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;
  const parts = text.split('`');
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <code key={index} className="font-mono bg-gray-200 text-red-700 px-1 py-0.5 rounded text-sm">
            {part}
          </code>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

const ChatScreen: React.FC<ChatScreenProps> = ({ user, onLogout, language, onLanguageChange }) => {
  const t = useMemo(() => TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.en, [language]);
  const currentLanguage = useMemo(() => SUPPORTED_LANGUAGES.find(lang => lang.code === language) || SUPPORTED_LANGUAGES[0], [language]);

  if (!API_KEY) {
    return (
      <div className="bg-[#FFF8F0] text-[#4A2E2A] h-[100dvh] flex flex-col items-center justify-center p-4 text-center" style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3e%3cg fill-rule='evenodd'%3e%3cg id='hexagons' fill='%230d9488' fill-opacity='0.08' fill-rule='nonzero'%3e%3cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.99-7.5L26 15v18.5l-13 7.5L0 33.5V15z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e\")" }}>
        <div className="max-w-lg w-full bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200">
          <h1 className="text-2xl font-bold text-red-600 font-serif">{t.errorApiKeyTitle}</h1>
          <div className="text-left space-y-4 mt-4">
             <p className="text-gray-800">
              <CodeHighlight text={t.errorApiKeyMessage1} />
            </p>
            <p className="text-sm text-gray-600">
              <CodeHighlight text={t.errorApiKeyMessage2} />
            </p>
            <p className="text-sm font-mono bg-gray-100 p-3 rounded border border-gray-200 text-center">
              {t.errorApiKeyMessage3}
            </p>
            <p className="text-sm text-gray-600">
              <CodeHighlight text={t.errorApiKeyMessage4} />
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  const getWelcomeMessage = (): ChatMessage => ({ id: 'welcome-1', text: t.welcome, sender: 'ai', rasa: Rasa.Shanta });
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [currentlySpeaking, setCurrentlySpeaking] = useState<string | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  // Load/save messages from local storage
  useEffect(() => {
    const savedMessages = localStorage.getItem(`messages-${user}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([getWelcomeMessage()]);
    }
  }, [user, t]); 

  useEffect(() => {
    localStorage.setItem(`messages-${user}`, JSON.stringify(messages));
  }, [messages, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn(t.speechNotSupported);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = currentLanguage.speechRecogCode;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, [t.speechNotSupported, currentLanguage]);
  

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };
  
  const handleSpeak = async (msg: ChatMessage) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ''; // Detach the source
      audioRef.current = null;
    }
  
    // If the user clicks the icon for the message that was playing, we just stop it.
    if (currentlySpeaking === msg.id) {
      setCurrentlySpeaking(null);
      return;
    }
  
    // Indicate that this message is now the one being spoken (or attempting to)
    setCurrentlySpeaking(msg.id);
  
    try {
      const response = await fetch('/api/speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: msg.text,
          voice: currentLanguage.googleVoice,
        }),
      });
  
      if (!response.ok) {
        console.error('TTS API error:', await response.text());
        throw new Error(`API error: ${response.statusText}`);
      }
  
      const data = await response.json();
      
      if (data.audioContent) {
        const audioSrc = `data:audio/mp3;base64,${data.audioContent}`;
        const audio = new Audio(audioSrc);
        audioRef.current = audio;
  
        audio.onended = () => {
          setCurrentlySpeaking(null);
          audioRef.current = null;
        };
  
        audio.onerror = (e) => {
          console.error("Audio playback error:", e);
          setError(t.ttsError);
          setCurrentlySpeaking(null);
          audioRef.current = null;
        };
  
        await audio.play();
      } else {
        throw new Error('No audio content in API response');
      }
  
    } catch (err) {
      console.error("Failed to fetch or play audio:", err);
      setError(t.ttsError);
      setCurrentlySpeaking(null); // Clear speaking state on error
    }
  };


  const handleSend = async (e?: React.FormEvent, text: string = input) => {
    e?.preventDefault();
    if (text.trim() === '' || isLoading) return;
    if (!ai) { setError(t.errorApiKey); return; }

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, text: text, sender: 'user' };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    try {
      const schema = {
        type: Type.OBJECT,
        properties: { rasa: { type: Type.STRING, enum: Object.values(Rasa).filter(r => r !== Rasa.None) }, response: { type: Type.STRING } },
        required: ['rasa', 'response'],
      };
      const conversationHistory = updatedMessages.map(m => `${m.sender}: ${m.text}`).join('\n');
      const prompt = `Based on the following conversation history, analyze the last user message and provide a response in ${currentLanguage.name}.
Conversation History:
---
${conversationHistory}
---
Your task:
1. Analyze the user's latest message to identify the dominant emotional sentiment (Rasa).
2. Choose ONE Rasa from this list: ${Object.values(Rasa).filter(r => r !== Rasa.None).join(', ')}.
3. Formulate a thoughtful, empathetic response in ${currentLanguage.name} in line with your detailed persona and response structure.
4. Return ONLY a JSON object matching the required schema.`;
      
      const systemInstruction = `Your Core Directive:
You are Bandhan Mitra, a warm, friendly, and wise companion. Think of yourself as a kind friend who listens patiently and offers gentle guidance. Your goal is to help people feel heard, understand their feelings, and see their relationships in a new light.

Your Personality:
*   **Empathetic & Warm:** Always start by showing you understand and care. Use simple, comforting words.
*   **Natural & Conversational:** Speak like a real person, not a textbook. Avoid jargon and complex sentences. Use a friendly, approachable tone.
*   **Wise, not Academic:** You can share wisdom from Indian culture (like simple stories or analogies from the Vedas), but explain it in a very simple way that anyone can understand. The goal is to offer a new perspective, not to lecture.
*   **Supportive, not a Doctor:** You are here to support, not to diagnose or solve problems. Never give medical advice. If someone is in danger, gently guide them to seek professional help.

How to Talk to Users (Your Conversation Flow):
1.  **Listen and Validate:** First, show you've heard them. Say things like, "It sounds like you're feeling..." or "That must be really tough, I'm here for you."
2.  **Share a Simple Idea:** Gently offer a simple story or idea from Indian wisdom that relates to their situation. For example, you could talk about a relationship being like a garden that needs care from both people.
3.  **Connect it to Them:** Briefly explain how that idea connects to what they're going through.
4.  **Ask a Gentle Question:** End with an open-ended question to encourage them to share more. For example, "Can you tell me a little more about what that was like for you?" or "How did that make you feel at that moment?"

The most important thing is to be a kind, understanding friend. Make the user feel safe and comfortable sharing.`;

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction, responseMimeType: "application/json", responseSchema: schema },
      });

      const parsedResponse = JSON.parse(response.text.trim());
      const aiRasa = Object.values(Rasa).find(r => r === parsedResponse.rasa) || Rasa.Shanta;
      const aiMessage: ChatMessage = { id: `ai-${Date.now()}`, text: parsedResponse.response, sender: 'ai', rasa: aiRasa };
      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {
      console.error("Error sending message:", err);
      let errorMessageText = t.errorUnexpected;
      if (err instanceof Error) {
        if (err.message.toLowerCase().includes('permission denied') || err.message.toLowerCase().includes('api key not valid')) {
          errorMessageText = t.errorPermission;
        }
      }
      setError(errorMessageText);
      const errorMessage: ChatMessage = { id: `error-${Date.now()}`, text: t.errorConnection, sender: 'ai', rasa: Rasa.Karuna };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FFF8F0] text-[#4A2E2A] h-[100dvh] flex flex-col font-sans relative" style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3e%3cg fill-rule='evenodd'%3e%3cg id='hexagons' fill='%230d9488' fill-opacity='0.08' fill-rule='nonzero'%3e%3cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.99-7.5L26 15v18.5l-13 7.5L0 33.5V15z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e\")" }}>
      <header className="bg-gradient-to-r from-teal-500 to-teal-700 text-white p-4 shadow-md flex justify-between items-center relative z-10 shrink-0">
        <div className="w-16 md:hidden" />
        <div className="text-center">
            <h1 className="text-xl md:text-3xl font-serif tracking-wide font-bold">{t.title}</h1>
            <p className="text-xs md:text-sm opacity-90 mt-1">{t.subtitle}</p>
        </div>
        <div className="flex items-center space-x-4">
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-4">
                <select value={language} onChange={(e) => onLanguageChange(e.target.value)} className="bg-transparent border-0 text-white focus:outline-none cursor-pointer">
                    {SUPPORTED_LANGUAGES.map(lang => (
                        <option key={lang.code} value={lang.code} className="text-black">{lang.nativeName}</option>
                    ))}
                </select>
                <button onClick={() => setIsSupportModalOpen(true)} title={t.support} className="hover:text-gray-200 transition-colors"><LifebuoyIcon className="h-6 w-6" /></button>
                <button onClick={onLogout} title={t.logout} className="hover:text-gray-200 transition-colors"><LogoutIcon className="h-6 w-6" /></button>
            </div>
            {/* Mobile Menu */}
            <div className="md:hidden">
                <div className="relative" ref={menuRef}>
                    <button onClick={() => setIsMenuOpen(prev => !prev)} className="p-1 rounded-full hover:bg-white/20">
                        <MoreVertIcon className="h-6 w-6"/>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 text-black ring-1 ring-black ring-opacity-5">
                            <div className="px-4 py-2">
                                <label htmlFor="lang-select-mobile" className="text-sm text-gray-500">Language</label>
                                <select id="lang-select-mobile" value={language} onChange={(e) => { onLanguageChange(e.target.value); setIsMenuOpen(false); }} className="w-full bg-gray-50 p-2 mt-1 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                    {SUPPORTED_LANGUAGES.map(lang => (
                                        <option key={lang.code} value={lang.code} className="text-black">{lang.nativeName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button onClick={() => { setIsSupportModalOpen(true); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                               <LifebuoyIcon className="w-5 h-5 text-gray-500" />
                               <span>{t.support}</span>
                            </button>
                            <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <LogoutIcon className="w-5 h-5 text-gray-500" />
                                <span>{t.logout}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-lg bg-white/50">
          {messages.map((msg) => <MessageBubble key={msg.id} msg={msg} onSpeak={handleSpeak} isSpeaking={currentlySpeaking === msg.id} />)}
          {isLoading && <LoadingBubble />}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="mt-4">
          <form onSubmit={handleSend} className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-lg border border-gray-200">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.inputPlaceholder} className="flex-1 p-2 bg-transparent focus:outline-none" aria-label="Chat input" />
            <button type="button" onClick={handleMicClick} disabled={isLoading} className={`p-3 rounded-full transition-colors ${isListening ? 'text-red-500' : 'text-gray-500 hover:text-teal-600'}`} aria-label="Use microphone">
              <MicIcon className={`h-6 w-6 ${isListening ? 'animate-pulse' : ''}`} />
            </button>
            <button type="submit" disabled={isLoading || !!error} className="bg-teal-600 hover:bg-teal-700 text-white rounded-full p-3 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors" aria-label={t.sendMessage}>
              <SendIcon className="h-6 w-6" />
            </button>
          </form>
        </div>
      </main>
      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} t={t} />
      {error && <ErrorToast message={error} onClose={() => setError(null)} />}
    </div>
  );
};


// --- CHILD COMPONENTS ---
const MessageBubble: React.FC<{ msg: ChatMessage, onSpeak: (msg: ChatMessage) => void, isSpeaking: boolean }> = ({ msg, onSpeak, isSpeaking }) => {
  const isUser = msg.sender === 'user';
  const rasaDetail = msg.rasa ? RASA_DETAILS[msg.rasa] : RASA_DETAILS[Rasa.None];
  const RasaIcon = rasaDetail.icon;

  return (
    <div className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: rasaDetail.color }} title={`${rasaDetail.name}: ${rasaDetail.description}`} >
          <RasaIcon className="h-6 w-6 text-white" />
        </div>
      )}
      <div className={`group relative max-w-[85%] sm:max-w-md lg:max-w-lg p-3 rounded-2xl shadow-sm ${isUser ? 'bg-teal-600 text-white rounded-br-none' : 'bg-white text-[#4A2E2A] rounded-bl-none border border-gray-200'}`}>
        <p className="whitespace-pre-wrap">{msg.text}</p>
        {!isUser && (
          <button onClick={() => onSpeak(msg)} className={`absolute -bottom-3 -right-3 p-1.5 rounded-full bg-white shadow-md text-gray-500 hover:text-teal-600 opacity-50 group-hover:opacity-100 transition-opacity ${isSpeaking ? 'opacity-100 text-teal-600 animate-pulse' : ''}`} aria-label="Read message aloud">
            <SpeakerIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

const LoadingBubble: React.FC = () => {
  const rasaDetail = RASA_DETAILS[Rasa.Shanta];
  return (
    <div className="flex items-end gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-300" >
        <svg className="h-6 w-6 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <div className="max-w-md lg:max-w-lg p-3 rounded-2xl shadow-sm bg-white rounded-bl-none border border-gray-200">
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

const ErrorToast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="absolute bottom-20 sm:bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-md bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg shadow-lg flex items-start justify-between z-50" role="alert">
    <div className="flex items-center">
      <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-4a1 1 0 011-1h.01a1 1 0 010 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
      <p className="text-sm"><CodeHighlight text={message} /></p>
    </div>
    <button onClick={onClose} aria-label="Close error message" className="ml-4 -mt-1 -mr-1 p-1">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
  </div>
);

const SupportModal: React.FC<{ isOpen: boolean; onClose: () => void; t: (typeof TRANSLATIONS)['en'] }> = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative bg-[#FFF8F0] rounded-2xl shadow-2xl w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-teal-600 hover:text-teal-800">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-serif text-teal-700 text-center mb-6">{t.connectCoach}</h2>
        <div className="space-y-4">
          <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer" className="block text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h3 className="font-semibold text-lg text-[#4A2E2A]">{t.scheduleCall}</h3>
            <p className="text-sm text-gray-600 mt-1">{t.scheduleCallDesc}</p>
          </a>
          <a href="mailto:coach@bandhanmitra.ai?subject=Question%20from%20Bandhan%20Mitra%20Session" className="block text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
            <h3 className="font-semibold text-lg text-[#4A2E2A]">{t.emailQuestion}</h3>
            <p className="text-sm text-gray-600 mt-1">{t.emailQuestionDesc}</p>
          </a>
        </div>
      </div>
    </div>
  );
};


export default App;
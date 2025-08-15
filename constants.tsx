import React from 'react';
import type { RasaDetail } from './types';
import { Rasa } from './types';

// --- LANGUAGE CONFIGURATION ---
// This centralizes all language-specific settings.
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', googleVoice: { languageCode: 'en-US', name: 'en-US-Studio-O' }, speechRecogCode: 'en-US' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', googleVoice: { languageCode: 'hi-IN', name: 'hi-IN-Wavenet-D' }, speechRecogCode: 'hi-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', googleVoice: { languageCode: 'bn-IN', name: 'bn-IN-Wavenet-A' }, speechRecogCode: 'bn-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', googleVoice: { languageCode: 'gu-IN', name: 'gu-IN-Wavenet-A' }, speechRecogCode: 'gu-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', googleVoice: { languageCode: 'kn-IN', name: 'kn-IN-Wavenet-A' }, speechRecogCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', googleVoice: { languageCode: 'ml-IN', name: 'ml-IN-Wavenet-C' }, speechRecogCode: 'ml-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', googleVoice: { languageCode: 'mr-IN', name: 'mr-IN-Wavenet-A' }, speechRecogCode: 'mr-IN' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡିଆ', googleVoice: { languageCode: 'or-IN', name: 'or-IN-Standard-A' }, speechRecogCode: 'or-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', googleVoice: { languageCode: 'ta-IN', name: 'ta-IN-Wavenet-A' }, speechRecogCode: 'ta-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', googleVoice: { languageCode: 'te-IN', name: 'te-IN-Standard-A' }, speechRecogCode: 'te-IN' },
];

// --- VIBRANT & MODERN ICONS ---
const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
);
const SmileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3.5-9c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm7 0c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
);
const HandHeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 9.5c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-5 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm.53 2.03l-.27.27c-1.3 1.3-1.3 3.41 0 4.71l.88.88c.39.39 1.02.39 1.41 0l.27-.27c-1.3-1.3-1.3-3.41 0-4.71l-.88-.88c-.4-.39-1.03-.39-1.41 0zm4.44 0l.88.88c1.3 1.3 1.3 3.41 0 4.71l-.27.27c.39.39 1.02.39 1.41 0l.88-.88c1.3-1.3 1.3-3.41 0-4.71l-.27-.27c-.39-.39-1.02-.39-1.41 0l-.88.88c-1.3 1.3-1.3 3.41 0 4.71zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
);
const FlameIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.41 4.41C12.7 3.7 11.53 3.24 10.02 3.24c-2.3 0-4.18 1.83-4.25 4.12-.02.62.25 1.21.71 1.63.4.36.93.58 1.52.58.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5c-.01 0-.02 0-.02 0-.28 0-.5-.22-.5-.5 0-.28.22-.5.5-.5.01 0 .01 0 .02 0 1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5c-1.92 0-3.6-1.51-4.04-3.41C2.53 10.04 2 11.45 2 13c0 2.76 2.24 5 5 5 2.28 0 4.23-1.53 4.82-3.64.44-1.59 2.1-2.65 3.86-2.15 1.55.44 2.32 2.2 1.88 3.75-.43 1.54.59 3.04 2.17 3.04H22v-2h-1.25c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5H22V9h-1.25c-1.1 0-2-.9-2-2s.9-2 2-2H22V3h-2.17c-2.29 0-4.45.88-6.14 2.58l-1.28-1.17z"/></svg>
);
const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
);
const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
);
const MehIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8.5 11.5c.83 0 1.5-.67 1.5-1.5S9.33 8.5 8.5 8.5 7 9.17 7 10s.67 1.5 1.5 1.5zm7 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM8 14h8v2H8z"/></svg>
);
const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 10.5h-3.07l-1.62-3.48-1.62 3.48H12.62l-1.62 3.48 1.62 3.48H15.7l1.62 3.48 1.62-3.48H22v-3.48zM12 2l-2.09 4.5L5.4 2 2 6.5 6.5 11.02 2 15.5l3.4 4.5L9.92 15.5 12 22l2.08-4.5 4.52 4.5 3.4-4.5-4.5-4.5L22 6.5 18.6 2 14.08 6.5z"/></svg>
);
const LotusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14h-1c-1.38 0-2.5-1.12-2.5-2.5S8.12 11 9.5 11h1c.28 0 .5.22.5.5s-.22.5-.5.5h-1c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h1c.28 0 .5.22.5.5s-.22.5-.5.5zm4.05-5.6c-.4-.25-.86-.4-1.35-.4-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.49 0 .95-.15 1.35-.4.33-.21.75-.02.75.37v.53c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-3c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.53c0 .39-.42.58-.75.37z"/></svg>
);

export const RASA_DETAILS: Record<Rasa, RasaDetail> = {
  [Rasa.Shringar]: { name: Rasa.Shringar, description: 'Love', color: '#EF4444', icon: HeartIcon },
  [Rasa.Hasya]: { name: Rasa.Hasya, description: 'Joy/Humor', color: '#F59E0B', icon: SmileIcon },
  [Rasa.Karuna]: { name: Rasa.Karuna, description: 'Compassion', color: '#3B82F6', icon: HandHeartIcon },
  [Rasa.Raudra]: { name: Rasa.Raudra, description: 'Anger', color: '#B91C1C', icon: FlameIcon },
  [Rasa.Vira]: { name: Rasa.Vira, description: 'Courage', color: '#F97316', icon: ShieldIcon },
  [Rasa.Bhayanaka]: { name: Rasa.Bhayanaka, description: 'Fear', color: '#8B5CF6', icon: EyeIcon },
  [Rasa.Bibhatsa]: { name: Rasa.Bibhatsa, description: 'Disgust', color: '#64748B', icon: MehIcon },
  [Rasa.Adbhuta]: { name: Rasa.Adbhuta, description: 'Wonder', color: '#14B8A6', icon: SparklesIcon },
  [Rasa.Shanta]: { name: Rasa.Shanta, description: 'Peace', color: '#10B981', icon: LotusIcon },
  [Rasa.None]: { name: Rasa.None, description: 'Neutral', color: '#A0AEC0', icon: () => null },
};

export const TRANSLATIONS = {
  en: {
    welcome: "Namaste. It's a safe space here to explore your thoughts and feelings. I'm here to listen without judgment. Please, share what is on your mind, and we can walk this path of reflection together.",
    title: "Bandhan Mitra",
    subtitle: "Sanskriti Se Samadhan - Solutions Through Culture",
    inputPlaceholder: "Share your thoughts...",
    sendMessage: "Send message",
    errorApiKey: "Configuration Error: The API key is missing. Please set the API_KEY environment variable.",
    errorPermission: "Failed to call the Gemini API: Permission denied. Please ensure your API key is correct and has the necessary permissions.",
    errorUnexpected: "An unexpected error occurred. Please try again.",
    errorUnknown: "An unknown error occurred.",
    errorConnection: "I apologize, it seems there was a momentary interruption in our connection. Please take a moment, and then we can try again.",
    loginTitle: "Welcome to Your Sacred Space",
    loginSubtitle: "Enter your name to begin your personal journey of reflection.",
    loginPlaceholder: "Your Name",
    loginButton: "Begin Journey",
    logout: "Logout",
    speechNotSupported: "Speech recognition is not supported in this browser.",
    ttsNotSupported: "Text-to-speech is not supported in this browser.",
    ttsError: "Could not play audio. Please try again.",
    support: "Support",
    connectCoach: "Connect with a Coach",
    scheduleCall: "Schedule a Live Call",
    scheduleCallDesc: "Book a confidential, one-on-one session with a professional coach.",
    emailQuestion: "Email your Question",
    emailQuestionDesc: "Send your question directly to our support team via email."
  },
  hi: {
    welcome: "नमस्ते। अपने विचारों और भावनाओं को तलाशने के लिए यह एक सुरक्षित स्थान है। मैं बिना किसी निर्णय के सुनने के लिए यहां हूं। कृपया, जो आपके मन में है उसे साझा करें, और हम साथ मिलकर इस चिंतन के मार्ग पर चल सकते हैं।",
    title: "बंधन मित्र",
    subtitle: "संस्कृति से समाधान",
    inputPlaceholder: "अपने विचार साझा करें...",
    sendMessage: "संदेश भेजें",
    errorApiKey: "कॉन्फ़िगरेशन त्रुटि: API कुंजी गुम है। कृपया API_KEY पर्यावरण चर सेट करें।",
    errorPermission: "जेमिनी एपीआई को कॉल करने में विफल: अनुमति अस्वीकृत। कृपया सुनिश्चित करें कि आपकी एपीआई कुंजी सही है और उसके पास आवश्यक अनुमतियाँ हैं।",
    errorUnexpected: "एक अप्रत्याशित त्रुटि हुई। कृपया पुन: प्रयास करें।",
    errorUnknown: "एक अज्ञात त्रुटि हुई।",
    errorConnection: "मैं माफी चाहता हूं, ऐसा लगता है कि हमारे संबंध में क्षणिक रुकावट आई है। कृपया थोड़ा समय लें, और फिर हम फिर से प्रयास कर सकते हैं।",
    loginTitle: "आपके पवित्र स्थान में आपका स्वागत है",
    loginSubtitle: "चिंतन की अपनी व्यक्तिगत यात्रा शुरू करने के लिए अपना नाम दर्ज करें।",
    loginPlaceholder: "आपका नाम",
    loginButton: "यात्रा शुरू करें",
    logout: "लॉग आउट",
    speechNotSupported: "इस ब्राउज़र में वाक् पहचान समर्थित नहीं है।",
    ttsNotSupported: "इस ब्राउज़र में टेक्स्ट-टू-स्पीच समर्थित नहीं है।",
    ttsError: "ऑडियो चलाने में असमर्थ। कृपया पुन: प्रयास करें।",
    support: "सहायता",
    connectCoach: "कोच से जुड़ें",
    scheduleCall: "लाइव कॉल शेड्यूल करें",
    scheduleCallDesc: "एक पेशेवर कोच के साथ एक गोपनीय, आमने-सामने सत्र बुक करें।",
    emailQuestion: "अपना प्रश्न ईमेल करें",
    emailQuestionDesc: "अपना प्रश्न सीधे हमारी सहायता टीम को ईमेल के माध्यम से भेजें।"
  },
  bn: { // Bengali
    welcome: "নমস্কার। আপনার চিন্তা ও অনুভূতি অন্বেষণ করার জন্য এটি একটি নিরাপদ স্থান। আমি কোনো বিচার ছাড়াই শোনার জন্য এখানে আছি। দয়া করে, আপনার মনে যা আছে তা শেয়ার করুন, এবং আমরা একসাথে এই প্রতিফলনের পথে চলতে পারি।",
    title: "বন্ধন মিত্র",
    subtitle: "সংস্কৃতি থেকে সমাধান",
    inputPlaceholder: "আপনার চিন্তা শেয়ার করুন...",
    sendMessage: "বার্তা পাঠান",
    errorApiKey: "কনফিগারেশন ত্রুটি: API কী অনুপস্থিত। অনুগ্রহ করে API_KEY এনভায়রনমেন্ট ভেরিয়েবল সেট করুন।",
    errorPermission: "Gemini API কল করতে ব্যর্থ: অনুমতি প্রত্যাখ্যান করা হয়েছে। অনুগ্রহ করে নিশ্চিত করুন যে আপনার API কী সঠিক এবং প্রয়োজনীয় অনুমতি রয়েছে।",
    errorUnexpected: "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
    errorUnknown: "একটি অজানা ত্রুটি ঘটেছে।",
    errorConnection: "আমি দুঃখিত, মনে হচ্ছে আমাদের সংযোগে একটি ক্ষণস্থায়ী বাধা ছিল। অনুগ্রহ করে একটু সময় নিন, এবং তারপর আমরা আবার চেষ্টা করতে পারি।",
    loginTitle: "আপনার পবিত্র স্থানে স্বাগতম",
    loginSubtitle: "আপনার ব্যক্তিগত প্রতিফলনের যাত্রা শুরু করতে আপনার নাম লিখুন।",
    loginPlaceholder: "আপনার নাম",
    loginButton: "যাত্রা শুরু করুন",
    logout: "লগআউট",
    speechNotSupported: "এই ব্রাউজারে স্পিচ রিকগনিশন সমর্থিত নয়।",
    ttsNotSupported: "এই ব্রাউজারে টেক্সট-টু-স্পিচ সমর্থিত নয়।",
    ttsError: "অডিও প্লেব্যাক করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    support: "সহায়তা",
    connectCoach: "একজন কোচের সাথে সংযোগ করুন",
    scheduleCall: "একটি লাইভ কল সময়সূচী করুন",
    scheduleCallDesc: "একজন পেশাদার কোচের সাথে একটি গোপনীয়, একের পর এক সেশন বুক করুন।",
    emailQuestion: "আপনার প্রশ্ন ইমেল করুন",
    emailQuestionDesc: "আপনার প্রশ্ন সরাসরি আমাদের সহায়তা দলকে ইমেলের মাধ্যমে পাঠান।"
  },
  gu: { // Gujarati
    welcome: "નમસ્તે। તમારા વિચારો અને ભાવનાઓનું અન્વેષણ કરવા માટે આ એક સુરક્ષિત જગ્યા છે। હું અહીં કોઈપણ નિર્ણય વિના સાંભળવા માટે છું। કૃપા કરીને, તમારા મનમાં જે છે તે શેર કરો, અને આપણે સાથે મળીને આ પ્રતિબિંબના માર્ગ પર ચાલી શકીએ છીએ।",
    title: "બંધન મિત્ર",
    subtitle: "સંસ્કૃતિથી સમાધાન",
    inputPlaceholder: "તમારા વિચારો શેર કરો...",
    sendMessage: "સંદેશ મોકલો",
    errorApiKey: "રૂપરેખાંકન ભૂલ: API કી ખૂટે છે। કૃપા કરીને API_KEY પર્યાવરણ ચલ સેટ કરો।",
    errorPermission: "જેમિની API ને કૉલ કરવામાં નિષ્ફળ: પરવાનગી નકારી। કૃપા કરીને ખાત્રી કરો કે તમારી API કી સાચી છે અને જરૂરી પરવાનગીઓ ધરાવે છે।",
    errorUnexpected: "એક અનપેક્ષિત ભૂલ આવી। કૃપા કરીને ફરી પ્રયાસ કરો।",
    errorUnknown: "એક અજાણી ભૂલ આવી।",
    errorConnection: "હું માફી માંગુ છું, એવું લાગે છે કે અમારા જોડાણમાં ક્ષણિક વિક્ષેપ હતો। કૃપા કરીને થોડો સમય લો, અને પછી આપણે ફરી પ્રયાસ કરી શકીએ છીએ।",
    loginTitle: "તમારા પવિત્ર સ્થાન પર આપનું સ્વાગત છે",
    loginSubtitle: "તમારી વ્યક્તિગત પ્રતિબિંબની યાત્રા શરૂ કરવા માટે તમારું નામ દાખલ કરો।",
    loginPlaceholder: "તમારું નામ",
    loginButton: "યાત્રા શરૂ કરો",
    logout: "લૉગઆઉટ",
    speechNotSupported: "આ બ્રાઉઝરમાં વાણી ઓળખ સપોર્ટેડ નથી।",
    ttsNotSupported: "આ બ્રાઉઝરમાં ટેક્સ્ટ-ટુ-સ્પીચ સપોર્ટેડ નથી।",
    ttsError: "ઑડિયો પ્લે કરી શકાયો નથી। કૃપા કરીને ફરી પ્રયાસ કરો।",
    support: "આધાર",
    connectCoach: "કોચ સાથે જોડાઓ",
    scheduleCall: "લાઇવ કૉલ શેડ્યૂલ કરો",
    scheduleCallDesc: "એક વ્યાવસાયિક કોચ સાથે ગોપનીય, એક-થી-એક સત્ર બુક કરો।",
    emailQuestion: "તમારો પ્રશ્ન ઇમેઇલ કરો",
    emailQuestionDesc: "તમારો પ્રશ્ન સીધો અમારી સપોર્ટ ટીમને ઇમેઇલ દ્વારા મોકલો।"
  },
  kn: { // Kannada
    welcome: "ನಮಸ್ಕಾರ। ನಿಮ್ಮ ಆಲೋಚನೆಗಳನ್ನು ಮತ್ತು ಭಾವನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ಇದು ಸುರಕ್ಷಿತ ಸ್ಥಳವಾಗಿದೆ। ನಾನು ಯಾವುದೇ ತೀರ್ಪು ಇಲ್ಲದೆ ಕೇಳಲು ಇಲ್ಲಿದ್ದೇನೆ। ದಯವಿಟ್ಟು, ನಿಮ್ಮ ಮನಸ್ಸಿನಲ್ಲಿರುವುದನ್ನು ಹಂಚಿಕೊಳ್ಳಿ, ಮತ್ತು ನಾವು ಈ ಪ್ರತಿಬಿಂಬದ ಹಾದಿಯಲ್ಲಿ ಒಟ್ಟಿಗೆ ನಡೆಯಬಹುದು।",
    title: "ಬಂಧನ ಮಿತ್ರ",
    subtitle: "ಸಂಸ್ಕೃತಿಯಿಂದ ಪರಿಹಾರಗಳು",
    inputPlaceholder: "ನಿಮ್ಮ ಆಲೋಚನೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ...",
    sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    errorApiKey: "ಸಂರಚನಾ ದೋಷ: API ಕೀ ಕಾಣೆಯಾಗಿದೆ। ದಯವಿಟ್ಟು API_KEY ಪರಿಸರ ವೇರಿಯಬಲ್ ಅನ್ನು ಹೊಂದಿಸಿ।",
    errorPermission: "ಜೆಮಿನಿ API ಗೆ ಕರೆ ಮಾಡಲು ವಿಫಲವಾಗಿದೆ: ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ। ದಯವಿಟ್ಟು ನಿಮ್ಮ API ಕೀ ಸರಿಯಾಗಿದೆಯೇ ಮತ್ತು ಅಗತ್ಯ ಅನುಮತಿಗಳನ್ನು ಹೊಂದಿದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ।",
    errorUnexpected: "ಒಂದು ಅನಿರೀಕ್ಷಿತ ದೋಷ ಸಂಭವಿಸಿದೆ। ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ।",
    errorUnknown: "ಒಂದು ಅಜ್ಞಾತ ದೋಷ ಸಂಭವಿಸಿದೆ।",
    errorConnection: "ಕ್ಷಮಿಸಿ, ನಮ್ಮ ಸಂಪರ್ಕದಲ್ಲಿ ಕ್ಷಣಿಕ ಅಡಚಣೆ ಉಂಟಾದಂತೆ ತೋರುತ್ತದೆ। ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯ ತೆಗೆದುಕೊಳ್ಳಿ, ಮತ್ತು ನಂತರ ನಾವು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಬಹುದು।",
    loginTitle: "ನಿಮ್ಮ ಪವಿತ್ರ ಸ್ಥಳಕ್ಕೆ ಸ್ವಾಗತ",
    loginSubtitle: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಪ್ರತಿಬಿಂಬದ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಲು ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ।",
    loginPlaceholder: "ನಿಮ್ಮ ಹೆಸರು",
    loginButton: "ಪ್ರಯಾಣ ಪ್ರಾರಂಭಿಸಿ",
    logout: "ಲಾಗ್ ಔಟ್",
    speechNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮಾತಿನ ಗುರುತಿಸುವಿಕೆ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ।",
    ttsNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಪಠ್ಯದಿಂದ ಭಾಷಣಕ್ಕೆ ಬೆಂಬಲವಿಲ್ಲ।",
    ttsError: "ಆಡಿಯೋ ಪ್ಲೇ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ। ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ।",
    support: "ಬೆಂಬಲ",
    connectCoach: "ತರಬೇತುದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ",
    scheduleCall: "ಲೈವ್ ಕರೆಯನ್ನು ನಿಗದಿಪಡಿಸಿ",
    scheduleCallDesc: "ವೃತ್ತಿಪರ ತರಬೇತುದಾರರೊಂದಿಗೆ ಗೌಪ್ಯ, ಒಬ್ಬರಿಗೊಬ್ಬರು ಅಧಿವೇಶನವನ್ನು ಕಾಯ್ದಿರಿಸಿ।",
    emailQuestion: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಮೇಲ್ ಮಾಡಿ",
    emailQuestionDesc: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ನೇರವಾಗಿ ನಮ್ಮ ಬೆಂಬಲ ತಂಡಕ್ಕೆ ಇಮೇಲ್ ಮೂಲಕ ಕಳುಹಿಸಿ।"
  },
  ml: { // Malayalam
    welcome: "നമസ്കാരം। നിങ്ങളുടെ ചിന്തകളും വികാരങ്ങളും പര്യവേക്ഷണം ചെയ്യാനുള്ള സുരക്ഷിതമായ ഒരിടമാണിത്। ഒരു വിധിയും കൂടാതെ കേൾക്കാൻ ഞാൻ ഇവിടെയുണ്ട്। ദയവായി, നിങ്ങളുടെ മനസ്സിലുള്ളത് പങ്കുവെക്കുക, നമുക്ക് ഈ പ്രതിഫലനത്തിന്റെ പാതയിൽ ഒരുമിച്ച് നടക്കാം।",
    title: "ബന്ധൻ മിത്ര",
    subtitle: "സംസ്കാരത്തിലൂടെ പരിഹാരങ്ങൾ",
    inputPlaceholder: "നിങ്ങളുടെ ചിന്തകൾ പങ്കുവെക്കൂ...",
    sendMessage: "സന്ദേശം അയക്കൂ",
    errorApiKey: "കോൺഫിഗറേഷൻ പിശക്: API കീ കാണുന്നില്ല। ദയവായി API_KEY എൻവയോൺമെന്റ് വേരിയബിൾ സജ്ജമാക്കുക।",
    errorPermission: "ജെമിനി API വിളിക്കുന്നതിൽ പരാജയപ്പെട്ടു: അനുമതി നിഷേധിച്ചു। നിങ്ങളുടെ API കീ ശരിയാണെന്നും ആവശ്യമായ അനുമതികൾ ഉണ്ടെന്നും ഉറപ്പാക്കുക।",
    errorUnexpected: "അപ്രതീക്ഷിതമായ ഒരു പിശക് സംഭവിച്ചു। ദയവായി വീണ്ടും ശ്രമിക്കുക।",
    errorUnknown: "അജ്ഞാതമായ ഒരു പിശക് സംഭവിച്ചു।",
    errorConnection: "ക്ഷമിക്കണം, ഞങ്ങളുടെ കണക്ഷനിൽ ഒരു നിമിഷത്തേക്ക് ഒരു തടസ്സം നേരിട്ടതായി തോന്നുന്നു। ദയവായി കുറച്ച് സമയമെടുക്കുക, തുടർന്ന് ഞങ്ങൾക്ക് വീണ്ടും ശ്രമിക്കാം।",
    loginTitle: "നിങ്ങളുടെ പുണ്യസ്ഥലത്തേക്ക് സ്വാഗതം",
    loginSubtitle: "പ്രതിഫലനത്തിന്റെ നിങ്ങളുടെ വ്യക്തിപരമായ യാത്ര ആരംഭിക്കാൻ നിങ്ങളുടെ പേര് നൽകുക।",
    loginPlaceholder: "നിങ്ങളുടെ പേര്",
    loginButton: "യാത്ര ആരംഭിക്കുക",
    logout: "ലോഗ് ഔട്ട്",
    speechNotSupported: "ഈ ബ്രൗസറിൽ സംഭാഷണം തിരിച്ചറിയൽ പിന്തുണയ്ക്കുന്നില്ല।",
    ttsNotSupported: "ഈ ബ്രൗസറിൽ ടെക്സ്റ്റ്-ടു-സ്പീച്ച് പിന്തുണയ്ക്കുന്നില്ല।",
    ttsError: "ഓഡിയോ പ്ലേ ചെയ്യാൻ കഴിഞ്ഞില്ല। ദയവായി വീണ്ടും ശ്രമിക്കുക।",
    support: "പിന്തുണ",
    connectCoach: "ഒരു പരിശീലകനുമായി ബന്ധപ്പെടുക",
    scheduleCall: "ഒരു ലൈവ് കോൾ ഷെഡ്യൂൾ ചെയ്യുക",
    scheduleCallDesc: "ഒരു പ്രൊഫഷണൽ പരിശീലകനുമായി രഹസ്യാത്മകവും ഒറ്റയ്ക്കൊറ്റയ്ക്കുള്ളതുമായ ഒരു സെഷൻ ബുക്ക് ചെയ്യുക।",
    emailQuestion: "നിങ്ങളുടെ ചോദ്യം ഇമെയിൽ ചെയ്യുക",
    emailQuestionDesc: "നിങ്ങളുടെ ചോദ്യം ഞങ്ങളുടെ പിന്തുണാ ടീമിന് ഇമെയിൽ വഴി നേരിട്ട് അയയ്ക്കുക।"
  },
  mr: { // Marathi
    welcome: "नमस्ते। आपले विचार आणि भावना जाणून घेण्यासाठी ही एक सुरक्षित जागा आहे। मी येथे कोणताही निर्णय न घेता ऐकण्यासाठी आहे। कृपया, तुमच्या मनात जे आहे ते सांगा, आणि आपण एकत्र या चिंतनाच्या मार्गावर चालू शकतो।",
    title: "बंधन मित्र",
    subtitle: "संस्कृतीतून समाधान",
    inputPlaceholder: "आपले विचार सांगा...",
    sendMessage: "संदेश पाठवा",
    errorApiKey: "कॉन्फिगरेशन त्रुटी: API की गहाळ आहे। कृपया API_KEY पर्यावरण व्हेरिएबल सेट करा।",
    errorPermission: "जेमिनी API ला कॉल करण्यात अयशस्वी: परवानगी नाकारली। कृपया खात्री करा की तुमची API की योग्य आहे आणि तिच्याकडे आवश्यक परवानग्या आहेत।",
    errorUnexpected: "एक अनपेक्षित त्रुटी आली। कृपया पुन्हा प्रयत्न करा।",
    errorUnknown: "एक अज्ञात त्रुटी आली।",
    errorConnection: "मला माफ करा, असे दिसते की आमच्या कनेक्शनमध्ये क्षणिक व्यत्यय आला होता। कृपया थोडा वेळ घ्या, आणि मग आपण पुन्हा प्रयत्न करू शकतो।",
    loginTitle: "तुमच्या पवित्र जागेत स्वागत आहे",
    loginSubtitle: "तुमचा वैयक्तिक चिंतनाचा प्रवास सुरू करण्यासाठी तुमचे नाव प्रविष्ट करा।",
    loginPlaceholder: "तुमचे नाव",
    loginButton: "प्रवास सुरू करा",
    logout: "लॉगआउट",
    speechNotSupported: "या ब्राउझरमध्ये भाषण ओळख समर्थित नाही।",
    ttsNotSupported: "या ब्राउझरमध्ये टेक्स्ट-टू-स्पीच समर्थित नाही।",
    ttsError: "ऑडिओ प्ले करू शकलो नाही। कृपया पुन्हा प्रयत्न करा।",
    support: "आधार",
    connectCoach: "कोचशी संपर्क साधा",
    scheduleCall: "लाइव्ह कॉल शेड्यूल करा",
    scheduleCallDesc: "एका व्यावसायिक कोचसोबत गोपनीय, एक-एक सत्र बुक करा।",
    emailQuestion: "तुमचा प्रश्न ईमेल करा",
    emailQuestionDesc: "तुमचा प्रश्न थेट आमच्या समर्थन टीमला ईमेलद्वारे पाठवा।"
  },
  or: { // Odia
    welcome: "ନମସ୍କାର। ଆପଣଙ୍କ ଚିନ୍ତା ଏବଂ ଭାବନାକୁ ଅନୁସନ୍ଧାନ କରିବା ପାଇଁ ଏହା ଏକ ସୁରକ୍ଷିତ ସ୍ଥାନ। ମୁଁ ଏଠାରେ ବିନା କୌଣସି ବିଚାରରେ ଶୁଣିବା ପାଇଁ ଅଛି। ଦୟାକରି, ଆପଣଙ୍କ ମନରେ ଯାହା ଅଛି ତାହା ସେୟାର କରନ୍ତୁ, ଏବଂ ଆମେ ଏକାଠି ଏହି ପ୍ରତିଫଳନର ପଥରେ ଚାଲିପାରିବା।",
    title: "ବନ୍ଧନ ମିତ୍ର",
    subtitle: "ସଂସ୍କୃତିରୁ ସମାଧାନ",
    inputPlaceholder: "ଆପଣଙ୍କର ਵਿਚାର ସେୟାର କରନ୍ତୁ...",
    sendMessage: "ସନ୍ଦେଶ ପଠାନ୍ତୁ",
    errorApiKey: "କନଫିଗରେସନ୍ ତ୍ରୁଟି: API କୀ ମିଳୁନାହିଁ। ଦୟାକରି API_KEY ପରିବେଶ ଭେରିଏବଲ୍ ସେଟ୍ କରନ୍ତୁ।",
    errorPermission: "ଜେମିନି API କୁ କଲ୍ କରିବାରେ ବିଫଳ: ଅନୁମତି ମନା କରାଗଲା। ଦୟାକରି ନିଶ୍ଚିତ କରନ୍ତୁ ଯେ ଆପଣଙ୍କର API କୀ ସଠିକ୍ ଅଟେ ଏବଂ ଆବଶ୍ୟକୀୟ ଅନୁମତି ଅଛି।",
    errorUnexpected: "ଏକ ଅପ୍ରତ୍ୟାଶିତ ତ୍ରୁଟି ଘଟିଲା। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
    errorUnknown: "ଏକ ଅଜ୍ଞାତ ତ୍ରୁଟି ଘଟିଲା।",
    errorConnection: "ମୁଁ କ୍ଷମା ମାଗୁଛି, ଏପରି ଲାଗୁଛି ଯେ ଆମର ସଂଯୋଗରେ ଏକ କ୍ଷଣିକ ବାଧା ଆସିଥିଲା। ଦୟାକରି କିଛି ସମୟ ନିଅନ୍ତୁ, ଏବଂ ତାପରେ ଆମେ ପୁଣି ଚେଷ୍ଟା କରିପାରିବା।",
    loginTitle: "ଆପଣଙ୍କ ପବିତ୍ର ସ୍ଥାନକୁ ସ୍ୱାଗତ",
    loginSubtitle: "ଆପଣଙ୍କର ବ୍ୟକ୍ତିଗତ ପ୍ରତିଫଳନର ଯାତ୍ରା ଆରମ୍ଭ କରିବାକୁ ଆପଣଙ୍କ ନାମ ପ୍ରବେଶ କରନ୍ତୁ।",
    loginPlaceholder: "ଆପଣଙ୍କ ନାମ",
    loginButton: "ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ",
    logout: "ଲଗଆଉଟ୍",
    speechNotSupported: "ଏହି ବ୍ରାଉଜରରେ ବାକ୍ୟ ଚିହ୍ନଟ ସମର୍ଥିତ ନୁହେଁ।",
    ttsNotSupported: "ଏହି ବ୍ରାଉଜରରେ ଟେକ୍ସଟ୍-ଟୁ-ସ୍ପିଚ୍ ସମର୍ଥିତ ନୁହେଁ।",
    ttsError: "ଅଡିଓ ପ୍ଲେ କରିବାରେ ସକ୍ଷମ ନୁହେଁ। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
    support: "ସମର୍ଥନ",
    connectCoach: "ଜଣେ କୋଚ୍ ସହିତ ସଂଯୋଗ କରନ୍ତୁ",
    scheduleCall: "ଏକ ଲାଇଭ୍ କଲ୍ ସମୟସୂଚୀ କରନ୍ତୁ",
    scheduleCallDesc: "ଜଣେ ପେଶାଦାର କୋଚ୍ ସହିତ ଏକ ଗୋପନୀୟ, ଏକ-ଏକ ଅଧିବେଶନ ବୁକ୍ କରନ୍ତୁ।",
    emailQuestion: "ଆପଣଙ୍କ ପ୍ରଶ୍ନ ଇମେଲ୍ କରନ୍ତୁ",
    emailQuestionDesc: "ଆପଣଙ୍କ ପ୍ରଶ୍ନ ସିଧାସଳଖ ଆମର ସମର୍ଥନ ଦଳକୁ ଇମେଲ୍ ମାଧ୍ୟମରେ ପଠାନ୍ତୁ।"
  },
  ta: { // Tamil
    welcome: "வணக்கம்। உங்கள் எண்ணங்களையும் உணர்வுகளையும் ஆராய்வதற்கான பாதுகாப்பான இடம் இது। நான் எந்தவித தீர்ப்பும் இன்றி கேட்க இங்கே இருக்கிறேன்। தயவுசெய்து, உங்கள் மனதில் உள்ளதை பகிர்ந்து கொள்ளுங்கள், நாம் இந்த சிந்தனைப் பாதையில் ஒன்றாக நடக்கலாம்।",
    title: "பந்தன் மித்ரா",
    subtitle: "கலாச்சாரத்தின் மூலம் தீர்வுகள்",
    inputPlaceholder: "உங்கள் எண்ணங்களைப் பகிரவும்...",
    sendMessage: "செய்தியை அனுப்பு",
    errorApiKey: "உள்ளமைவு பிழை: API விசை இல்லை। தயவுசெய்து API_KEY சூழல் மாறியை அமைக்கவும்।",
    errorPermission: "ஜெமினி API-ஐ அழைப்பதில் தோல்வி: அனுமதி மறுக்கப்பட்டது। உங்கள் API விசை சரியானது மற்றும் தேவையான அனுமதிகளைக் கொண்டுள்ளது என்பதை உறுதிப்படுத்தவும்।",
    errorUnexpected: "எதிர்பாராத பிழை ஏற்பட்டது। மீண்டும் முயற்சிக்கவும்।",
    errorUnknown: "அறியப்படாத பிழை ஏற்பட்டது।",
    errorConnection: "மன்னிக்கவும், எங்கள் இணைப்பில் ஒரு கண நேர குறுக்கீடு ஏற்பட்டதாகத் தெரிகிறது। தயவுசெய்து ஒரு கணம் காத்திருந்து, பின்னர் மீண்டும் முயற்சி செய்யலாம்।",
    loginTitle: "உங்கள் புனித இடத்திற்கு வரவேற்கிறோம்",
    loginSubtitle: "உங்கள் தனிப்பட்ட பிரதிபலிப்பு பயணத்தைத் தொடங்க உங்கள் பெயரை உள்ளிடவும்।",
    loginPlaceholder: "உங்கள் பெயர்",
    loginButton: "பயணத்தைத் தொடங்குங்கள்",
    logout: "வெளியேறு",
    speechNotSupported: "இந்த உலாவியில் பேச்சு அங்கீகாரம் ஆதரிக்கப்படவில்லை।",
    ttsNotSupported: "இந்த உலாவியில் உரையிலிருந்து பேச்சு ஆதரிக்கப்படவில்லை।",
    ttsError: "ஆடியோவை இயக்க முடியவில்லை। ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ।",
    support: "ஆதரவு",
    connectCoach: "ஒரு பயிற்சியாளருடன் இணையுங்கள்",
    scheduleCall: "ஒரு நேரடி அழைப்பைத் திட்டமிடுங்கள்",
    scheduleCallDesc: "ஒரு தொழில்முறை பயிற்சியாளருடன் ஒரு ரகசியமான, ஒருவருக்கொருவர் அமர்வை பதிவு செய்யுங்கள்।",
    emailQuestion: "உங்கள் கேள்வியை மின்னஞ்சல் செய்யவும்",
    emailQuestionDesc: "உங்கள் கேள்வியை எங்கள் ஆதரவு குழுவிற்கு நேரடியாக மின்னஞ்சல் வழியாக அனுப்பவும்।"
  },
  te: { // Telugu
    welcome: "నమస్కారం। మీ ఆలోచనలను మరియు భావాలను అన్వేషించడానికి ఇది ఒక సురక్షితమైన ప్రదేశం। నేను ఎటువంటి తీర్పు లేకుండా వినడానికి ఇక్కడ ఉన్నాను। దయచేసి, మీ మనస్సులో ఉన్నదాన్ని పంచుకోండి, మరియు మనం ఈ ప్రతిబింబ మార్గంలో కలిసి నడవవచ్చు।",
    title: "బంధన్ మిత్ర",
    subtitle: "సంస్కృతి నుండి పరిష్కారాలు",
    inputPlaceholder: "మీ ఆలోచనలను పంచుకోండి...",
    sendMessage: "సందేశం పంపండి",
    errorApiKey: "ఆకృతీకరణ లోపం: API కీ లేదు। దయచేసి API_KEY పర్యావరణ వేరియబుల్‌ను సెట్ చేయండి।",
    errorPermission: "జెమిని APIకి కాల్ చేయడంలో విఫలమైంది: అనుమతి నిరాకరించబడింది। దయచేసి మీ API కీ సరైనదని మరియు అవసరమైన అనుమతులను కలిగి ఉందని నిర్ధారించుకోండి।",
    errorUnexpected: "ఒక ఊహించని లోపం సంభవించింది। దయచేసి మళ్లీ ప్రయత్నించండి।",
    errorUnknown: "తెలియని లోపం సంభవించింది।",
    errorConnection: "క్షమించండి, మా కనెక్షన్‌లో ఒక క్షణిక అంతరాయం ఏర్పడినట్లుంది। దయచేసి కొంత సమయం తీసుకోండి, ఆపై మనం మళ్లీ ప్రయత్నించవచ్చు।",
    loginTitle: "మీ పవిత్ర స్థలానికి స్వాగతం",
    loginSubtitle: "మీ వ్యక్తిగత ప్రతిబింబ ప్రయాణాన్ని ప్రారంభించడానికి మీ పేరును నమోదు చేయండి।",
    loginPlaceholder: "మీ పేరు",
    loginButton: "ప్రయాణం ప్రారంభించండి",
    logout: "లాగ్ అవుట్",
    speechNotSupported: "ఈ బ్రౌజర్‌లో ప్రసంగ గుర్తింపుకు మద్దతు లేదు।",
    ttsNotSupported: "ఈ బ్రౌజర్‌లో టెక్స్ట్-టు-స్పీచ్‌కు మద్దతు లేదు।",
    ttsError: "ఆడియోను ప్లే చేయడం సాధ్యపడలేదు। దయచేసి మళ్లీ ప్రయత్నించండి।",
    support: "మద్దతు",
    connectCoach: "ఒక కోచ్‌తో కనెక్ట్ అవ్వండి",
    scheduleCall: "ఒక ప్రత్యక్ష కాల్‌ను షెడ్యూల్ చేయండి",
    scheduleCallDesc: "ఒక ప్రొఫెషనల్ కోచ్‌తో రహస్య, ఒకరితో ఒకరు సెషన్‌ను బుక్ చేసుకోండి।",
    emailQuestion: "మీ ప్రశ్నను ఇమెయిల్ చేయండి",
    emailQuestionDesc: "మీ ప్రశ్నను మా మద్దతు బృందానికి నేరుగా ఇమెయిల్ ద్వారా పంపండి।"
  }
};
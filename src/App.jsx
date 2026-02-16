import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react';
import {
  Camera, ShoppingBag, Map as MapIcon, User, Heart, Mic, Play, Pause,
  ChevronLeft, Plus, Minus, X, Check, Search, Bell, Settings,
  Share2, ArrowRight, Sparkles, Filter, Home, Navigation, LogOut,
  MapPin, Info, Layers, MessageCircle, Globe, Video, DollarSign, Eye, Box
} from 'lucide-react';
import CartModal from './components/buyer/CartModal';
import DiscoverView from './components/buyer/DiscoverView';
import ProfileView from './components/buyer/ProfileView';
import ArtisanDashboard from './components/artisan/ArtisanDashboard';
import ImageDebugger from './components/ImageDebugger';

/* -------------------------------------------------------------------------- */
/*                                CONSTANTS & DATA                            */
/* -------------------------------------------------------------------------- */

const CATEGORIES = ['All', 'Pottery', 'Textiles', 'Woodwork', 'Jewelry'];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "Royal Blue Pottery Vase",
    price: "₹2,499",
    priceNum: 2499,
    category: "Pottery",
    image: "/product_pottery_vase.png",
    description: "Handcrafted using the traditional blue glaze technique of Jaipur. This vase features intricate floral patterns inspired by the City Palace.",
    audioStory: "This Royal Blue Pottery Vase is a masterpiece of the Jaipur tradition. Crafted by skilled artisans, it uses a unique blue glaze derived from cobalt oxide.",
    artisan: "Ramesh Prajapat",
    location: "Jaipur, Rajasthan",
    materials: "Quartz powder, glass, fuller's earth"
  },
  {
    id: 2,
    title: "Kathputli Pair (King & Queen)",
    price: "₹1,200",
    priceNum: 1200,
    category: "Woodwork",
    image: "/product_kathputli.png",
    description: "Vibrant string puppets representing the legendary love story of Dhola and Maru. Hand-carved from mango wood.",
    audioStory: "Meet the King and Queen of Rajasthani folklore. These Kathputli puppets are more than toys; they are the storytellers of the desert.",
    artisan: "Suresh Bhat",
    location: "Udaipur, Rajasthan",
    materials: "Mango wood, Cotton, Wire"
  },
  {
    id: 3,
    title: "Embroidered Mojari Shoes",
    price: "₹1,850",
    priceNum: 1850,
    category: "Textiles",
    image: "/product_mojari.png",
    description: "Authentic camel leather mojari with intricate golden zari embroidery. Crafted for comfort and elegance.",
    audioStory: "Step into royalty with these embroidered Mojari shoes. Made from ethically sourced leather, each stitch of golden Zari work is applied by hand.",
    artisan: "Geeta Devi",
    location: "Jodhpur, Rajasthan",
    materials: "Leather, Zari thread"
  },
  {
    id: 4,
    title: "Hand-Carved Wooden Jharokha",
    price: "₹3,500",
    priceNum: 3500,
    category: "Woodwork",
    image: "/product_jharokha.png",
    description: "A miniature wooden window frame intricately carved to resemble the architectural marvels of Rajasthani Havelis.",
    audioStory: "Look through the window of history with this hand-carved Jharokha. Inspired by the balconies of the Hawa Mahal, this piece brings architectural grandeur home.",
    artisan: "Mohan Lal",
    location: "Jaisalmer, Rajasthan",
    materials: "Teak Wood"
  },
  {
    id: 5,
    title: "Bandhani Silk Saree",
    price: "₹4,500",
    priceNum: 4500,
    category: "Textiles",
    image: "/product_saree.png",
    description: "Tie-dye masterpiece featuring thousands of tiny knots. The vibrant red and yellow colors symbolize joy.",
    audioStory: "This Bandhani Saree is a labor of love and patience. Each tiny dot pattern is created by tying the fabric with a thread before dyeing.",
    artisan: "Anju Chhipa",
    location: "Bikaner, Rajasthan",
    materials: "Pure Silk"
  }
];

const MOCK_STORIES = [
  {
    id: 1,
    user: "Artisan Ramesh",
    image: "https://images.unsplash.com/photo-1596728035246-13dc8d063738?auto=format&fit=crop&q=80&w=800",
    title: "The Art of Clay",
    description: "Shaping the clay for the new festive collection! #HeritageHasNewHome",
    likes: 124,
    isLive: false
  },
  {
    id: 99,
    user: "Master Weaver Kabir",
    image: "https://images.unsplash.com/photo-1616682703816-3e72186987f4?auto=format&fit=crop&q=80&w=800",
    title: "LIVE AUCTION: Royal Carpet",
    description: "Bidding starts now! A 6-month masterpiece.",
    likes: 1542,
    isLive: true
  },
  {
    id: 2,
    user: "Vartika Designs",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=800",
    title: "Zardozi Magic",
    description: "The fine art of Zardozi embroidery. Patience is key. ✨",
    likes: 210,
    isLive: false
  }
];

const TRANSLATIONS = {
  en: {
    welcome: "Welcome",
    artisanMode: "I am an Artisan",
    buyerMode: "I want to Explore",
    shop: "Shop",
    stories: "Stories",
    map: "Map",
    profile: "Profile",
    searchPlaceholder: "Search artisans, styles...",
    listening: "Listening...",
    live: "LIVE",
    bidNow: "Bid Now",
    addToCart: "Add to Collectibles",
    arView: "View in Room (AR)",
    chatHelp: "Ask Vani",
    voiceSearchConfig: "Try 'Show me Pottery' or 'Textiles'"
  },
  hi: {
    welcome: "स्वागत है",
    artisanMode: "मैं एक कारीगर हूँ",
    buyerMode: "मैं खरीदना चाहता हूँ",
    shop: "दुकान",
    stories: "कहानियां",
    map: "नक्शा",
    profile: "प्रोफ़ाइल",
    searchPlaceholder: "कारीगरों, शैलियों को खोजें...",
    listening: "सुन रहा हूँ...",
    live: "लाइव",
    bidNow: "बोली लगाएं",
    addToCart: "संग्रह में जोड़ें",
    arView: "कमरे में देखें (AR)",
    chatHelp: "वाणी से पूछें",
    voiceSearchConfig: "'मिट्टी के बर्तन' या 'कपड़े' खोजें"
  }
};

/* -------------------------------------------------------------------------- */
/*                                  CONTEXTS                                  */
/* -------------------------------------------------------------------------- */

const LanguageContext = createContext();
const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="animate-[slide-in-right_0.3s_ease-out] bg-slate-900 border border-amber-500/50 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 backdrop-blur-md pointer-events-auto min-w-[200px]">
            {toast.type === 'success' && <Check className="w-5 h-5 text-green-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-amber-500" />}
            {toast.type === 'mic' && <Mic className="w-5 h-5 text-red-500 animate-pulse" />}
            <span className="text-sm font-modern font-medium">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  UI COMPONENTS                             */
/* -------------------------------------------------------------------------- */

const GlobalStyles = () => (
  <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
      .font-heritage { font-family: 'Cinzel', serif; }
      .font-modern { font-family: 'Montserrat', sans-serif; }
    `}</style>
);

// --- HELPER FOR SAFE PARSING (GLOBAL) ---
const safeJSONParse = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (e) {
    console.error(`Error parsing ${key}:`, e);
    return fallback;
  }
};

// --- HAPTIC FEEDBACK ---
const vibrate = (ms = 50) => {
  if (navigator.vibrate) navigator.vibrate(ms);
};

// --- INTELLIGENT CHATBOT ---
const VaniChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Ram Ram! I am Vani. I can tell you about History, Materials, or Prices.", sender: 'bot' }]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const { lang } = useContext(LanguageContext);

  const toggleChat = () => setIsOpen(!isOpen);

  const generateResponse = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('price') || lower.includes('cost') || lower.includes('rupee'))
      return "Our items range from ₹500 to ₹10,000. Each price reflects directly the artisan's time and heritage materials.";
    if (lower.includes('material') || lower.includes('made of') || lower.includes('wood') || lower.includes('clay'))
      return "We use 100% authentic materials: Mewar clay, Mango wood, and Cruelty-free leather sourced locally.";
    if (lower.includes('shipping') || lower.includes('delivery'))
      return "We ship worldwide! Domestic delivery takes 5-7 days.";
    if (lower.includes('who') || lower.includes('artisan') || lower.includes('made by'))
      return "Every item is signed by the master artisan. Check the product details to see their name.";
    if (lower.includes('hello') || lower.includes('hi'))
      return "Namaste! How can I help you explore Udaipur today?";

    return "That's an interesting question about our heritage. I'm still learning, but I can tell you these crafts are centuries old.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput("");

    setTimeout(() => {
      const reply = generateResponse(input);
      setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-24 right-4 z-40 bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 p-3 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-110 transition-transform animate-[float_4s_ease-in-out_infinite]"
      >
        <div className="relative">
          <MessageCircle size={28} />
          <Sparkles size={14} className="absolute -top-1 -right-1 text-white animate-spin-slow" />
        </div>
      </button>

      {isOpen && (
        <div className="fixed bottom-40 right-4 z-50 w-72 h-96 bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-[scale-in_0.2s_ease-out] backdrop-blur-xl">
          <div className="bg-slate-800 p-3 flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500">
                <Sparkles size={16} className="text-amber-500" />
              </div>
              <span className="text-amber-500 font-heritage font-bold">Vani AI</span>
            </div>
            <button onClick={toggleChat}><X size={18} className="text-slate-400 hover:text-white" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-2 rounded-xl text-xs ${m.sender === 'user' ? 'bg-amber-500 text-slate-950 rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="p-2 bg-slate-800 border-t border-slate-700 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={lang === 'hi' ? "कुछ भी पूछें..." : "Ask something..."}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <button type="submit" className="p-2 bg-amber-500 rounded-lg text-slate-950"><ArrowRight size={16} /></button>
          </form>
        </div>
      )}
    </>
  );
};

// --- LIVE AUCTION WITH BIDDING ---
const LiveAuctionView = ({ onClose }) => {
  const [bid, setBid] = useState(15000);
  const [userBids, setUserBids] = useState(0);
  const [comments, setComments] = useState([
    { user: "Rohan", text: "Wow look at that detail!" },
    { user: "Priya", text: "Is this silk?" }
  ]);
  const { t } = useContext(LanguageContext);
  const addToast = useContext(ToastContext);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random market movement
      if (Math.random() > 0.6) {
        setBid(prev => prev + 100);
        setComments(prev => [...prev.slice(-4), { user: "User" + Math.floor(Math.random() * 100), text: "Bid +100 🔥" }]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const placeBid = () => {
    vibrate(80);
    setBid(prev => prev + 500);
    setUserBids(prev => prev + 1);
    setComments(prev => [...prev.slice(-4), { user: "You", text: "Placed ₹" + (bid + 500) }]);
    addToast("Bid Placed Successfully!", "success");
  };

  return (
    <div className="fixed inset-0 z-[55] bg-black flex flex-col animate-[slide-up_0.3s_ease-out]">
      <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <button onClick={onClose}><ChevronLeft className="text-white" /></button>
          <div className="px-2 py-0.5 bg-red-600 rounded text-white text-[10px] font-bold animate-pulse">LIVE</div>
          <span className="text-white text-sm font-bold shadow-black drop-shadow">Master Weaver Kabir</span>
        </div>
        <div className="px-3 py-1 bg-black/40 rounded-full flex items-center gap-2">
          <Eye size={14} className="text-white" />
          <span className="text-white text-xs">1.5k</span>
        </div>
      </div>

      <div className="flex-1 bg-slate-800 relative">
        <img src="https://images.unsplash.com/photo-1616682703816-3e72186987f4?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />

        <div className="absolute bottom-24 left-4 w-64 space-y-2 h-40 overflow-hidden flex flex-col justify-end mask-image-gradient">
          {comments.map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-white animate-[slide-in-right_0.2s_ease-out]">
              <span className="font-bold text-amber-500 opacity-80">{c.user}:</span>
              <span className="shadow-black drop-shadow-md">{c.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-24 bg-slate-950 border-t border-slate-800 p-4 relative flex items-center gap-4">
        <div className="flex-1">
          <span className="block text-slate-400 text-xs">Current Highest Bid</span>
          <span className="text-2xl font-bold text-white flex items-center">₹{bid.toLocaleString()} <span className="text-green-500 text-xs ml-2 flex items-center"><ArrowRight size={10} className="-rotate-45" /> +{(userBids * 500)} (You)</span></span>
        </div>
        <button onClick={placeBid} className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl active:scale-95 transition-transform shadow-lg shadow-amber-900/30">
          {t('bidNow')} (+500)
        </button>
      </div>

      <div className="absolute bottom-28 right-4 flex flex-col items-center gap-4">
        <div className="p-3 bg-black/20 backdrop-blur rounded-full text-white cursor-pointer hover:bg-pink-600 transition"><Heart fill="currentColor" size={24} /></div>
        <div className="p-3 bg-black/20 backdrop-blur rounded-full text-white cursor-pointer"><Share2 size={24} /></div>
      </div>
    </div>
  );
};

// --- AR VIEW MODAL ---
const ARModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col">
      <div className="absolute top-0 left-0 right-0 p-4 z-10 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onClose} className="p-2 bg-black/40 backdrop-blur rounded-full text-white"><X /></button>
        <div className="bg-amber-500/20 backdrop-blur border border-amber-500 px-3 py-1 rounded-full">
          <span className="text-amber-500 text-xs font-bold tracking-wider flex items-center gap-2"><Box size={14} /> AR PREVIEW</span>
        </div>
        <div className="w-8"></div>
      </div>

      {/* Camera Simulated Feed */}
      <div className="flex-1 relative overflow-hidden bg-slate-800">
        <img src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60" alt="Room" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <img src={product.image} className="drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]" style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }} />
        </div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full">
          <p className="text-white text-sm shadow-black drop-shadow-md">Drag to place the item</p>
        </div>
      </div>
    </div>
  );
};

// --- PRODUCT DETAIL ---
const ProductDetail = ({ product, onClose, onAddToCart }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const { t } = useContext(LanguageContext);

  const handleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(product.audioStory);
    utterance.rate = 0.9;
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-[slide-up_0.3s_ease-out]">
      {showAR && <ARModal product={product} onClose={() => setShowAR(false)} />}

      <div className="h-[45vh] relative w-full shrink-0">
        <img src={product.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4 z-10" onClick={onClose}>
          <button className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white"><ChevronLeft /></button>
        </div>
        {/* AR Trigger */}
        <div className="absolute bottom-4 right-4 z-10">
          <button onClick={() => setShowAR(true)} className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs font-bold hover:bg-amber-500 hover:text-black transition">
            <Box size={16} /> {t('arView')}
          </button>
        </div>
      </div>

      <div className="flex-1 -mt-10 relative z-10 bg-slate-950 rounded-t-[2.5rem] px-6 pt-10 overflow-y-auto pb-24">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-heritage text-white leading-tight max-w-[70%]">{product.title}</h1>
          <span className="text-2xl font-bold text-amber-500">{product.price}</span>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <MapPin size={14} className="text-slate-400" />
          <p className="text-slate-400 text-sm">{product.location} • <span className="text-amber-500">By {product.artisan}</span></p>
        </div>

        {/* Story Section */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden mb-6">
          <div className="flex items-center justify-between mb-3 relative z-10">
            <h3 className="font-heritage text-amber-500 text-sm uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={14} /> The Heritage Story
            </h3>
            {isPlaying && (
              <div className="flex items-end gap-[2px] h-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-[3px] bg-amber-500 rounded-full animate-[waveform_1s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            )}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4 relative z-10">{product.description}</p>

          <button onClick={handleSpeak} className="relative z-10 w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition border border-slate-700">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isPlaying ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'}`}>
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </div>
            <div className="text-left">
              <span className="block text-white text-xs font-bold uppercase">{isPlaying ? 'Listening...' : 'Listen to Story'}</span>
              <span className="text-[10px] text-slate-400">Audio narration by AI Guide</span>
            </div>
          </button>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="absolute bottom-0 w-full p-4 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800">
        <button onClick={() => { onAddToCart(product); onClose(); }} className="w-full py-4 bg-amber-500 text-slate-950 font-bold font-heritage rounded-xl shadow-lg shadow-amber-900/40 hover:scale-[1.02] active:scale-95 transition-all">
          {t('addToCart')}
        </button>
      </div>
    </div>
  );
};



const LandingScreen = ({ onEnter }) => {
  const { t } = useContext(LanguageContext);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (role) => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    // Secret debug mode
    if (name.toLowerCase() === 'debug') {
      onEnter({ name: 'Debug', role: 'debug' });
      return;
    }
    onEnter({ name, role });
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-950 text-center">
      <div className="absolute inset-0 bg-[url('/landing_background.png')] bg-cover bg-center opacity-30 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
      <div className="relative z-10 animate-[slide-up_0.5s_ease-out] w-full max-w-xs">
        <h1 className="text-5xl font-heritage text-amber-500 mb-2">Virasat Vani</h1>
        <p className="text-slate-400 font-modern mb-8">Heritage Meets Future</p>

        <div className="mb-6 space-y-2 text-left">
          <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Enter your name</label>
          <input
            value={name}
            onChange={(e) => { setName(e.target.value); setError(false); }}
            placeholder="e.g. Aditi"
            className={`w-full bg-slate-900/80 border ${error ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors`}
          />
          {error && <span className="text-red-500 text-xs">Please enter your name to continue</span>}
        </div>

        <div className="space-y-4 w-full">
          <button onClick={() => handleLogin('artisan')} className="w-full py-3 bg-slate-900 border border-slate-700 hover:border-amber-500 rounded-xl text-amber-500 font-heritage transition-colors">{t('artisanMode')}</button>
          <button onClick={() => handleLogin('buyer')} className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl font-heritage hover:bg-amber-400 transition-colors">{t('buyerMode')}</button>
        </div>
      </div>
    </div>
  );
};

// --- BUYER FLOW WITH DYNAMIC VOICE SEARCH ---
const BuyerFlow = ({ onHome, products, user }) => {
  const [activeTab, setActiveTab] = useState('shop');
  const [cart, setCart] = useState(() => safeJSONParse('virasat_cart', [])); // Initialize safely
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showLive, setShowLive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [likes, setLikes] = useState(new Set([1, 2])); // Mock initial likes
  const { toggleLang, lang, t } = useContext(LanguageContext);
  const addToast = useContext(ToastContext);

  useEffect(() => {
    localStorage.setItem('virasat_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleLike = (productId) => {
    vibrate(30);
    setLikes(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(productId)) newLikes.delete(productId);
      else newLikes.add(productId);
      return newLikes;
    });
  };

  const handleVoiceSearch = () => {
    addToast(t('listening'), "mic");
    setTimeout(() => {
      // Mock Recognition Logic
      const opts = ['Pottery', 'Textiles', 'Woodwork'];
      const randomCat = opts[Math.floor(Math.random() * opts.length)];
      addToast(`Recognized: "${randomCat}"`, "info");
      setActiveCategory(randomCat);
    }, 1500);
  };



  const addToCart = (p) => {
    vibrate();
    setCart(prev => [...prev, { ...p, qty: 1 }]);
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQty = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  const clearCart = () => {
    setCart([]);
    setShowCart(false);
    addToast("Order Placed Successfully!", "success");
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-slate-950 relative">
      {showCart && (
        <CartModal
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onCheckout={clearCart}
        />
      )}
      {/* Cinematic Floating Header */}
      <header className="absolute top-4 left-4 right-4 z-30 glass-panel rounded-2xl px-4 py-3 flex justify-between items-center shadow-lg shadow-black/20 animate-slide-down">
        <div>
          <span className="text-xl font-heritage font-black text-gradient-gold block">Virasat</span>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={toggleLang} className="text-[10px] font-bold text-slate-400 border border-white/10 px-2 py-1 rounded-full hover:bg-white/10 transition-colors uppercase tracking-wider">{lang}</button>
          <button onClick={() => setShowCart(true)} className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
            <ShoppingBag size={20} className="text-white" />
            {cart.length > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-amber-500 rounded-full text-[10px] flex items-center justify-center font-bold text-slate-900 border-2 border-slate-900">{cart.length}</span>}
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto overflow-x-hidden pb-32 pt-24 px-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
        {activeTab === 'shop' && (
          <div className="animate-fade-in">
            {/* Search Bar */}
            <div className="flex gap-2 mb-6">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex items-center px-4 py-3 backdrop-blur-sm focus-within:bg-white/10 focus-within:border-amber-500/50 transition-all group">
                <Search className="text-slate-500 mr-2 group-focus-within:text-amber-500 transition-colors" size={18} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="bg-transparent text-sm w-full text-white focus:outline-none placeholder:text-slate-600 font-medium"
                />
              </div>
              <button onClick={handleVoiceSearch} className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl hover:bg-amber-500 hover:text-slate-900 hover:border-amber-500 transition-all text-slate-400"><Mic size={20} /></button>
            </div>

            {/* Categories */}
            <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); vibrate(10); }}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase transition-all border ${activeCategory === cat ? 'bg-amber-500 border-amber-500 text-slate-900 shadow-lg shadow-amber-500/20' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cinematic Product Grid */}
            <div className="columns-2 gap-4 space-y-4">
              {filteredProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => { setSelectedProduct(p); vibrate(20); }}
                  className="break-inside-avoid relative rounded-3xl overflow-hidden group cursor-pointer active:scale-95 transition-transform duration-300"
                >
                  <img src={p.image} className="w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>

                  {/* Floating Price Tag */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-amber-400 text-xs font-bold">{p.price}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-white text-sm font-heritage font-bold leading-tight mb-1 drop-shadow-md">{p.title}</h3>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-2">{p.artisan}</p>
                    <div className="inline-block px-2 py-1 bg-white/10 rounded text-[10px] text-white/80 font-medium backdrop-blur-sm border border-white/5">
                      {p.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 opacity-50">
                <Search size={40} className="mx-auto mb-4 text-slate-600" />
                <p className="text-slate-400">No treasures found.</p>
              </div>
            )}
          </div>
        )}
        {activeTab === 'stories' && (
          <div className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide pb-32 -mt-4">
            {MOCK_STORIES.map(story => (
              <div key={story.id} className="snap-center w-full h-full relative bg-slate-900 flex-shrink-0">
                {story.isLive ? (
                  <div className="w-full h-full bg-slate-800 relative">
                    <img src={story.image} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <button onClick={() => setShowLive(true)} className="px-8 py-4 bg-red-600 rounded-full text-white font-bold animate-pulse hover:scale-110 transition shadow-[0_0_30px_rgba(220,38,38,0.6)] flex items-center gap-3">
                        <div className="w-3 h-3 bg-white rounded-full animate-ping" /> WATCH LIVE
                      </button>
                    </div>
                    <div className="absolute top-24 left-6 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full border border-red-400/50 shadow-lg">● LIVE NOW</div>
                  </div>
                ) : (
                  <>
                    <img src={story.image} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90"></div>
                    <div className="absolute bottom-32 left-6 right-16">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-[10px] font-bold text-black font-heritage">V</div>
                        <span className="text-xs text-white/80 font-bold tracking-wider uppercase">Heritage Story</span>
                      </div>
                      <h3 className="text-white font-heritage text-3xl font-bold mb-3 leading-tight text-shadow-lg">{story.title}</h3>
                      <p className="text-slate-200 text-sm line-clamp-2 font-medium leading-relaxed drop-shadow-md">{story.description}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {activeTab === 'discover' && <DiscoverView />}
        {activeTab === 'profile' && <ProfileView user={user} onLogout={onHome} products={products} likes={likes} />}
      </main>

      <VaniChatBot />

      {/* Floating Island Navigation */}
      <div className="absolute bottom-6 left-6 right-6 z-40">
        <div className="glass-panel rounded-2xl p-2 flex justify-around items-center shadow-2xl shadow-black/50 border border-white/10">
          {['shop', 'stories', 'discover', 'profile'].map(tId => (
            <button
              key={tId}
              onClick={() => { setActiveTab(tId); vibrate(15); }}
              className={`flex flex-col items-center gap-1 w-14 h-14 justify-center rounded-xl transition-all duration-300 relative ${activeTab === tId ? 'text-amber-500 bg-white/5' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <div className={`transition-transform duration-300 ${activeTab === tId ? 'scale-110' : 'scale-100'}`}>
                {tId === 'shop' && <ShoppingBag size={20} strokeWidth={activeTab === tId ? 2.5 : 2} />}
                {tId === 'stories' && <Play size={20} strokeWidth={activeTab === tId ? 2.5 : 2} />}
                {tId === 'discover' && <MapIcon size={20} strokeWidth={activeTab === tId ? 2.5 : 2} />}
                {tId === 'profile' && <User size={20} strokeWidth={activeTab === tId ? 2.5 : 2} />}
              </div>
              {activeTab === tId && <div className="w-1 h-1 bg-amber-500 rounded-full absolute bottom-2"></div>}
            </button>
          ))}
        </div>
      </div>
      {showLive && <LiveAuctionView onClose={() => setShowLive(false)} />}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          isLiked={likes.has(selectedProduct.id)}
          onToggleLike={() => toggleLike(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};

const App = () => {
  // Persist Language, Products, & User Session
  const [lang, setLang] = useState(() => safeJSONParse('virasat_lang', 'en'));
  const [products, setProducts] = useState(() => {
    const saved = safeJSONParse('virasat_products', INITIAL_PRODUCTS);
    return saved.filter(p => p.title !== "Handcrafted Heritage Artifact");
  });

  // Auth State
  const [user, setUser] = useState(() => safeJSONParse('virasat_user', null));
  const [view, setView] = useState('landing');

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    localStorage.setItem('virasat_lang', JSON.stringify(newLang));
  };
  const t = (key) => TRANSLATIONS[lang][key] || key;

  const handleNewProduct = (product) => {
    const updated = [product, ...products];
    setProducts(updated);
    localStorage.setItem('virasat_products', JSON.stringify(updated));
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('virasat_user', JSON.stringify(userData));
    setView(userData.role);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('virasat_user');
    setView('landing');
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      <ToastProvider>
        <GlobalStyles />
        <div className="w-full min-h-screen bg-neutral-900 flex items-center justify-center p-0 md:p-8 font-modern text-slate-200">
          <div className="w-full h-[100dvh] md:h-[850px] md:w-[400px] bg-slate-950 md:rounded-[3rem] shadow-2xl relative overflow-hidden border-8 border-slate-800 ring-1 ring-white/10 flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-[70] hidden md:block"></div>
            {view === 'landing' && <LandingScreen onEnter={handleLogin} />}
            {view === 'artisan' && <ArtisanDashboard onLogout={handleLogout} onProductList={handleNewProduct} user={user} />}
            {view === 'buyer' && <BuyerFlow onHome={handleLogout} products={products} user={user} />}
            {view === 'debug' && <ImageDebugger />}
          </div>
        </div>
      </ToastProvider>
    </LanguageContext.Provider>
  );
};

export default App;

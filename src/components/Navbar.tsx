import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 py-4 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-black text-2xl">
          <Heart className="fill-current" />
          <span>NMĐN Health</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="font-bold text-slate-600 hover:text-primary transition-colors">Trang chủ</a>
          <a href="#calculator" className="font-bold text-slate-600 hover:text-primary transition-colors">Công cụ</a>
          <a href="#workouts" className="font-bold text-slate-600 hover:text-primary transition-colors">Bài tập</a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-4 shadow-xl flex flex-col gap-4">
          <a href="#" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-600 p-2">Trang chủ</a>
          <a href="#calculator" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-600 p-2">Công cụ</a>
          <a href="#workouts" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-600 p-2">Bài tập</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

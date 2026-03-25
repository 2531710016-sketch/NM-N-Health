import React from 'react';
import { Heart, Github, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 text-primary font-black text-2xl mb-4">
              <Heart className="fill-current" />
              <span>NMĐN Health</span>
            </div>
            <p className="text-slate-500 max-w-sm">
              NMĐN Health - Người bạn đồng hành tin cậy trên hành trình chăm sóc sức khỏe và cải thiện vóc dáng mỗi ngày.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-4">Liên kết</h4>
            <ul className="space-y-2 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Trang chủ</a></li>
              <li><a href="#calculator" className="hover:text-primary transition-colors">Tính BMI/TDEE</a></li>
              <li><a href="#workouts" className="hover:text-primary transition-colors">Thư viện tập luyện</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-50 text-center text-slate-400 text-xs">
          © 2026 NMĐN Health. Được thiết kế với tâm huyết cho sức khỏe cộng đồng.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

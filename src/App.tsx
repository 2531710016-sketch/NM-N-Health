import Navbar from './components/Navbar';
import Calculator from './components/Calculator';
import WorkoutLibrary from './components/WorkoutLibrary';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { Shield, Zap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <header className="pt-32 pb-16 px-4 bg-linear-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
              <Zap size={16} />
              <span>Sức khỏe là vàng</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">
              Làm Chủ <span className="text-primary">Sức Khỏe</span> <br />
              Kiến Tạo <span className="text-secondary">Vóc Dáng</span>
            </h1>
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 shadow-sm max-w-lg space-y-4">
              <p className="text-slate-700 leading-relaxed font-medium">
                Chào mừng bạn đến với <span className="text-primary font-bold">NMĐN Health</span>, nền tảng chăm sóc sức khỏe toàn diện được phát triển bởi 4 sinh viên: <span className="font-bold">Nhật, Minh, Đan và Ngân</span>.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm italic border-l-4 border-secondary pl-4">
                Không chỉ là sự kết hợp tên gọi, NMĐN còn mang một sứ mệnh cốt lõi: <span className="text-secondary font-bold">Nâng Mục</span> (Nâng tầm mục tiêu vóc dáng) & <span className="text-primary font-bold">Đạt Nhịp</span> (Đạt nhịp sống cân bằng). Chúng tôi muốn biến những kiến thức sức khỏe phức tạp thành các bước thực hành đơn giản nhất cho bạn.
              </p>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              NMĐN Health cung cấp các công cụ tính toán khoa học, thư viện bài tập chuyên nghiệp và trợ lý AI thông minh giúp bạn đạt được mục tiêu sức khỏe nhanh chóng.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#calculator" className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-all">
                Tính BMI của bạn
              </a>
              <a href="#workouts" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                Xem bài tập
              </a>
            </div>
            
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
            <div className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Fitness" 
                className="rounded-[2rem] w-full h-[500px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 animate-float [animation-delay:1.5s]">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">An toàn</p>
                  <p className="text-xl font-black text-slate-800">100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Calculator />
      <WorkoutLibrary />

      <Footer />
      <Chatbot />
    </div>
  );
}

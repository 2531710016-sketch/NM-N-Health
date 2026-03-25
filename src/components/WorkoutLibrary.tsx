import React, { useState } from 'react';
import { Workout } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Dumbbell, Home, Flower2 } from 'lucide-react';

const workouts: Workout[] = [
  { id: '1', title: 'Yoga Chào Mặt Trời', category: 'yoga', difficulty: 'Dễ', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://www.youtube.com/watch?v=v7AYKMP6rOE', description: 'Bài tập giúp khởi động năng lượng cho ngày mới.' },
  { id: '2', title: 'Hatha Yoga Cơ Bản', category: 'yoga', difficulty: 'Trung bình', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://www.youtube.com/watch?v=0fL-pn802-w', description: 'Tập trung vào hơi thở và các tư thế giữ thăng bằng.' },
  { id: '3', title: 'Vinyasa Flow', category: 'yoga', difficulty: 'Khó', image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://www.youtube.com/watch?v=9kOCY0KNByw', description: 'Chuỗi động tác liên hoàn cường độ cao.' },
  { id: '4', title: 'Đẩy Ngực Với Tạ Đơn', category: 'gym', difficulty: 'Trung bình', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://www.youtube.com/watch?v=vthMCtgVtFw', description: 'Phát triển cơ ngực và bắp tay sau.' },
  { id: '5', title: 'Squat Gánh Tạ', category: 'gym', difficulty: 'Khó', image: 'https://images.unsplash.com/photo-1566241142559-40e1bfc26ddc?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://www.youtube.com/watch?v=Uv_K6vT2B08', description: 'Bài tập vua cho đôi chân và mông đùi.' },
  { id: '6', title: 'Kéo Xô Cáp', category: 'gym', difficulty: 'Dễ', image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc', description: 'Tăng cường sức mạnh cơ lưng xô.' },
  { id: '7', title: 'HIIT Đốt Mỡ', category: 'home', difficulty: 'Khó', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://www.youtube.com/watch?v=ml6cT4AZdqI', description: 'Đốt cháy calo hiệu quả không cần dụng cụ.' },
  { id: '8', title: 'Plank & Core', category: 'home', difficulty: 'Dễ', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw', description: 'Xây dựng cơ bụng săn chắc tại nhà.' },
  { id: '9', title: 'Giãn Cơ Toàn Thân', category: 'home', difficulty: 'Dễ', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80', videoUrl: 'https://www.youtube.com/watch?v=g_tea8ZNk5A', description: 'Thư giãn cơ bắp sau ngày làm việc.' },
];

const WorkoutLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'yoga' | 'gym' | 'home'>('yoga');

  const filteredWorkouts = workouts.filter(w => w.category === activeTab);

  return (
    <section id="workouts" className="py-16 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Thư Viện Tập Luyện</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Khám phá các bài tập đa dạng phù hợp với mọi mục tiêu và trình độ của bạn.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-white rounded-2xl shadow-md border border-slate-100">
            <button 
              onClick={() => setActiveTab('yoga')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'yoga' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Flower2 size={18} />
              Yoga
            </button>
            <button 
              onClick={() => setActiveTab('gym')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'gym' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Dumbbell size={18} />
              Gym
            </button>
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'home' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Home size={18} />
              Tại Nhà
            </button>
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorkouts.map((workout) => (
              <motion.div
                key={workout.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={workout.image} 
                    alt={workout.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      workout.difficulty === 'Dễ' ? 'bg-green-100 text-green-600' :
                      workout.difficulty === 'Trung bình' ? 'bg-blue-100 text-blue-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {workout.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{workout.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">{workout.description}</p>
                  <a 
                    href={workout.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all group/btn"
                  >
                    <Play size={16} className="fill-current" />
                    Xem hướng dẫn
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkoutLibrary;

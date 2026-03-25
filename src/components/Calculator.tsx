import React, { useState } from 'react';
import { Activity, Calculator as CalcIcon, Droplets, Utensils, Info, RefreshCw } from 'lucide-react';
import { HealthData, CalculationResult, MealPlan } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const MEAL_POOL = {
  underweight: {
    breakfast: [
      'Xôi thịt kho, 1 ly sữa tươi.',
      'Bánh mì trứng sữa, 1 quả chuối.',
      'Phở bò nhiều thịt, 1 ly nước cam.',
      'Cháo yến mạch sữa hạt, các loại hạt dinh dưỡng.',
      'Bánh cuốn chả lụa, 1 quả trứng luộc.'
    ],
    lunch: [
      '2 bát cơm, 200g thịt bò xào, canh xương hầm.',
      '2 bát cơm, cá kho tộ, trứng chiên, rau xào.',
      'Mì Ý sốt bò băm nhiều phô mai, salad trái cây.',
      '2 bát cơm, gà kho gừng, canh bí đỏ thịt băm.',
      '2 bát cơm, sườn xào chua ngọt, đậu phụ sốt cà chua.'
    ],
    snack: [
      'Bánh ngọt hoặc sinh tố bơ, hạt điều.',
      'Sữa chua hy lạp với mật ong và hạt.',
      '1 ly ngũ cốc dinh dưỡng, 1 quả táo.',
      'Bánh quy bơ, 1 ly sữa đậu nành.',
      'Trái cây sấy khô, hạt hạnh nhân.'
    ],
    dinner: [
      '2 bát cơm, cá hồi nướng, súp gà ngô non.',
      '2 bát cơm, thịt heo luộc, canh rau ngót thịt băm.',
      'Nui xào bò, 1 ly sữa trước khi ngủ.',
      '2 bát cơm, tôm rim mặn ngọt, rau muống xào tỏi.',
      '2 bát cơm, đậu hũ nhồi thịt, canh chua cá.'
    ]
  },
  normal: {
    breakfast: [
      'Phở bò hoặc bún chả, 1 quả chuối.',
      'Bánh mì ốp la, 1 ly sữa đậu nành.',
      'Yến mạch sữa chua trái cây.',
      'Hủ tiếu Nam Vang, 1 quả táo.',
      'Trứng xào cà chua, bánh mì đen.'
    ],
    lunch: [
      '1.5 bát cơm, 150g ức gà áp chảo, bông cải xanh.',
      '1.5 bát cơm, cá thu sốt cà, canh rau cải.',
      'Salad gà nướng, khoai lang tím.',
      '1.5 bát cơm, thịt kho trứng, canh khổ qua.',
      'Bún trộn thịt nướng nhiều rau xanh.'
    ],
    snack: [
      '1 hũ sữa chua không đường, ít hạt hạnh nhân.',
      '1 quả cam hoặc quýt.',
      'Nước ép cần tây và táo.',
      'Vài miếng phô mai ít béo.',
      '1 nắm hạt óc chó.'
    ],
    dinner: [
      '1 bát cơm, 100g cá hồi nướng, salad rau củ.',
      '1 bát cơm, đậu phụ luộc, canh bí đao thịt băm.',
      'Súp rau củ thập cẩm, ức gà xé.',
      '1 bát cơm, tôm hấp, rau củ luộc chấm kho quật.',
      'Bún tươi ăn kèm cá linh nấu canh chua.'
    ]
  },
  overweight: {
    breakfast: [
      'Yến mạch trộn sữa chua và dâu tây, 1 quả trứng luộc.',
      'Bánh mì đen kẹp bơ và trứng.',
      'Sinh tố xanh (cải kale, chuối, protein).',
      'Khoai lang luộc, 1 ly trà xanh.',
      'Sữa chua không đường với hạt chia.'
    ],
    lunch: [
      '1 bát cơm gạo lứt, 150g ức gà luộc, thật nhiều rau xanh.',
      'Salad cá ngừ, dầu olive, giấm táo.',
      'Canh rong biển đậu hũ, 100g thịt nạc heo.',
      '1 bát cơm gạo lứt, cá tuyết hấp gừng.',
      'Nui lứt xào rau củ và nấm.'
    ],
    snack: [
      '1 quả táo hoặc 1 ly nước ép bưởi.',
      'Dưa chuột cắt lát muối tiêu.',
      '1 ly trà thảo mộc.',
      'Vài quả dâu tây.',
      'Hạt hướng dương (không muối).'
    ],
    dinner: [
      'Salad ức gà hoặc cá ngừ, khoai lang luộc.',
      'Canh rau thập cẩm, đậu hũ trắng áp chảo.',
      'Cá hồi hấp măng tây, không tinh bột.',
      'Súp bông cải xanh, trứng trắng luộc.',
      'Thịt bò bít tết nạc, nhiều salad.'
    ]
  }
};

const Calculator: React.FC = () => {
  const [data, setData] = useState<HealthData>({
    gender: 'male',
    age: 25,
    height: 170,
    weight: 65,
    activityLevel: 1.2,
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [activePlanTab, setActivePlanTab] = useState<'day' | 'week'>('day');

  const getRandomMeal = (pool: string[]) => pool[Math.floor(Math.random() * pool.length)];

  const generateMealPlan = (bmi: number): MealPlan => {
    const category = bmi < 18.5 ? 'underweight' : (bmi < 25 ? 'normal' : 'overweight');
    const pool = MEAL_POOL[category];
    return {
      breakfast: getRandomMeal(pool.breakfast),
      lunch: getRandomMeal(pool.lunch),
      snack: getRandomMeal(pool.snack),
      dinner: getRandomMeal(pool.dinner)
    };
  };

  const calculate = () => {
    const heightInM = data.height / 100;
    const bmi = data.weight / (heightInM * heightInM);
    
    let bmiCategory = '';
    let bmiColor = '';
    let advice = '';

    if (bmi < 18.5) {
      bmiCategory = 'Thiếu cân';
      bmiColor = 'text-blue-500';
      advice = 'Chỉ số BMI của bạn cho thấy bạn đang ở mức thiếu cân. Để cải thiện sức khỏe, bạn nên tập trung vào việc tăng cân một cách lành mạnh bằng cách bổ sung thêm 300-500 calo mỗi ngày so với mức TDEE. Hãy ưu tiên các thực phẩm giàu dinh dưỡng như ngũ cốc nguyên hạt, các loại hạt, bơ, và protein chất lượng cao từ thịt, cá, trứng. Ngoài ra, việc kết hợp các bài tập kháng lực (weight training) 3-4 buổi/tuần sẽ giúp bạn tăng khối lượng cơ bắp thay vì chỉ tăng mỡ. Đừng quên ngủ đủ 7-8 tiếng mỗi ngày để cơ thể có thời gian phục hồi và phát triển.';
    } else if (bmi < 25) {
      bmiCategory = 'Bình thường';
      bmiColor = 'text-green-500';
      advice = 'Chúc mừng! Bạn đang sở hữu một chỉ số hình thể lý tưởng. Để duy trì trạng thái này, hãy tiếp tục duy trì chế độ ăn uống cân bằng giữa các nhóm chất (Carbs, Protein, Fat) và uống đủ nước theo khuyến nghị. Bạn nên đa dạng hóa các hình thức tập luyện, kết hợp giữa Cardio (chạy bộ, bơi lội) để tăng cường sức khỏe tim mạch và tập tạ để duy trì mật độ xương cũng như khối lượng cơ. Hãy chú trọng vào chất lượng giấc ngủ và kiểm soát căng thẳng để tối ưu hóa quá trình trao đổi chất tự nhiên của cơ thể.';
    } else if (bmi < 30) {
      bmiCategory = 'Thừa cân';
      bmiColor = 'text-yellow-500';
      advice = 'Chỉ số BMI cho thấy bạn đang ở mức thừa cân nhẹ. Đây là thời điểm quan trọng để điều chỉnh lối sống nhằm ngăn ngừa các nguy cơ về tim mạch và tiểu đường. Bạn nên cắt giảm khoảng 200-300 calo mỗi ngày, đặc biệt là từ đường tinh luyện và chất béo bão hòa. Hãy tăng cường lượng chất xơ từ rau xanh và trái cây ít ngọt để tạo cảm giác no lâu. Về vận động, hãy đặt mục tiêu ít nhất 150 phút hoạt động cường độ trung bình mỗi tuần (như đi bộ nhanh, đạp xe) kết hợp với các bài tập HIIT để đốt cháy mỡ thừa hiệu quả hơn.';
    } else {
      bmiCategory = 'Béo phì';
      bmiColor = 'text-red-500';
      advice = 'Chỉ số BMI của bạn đang ở mức béo phì, điều này có thể gây áp lực lớn lên hệ xương khớp và tim mạch. Bạn cần một lộ trình giảm cân nghiêm túc và kiên trì. Hãy bắt đầu bằng việc thay thế các loại nước ngọt bằng nước lọc và cắt giảm tinh bột trắng. Việc chia nhỏ bữa ăn sẽ giúp kiểm soát cơn đói tốt hơn. Về tập luyện, hãy bắt đầu với các bài tập nhẹ nhàng như đi bộ hoặc bơi lội để tránh chấn thương khớp, sau đó tăng dần cường độ khi cơ thể đã thích nghi. Chúng tôi khuyến khích bạn nên tham khảo thêm ý kiến từ bác sĩ hoặc chuyên gia dinh dưỡng để có kế hoạch can thiệp y tế phù hợp.';
    }

    // BMR (Mifflin-St Jeor)
    let bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age;
    bmr = data.gender === 'male' ? bmr + 5 : bmr - 161;

    const tdee = Math.round(bmr * data.activityLevel);
    const waterIntake = Number((data.weight * 0.035).toFixed(1));

    // Macros (30% Protein, 40% Carbs, 30% Fat)
    const protein = Math.round((tdee * 0.3) / 4);
    const carbs = Math.round((tdee * 0.4) / 4);
    const fat = Math.round((tdee * 0.3) / 9);

    const mealPlan = generateMealPlan(bmi);
    const weeklyPlan = Array.from({ length: 7 }, () => generateMealPlan(bmi));

    setResult({
      bmi: Number(bmi.toFixed(1)),
      bmiCategory,
      bmiColor,
      tdee,
      waterIntake,
      macros: { protein, carbs, fat },
      advice,
      mealPlan,
      weeklyPlan
    });
  };

  const refreshMealPlan = () => {
    if (!result) return;
    const newMealPlan = generateMealPlan(result.bmi);
    const newWeeklyPlan = Array.from({ length: 7 }, () => generateMealPlan(result.bmi));
    setResult({
      ...result,
      mealPlan: newMealPlan,
      weeklyPlan: newWeeklyPlan
    });
  };

  return (
    <section id="calculator" className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Đánh Giá Sức Khỏe</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">Nhập các chỉ số của bạn để nhận phân tích chi tiết về tình trạng cơ thể và lời khuyên dinh dưỡng.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <div className="space-y-6">
            <div className="flex gap-4">
              <button 
                onClick={() => setData({...data, gender: 'male'})}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${data.gender === 'male' ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                Nam
              </button>
              <button 
                onClick={() => setData({...data, gender: 'female'})}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${data.gender === 'female' ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                Nữ
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Tuổi</label>
                <input 
                  type="number" 
                  value={data.age}
                  onChange={(e) => setData({...data, age: Number(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Cân nặng (kg)</label>
                <input 
                  type="number" 
                  value={data.weight}
                  onChange={(e) => setData({...data, weight: Number(e.target.value)})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Chiều cao (cm)</label>
              <input 
                type="number" 
                value={data.height}
                onChange={(e) => setData({...data, height: Number(e.target.value)})}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Mức độ vận động</label>
              <select 
                value={data.activityLevel}
                onChange={(e) => setData({...data, activityLevel: Number(e.target.value)})}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value={1.2}>Ít vận động (Văn phòng)</option>
                <option value={1.375}>Vận động nhẹ (1-3 ngày/tuần)</option>
                <option value={1.55}>Vận động vừa (3-5 ngày/tuần)</option>
                <option value={1.725}>Vận động mạnh (6-7 ngày/tuần)</option>
                <option value={1.9}>Vận động rất mạnh (Vận động viên)</option>
              </select>
            </div>

            <button 
              onClick={calculate}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <CalcIcon size={20} />
              Tính Toán Ngay
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="h-full">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center">
                    <span className="text-slate-500 text-sm font-medium mb-1">BMI</span>
                    <span className={`text-4xl font-black ${result.bmiColor}`}>{result.bmi}</span>
                    <span className={`text-sm font-bold mt-1 ${result.bmiColor}`}>{result.bmiCategory}</span>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center text-center">
                    <span className="text-slate-500 text-sm font-medium mb-1">TDEE</span>
                    <span className="text-4xl font-black text-slate-800">{result.tdee}</span>
                    <span className="text-sm font-bold mt-1 text-slate-400">kcal/ngày</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <Droplets size={20} />
                    </div>
                    <h3 className="font-bold text-slate-800">Lượng nước cần uống</h3>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-blue-600">{result.waterIntake}</span>
                    <span className="text-slate-500 font-bold mb-1">Lít / ngày</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                        <Utensils size={20} />
                      </div>
                      <h3 className="font-bold text-slate-800">Thực đơn gợi ý</h3>
                    </div>
                    <button 
                      onClick={refreshMealPlan}
                      className="p-2 text-slate-400 hover:text-primary transition-colors"
                      title="Đổi thực đơn"
                    >
                      <RefreshCw size={18} />
                    </button>
                  </div>

                  {/* Tabs for Day/Week */}
                  <div className="flex p-1 bg-slate-50 rounded-xl mb-6">
                    <button 
                      onClick={() => setActivePlanTab('day')}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activePlanTab === 'day' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                    >
                      1 Ngày
                    </button>
                    <button 
                      onClick={() => setActivePlanTab('week')}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activePlanTab === 'week' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                    >
                      1 Tuần
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {activePlanTab === 'day' ? (
                      <div className="space-y-3">
                        <MealItem label="Sáng" text={result.mealPlan.breakfast} />
                        <MealItem label="Trưa" text={result.mealPlan.lunch} />
                        <MealItem label="Phụ" text={result.mealPlan.snack} />
                        <MealItem label="Tối" text={result.mealPlan.dinner} />
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {result.weeklyPlan.map((day, i) => (
                          <div key={i} className="space-y-2 pb-4 border-b border-slate-50 last:border-0">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Thứ {i + 2 === 8 ? 'CN' : i + 2}</h4>
                            <div className="space-y-2">
                              <MealItem label="Sáng" text={day.breakfast} small />
                              <MealItem label="Trưa" text={day.lunch} small />
                              <MealItem label="Phụ" text={day.snack} small />
                              <MealItem label="Tối" text={day.dinner} small />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-primary/10 p-6 rounded-3xl border border-primary/20 flex gap-4">
                  <div className="text-primary shrink-0">
                    <Info size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Lời khuyên chuyên gia</h4>
                    <p className="text-slate-700 text-sm leading-relaxed">{result.advice}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                  <Activity size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-500">Chưa có kết quả</h3>
                <p className="text-slate-400 text-sm">Hãy nhập thông tin và nhấn nút tính toán để xem phân tích sức khỏe của bạn.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const MealItem: React.FC<{ label: string; text: string; small?: boolean }> = ({ label, text, small }) => (
  <div className="flex gap-3">
    <span className={`font-bold text-primary bg-primary/10 px-2 py-1 rounded h-fit shrink-0 ${small ? 'text-[10px]' : 'text-xs'}`}>
      {label}
    </span>
    <p className={`${small ? 'text-xs' : 'text-sm'} text-slate-600`}>{text}</p>
  </div>
);

export default Calculator;


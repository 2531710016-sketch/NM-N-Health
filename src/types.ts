export interface HealthData {
  gender: 'male' | 'female';
  age: number;
  height: number; // cm
  weight: number; // kg
  activityLevel: number;
}

export interface CalculationResult {
  bmi: number;
  bmiCategory: string;
  bmiColor: string;
  tdee: number;
  waterIntake: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  advice: string;
  mealPlan: MealPlan;
  weeklyPlan: MealPlan[];
}

export interface MealPlan {
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

export interface Workout {
  id: string;
  title: string;
  category: 'yoga' | 'gym' | 'home';
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  image: string;
  videoUrl: string;
  description: string;
}


export interface Goal {
  id: string;
  title: string;
  category: 'Career' | 'Health' | 'Personal' | 'Financial' | 'Skill';
  targetDate: string;
  status: 'active' | 'completed' | 'on-hold';
}

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface RoutineItem {
  time: string;
  activity: string;
  duration: string;
  category: string;
}

export interface UserPreferences {
  wakeUpTime: string;
  sleepTime: string;
  focusTime: 'Morning' | 'Afternoon' | 'Evening';
  interests: string[];
}

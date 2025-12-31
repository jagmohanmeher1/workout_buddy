
export type WorkoutType = 'Gym' | 'Running' | 'Yoga' | 'Swimming' | 'Cycling' | 'Hiking' | 'Tennis' | 'Basketball' | 'CrossFit';
export type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  interests: WorkoutType[];
  fitnessLevel: FitnessLevel;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface WorkoutSession {
  id: string;
  host: User;
  type: WorkoutType;
  level: FitnessLevel;
  title: string;
  description: string;
  locationName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  startTime: string;
  participantCount: number;
  maxParticipants: number;
  joined: boolean;
}

export interface NearbyPlace {
  title: string;
  uri: string;
  address?: string;
}

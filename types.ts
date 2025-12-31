
export type WorkoutType = 'Gym' | 'Running' | 'Yoga' | 'Swimming' | 'Cycling' | 'Hiking' | 'Tennis' | 'Basketball' | 'CrossFit';

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  interests: WorkoutType[];
  location?: {
    lat: number;
    lng: number;
  };
}

export interface WorkoutSession {
  id: string;
  host: User;
  type: WorkoutType;
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

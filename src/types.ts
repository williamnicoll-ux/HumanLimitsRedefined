export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  bio?: string;
  favoriteCategory?: string;
  createdAt: number;
}

export interface WorldRecord {
  id: string;
  title: string;
  description: string;
  category: string;
  holder: string;
  dateSet: string;
  location: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  tags: string[];
  isVerified: boolean;
  timestamp: number;
}

export interface UserLike {
  userId: string;
  recordId: string;
  timestamp: number;
}

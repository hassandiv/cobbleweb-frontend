interface Photo {
  name: string;
  url: string;
  user: number;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClientDetails {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  photos: Photo[];
}

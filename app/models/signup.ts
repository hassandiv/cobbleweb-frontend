interface Photo {
  name: string;
  url: string;
}

export interface ISignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  active: boolean;
  avatar: string;
  photos: Photo[];
}

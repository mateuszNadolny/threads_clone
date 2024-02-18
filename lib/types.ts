export interface NonConsentProps {
  heading: string;
  description: string;
  image: string;
}

export interface UserProps {
  id: string;
  clerkId: string;
  username: string;
  email: string;
  biogram?: string | null;
  image?: string | null;
  link?: string | null;
}

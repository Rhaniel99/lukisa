export interface User {
  id: string;
  username: string;
  discriminator?: string | null
  avatar_url?: string;
}

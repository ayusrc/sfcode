/*!  \file
Interface for User containing his/her details and login credentials.
Used in services and components as a data structure for each user.
*/

export interface User {
  id: number;
  username: string;
  name: string;
  password: string;
  email: string;
  img_url: string;
  n_attempts: number;
  n_files: number;
  correct_timeline: string;
  rating: number;
}

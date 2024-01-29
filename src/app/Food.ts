export interface Food{
  id?: number; //os ? denotam algo opcional
  title: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
  comments?: [{text: string, user: string}];
}

export interface Subj{
    id: number;
  name: string;
  subjvid:subvideos[];
}

export interface subvideos{
    id?: number;      
  title: string;
  url: string;
  subjectId?: number;
}
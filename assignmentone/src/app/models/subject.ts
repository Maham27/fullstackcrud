export interface Subject {
    id:number;
    subjectname:string;
    videos:subvideo[];
}

export interface subvideo{
    title:string;
    url:string;
}

export interface subj{
    name:string;
}
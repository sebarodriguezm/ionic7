export class CourseDto {
    id?: string;
    title?: string;
    identifier?: string;
    content?: CourseContent[] = [];
    photo?: any;
    video?: string;
    file?: string;
    fileName?: string;
    link?: string;
    arraySearch?: [];
    createdBy?: string;
}

export interface CourseContent {
    id?: string;
    title: string;
    description: string;
    photo: string;
    file:any;
    fileName: string;
    video: string; 
    videoName: string; 
  }
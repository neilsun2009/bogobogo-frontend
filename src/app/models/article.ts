export class Article {
  _id: string;
  href: string;
  title: string;
  image: string;
  tags: string[];
  description?: string;
  cat: string;
  views: number;
  updateTime: Date;
  addTime: Date;
  primaryColor: string;
  secondaryColor: string;
  isPublic: boolean;
  paras?: {
    title: string;
    cover?: string;
    html: string;
    text: string;
    mode?: string;
  }[];
}

export interface Project {
  title: string;
  subtitle?: string;
  desciption: string;
  image?: string;
  icon?: string;
  deploy?: string;
  repository?: string;
  tecnologias: {
    title: string;
  }[];
}

import IIcon from "./IIcon";

export default interface IProject {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  svgUrl: string;
  url: string;
  icons: IIcon[]; // Many to many relationship with IProjectIcon
  userId: number; // Foreign key
}

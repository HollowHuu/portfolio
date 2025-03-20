import IIcon from "./IIcon";

export default interface ITechnology {
  id: number;
  name: string;
  userId: number;
  icons: IIcon[];
}

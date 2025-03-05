import { Picture } from "../pictures/picture";

export interface Product {
  id: string;
  skuCode: string;
  name: string;
  description: string;
  price: number;
  images: Picture[];
}

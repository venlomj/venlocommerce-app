import { Category } from "../categories/category";
import { Picture } from "../pictures/picture";

export interface ProductResponse {
  id: string;
  skuCode: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  images: Picture[];
}

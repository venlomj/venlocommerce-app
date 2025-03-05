export interface Picture {
  id: string;
  name?: string;
  imageData: File | string;
  imageIdentifier: string;
  productId: string;
  imageType: string;
}

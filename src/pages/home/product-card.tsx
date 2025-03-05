import { FunctionComponent, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const inferImageType = (base64Data: string): string => {
  if (base64Data.startsWith("/9j/")) {
    return "image/jpeg";
  } else if (base64Data.startsWith("iVBORw0KGgo")) {
    return "image/png";
  } else if (base64Data.startsWith("R0lGODlh")) {
    return "image/gif";
  }
  return "image/jpeg";
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const stringToBase64 = (imageString: string): string => {
  return imageString.startsWith("data:") ? imageString : `data:image/jpeg;base64,${imageString}`;
};

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: { imageData: string | File }[];
  };
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  useEffect(() => {
    if (product.images.length > 0) {
      const image = product.images[0];

      if (image.imageData instanceof File) {
        fileToBase64(image.imageData)
          .then((base64String) => {
            const inferredType = inferImageType(base64String);
            const finalBase64String = `data:${inferredType};base64,${base64String.split(",")[1]}`;
            setImageBase64(finalBase64String);
          })
          .catch((error) => {
            console.error("Error converting file to base64:", error);
          });
      } else {
        setImageBase64(stringToBase64(image.imageData));
      }
    }
  }, [product.images]);

  return (
    <Card className="w-full p-4 border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white hover:bg-gray-100">
      <CardHeader className="relative overflow-hidden rounded-lg">
        <img
          src={imageBase64 || "/src/assets/venlomj.png"}
          alt={product.name}
          className="w-full h-28 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105 sm:h-56 md:h-64"
        />
      </CardHeader>

      <CardContent className="space-y-3 mt-4">
        <CardTitle className="text-2xl font-semibold text-gray-900">
          {product.name}
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm">
          {product.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-between items-center mt-4">
        <span className="font-bold text-xl text-gray-800">
          €{product.price.toLocaleString()}
        </span>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-300"
            onClick={onEdit}
          >
            <FaEdit className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-500 border-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-300"
            onClick={onDelete}
          >
            <FaTrashAlt className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

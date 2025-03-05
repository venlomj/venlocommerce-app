import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { ProductRequest } from "@/types/products/product-request";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: ProductRequest) => void;
  product?: ProductRequest; // Optional, used when updating a product
}

export function ProductModal({ isOpen, onClose, onSubmit, product }: ProductModalProps) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [categoryId, setCategoryId] = useState(product?.categoryId || 0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  const handleSubmit = () => {
    const newProduct: ProductRequest = { name, description, price, categoryId };
    onSubmit(newProduct);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">{product ? "Edit Product" : "Create Product"}</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Create Product"}</DialogTitle>
          <DialogDescription>
            {product
              ? "Make changes to the product here. Click save when you're done."
              : "Add a new product here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categoryId" className="text-right">
              Category
            </Label>
            <Input
              id="categoryId"
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            {product ? "Save changes" : "Create product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

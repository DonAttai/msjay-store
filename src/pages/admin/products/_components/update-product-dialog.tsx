import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ImagePreview from "./image-preview";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProductType } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateProduct } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import { updateProductSchema } from "../schemas/update-product-schema";

type PropType = {
  isOpen: boolean;
  toggleModal: () => void;
  product: ProductType;
};

export function UpdateProductDialog({
  isOpen,
  toggleModal,
  product,
}: PropType) {
  const [productImage, setProductImage] = useState("");

  const { isLoading, isSuccess, mutate } = useCreateProduct();
  const form = useForm<ProductType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: productImage,
    },
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file === null) {
      setProductImage("");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      form.setValue("image", reader.result as string);
      setProductImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const categories = ["Men", "Women", "Sports", "Electronics"];

  const onSubmit = async (values: ProductType) => {
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      toggleModal();
      form.reset();
      setProductImage("");
    }
  }, [isSuccess, toggleModal]);

  useEffect(() => {
    if (product) {
      form.setValue("image", product.image);
      setProductImage(product.image);
    }
  }, [product, setProductImage, form]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        toggleModal();
        setProductImage("");
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] overflow-y-scroll max-h-screen my-2"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Upload Product Image"
                      type="file"
                      accept="image/"
                      onChange={handleChangeImage}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Desciption" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Price" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="Stock" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className=" text-white w-full bg-green-400 hover:bg-green-600 text-lg font-bold disabled:opacity-50"
            >
              {isLoading ? "Wait..." : "Update Product"}
            </Button>
          </form>
        </Form>
        <ImagePreview productImage={productImage} />
      </DialogContent>
    </Dialog>
  );
}

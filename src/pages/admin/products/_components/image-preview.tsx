type PropType = {
  productImage: string;
};
export default function ImagePreview({ productImage }: PropType) {
  return (
    <section className="flex justify-center max-w-sm h-fit">
      {productImage && (
        <img src={productImage} alt="Product Image" className="border-2 p-4" />
      )}
    </section>
  );
}

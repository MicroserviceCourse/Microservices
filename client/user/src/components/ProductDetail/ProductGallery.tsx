const images = [
  "/images/p1.jpg",
  "/images/p2.jpg",
  "/images/p3.jpg",
  "/images/p4.jpg",
];

const ProductGallery = () => {
  return (
    <div className="flex gap-6">
      {/* THUMB */}
      <div className="flex flex-col gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-20 h-20 object-cover border cursor-pointer"
          />
        ))}
      </div>

      {/* MAIN */}
      <div className="flex-1">
        <img
          src={images[0]}
          className="w-full h-[520px] object-cover"
        />
      </div>
    </div>
  );
};

export default ProductGallery;

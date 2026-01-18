

const ProductGallery = ({image,images}:any) => {
  return (
    <div className="flex gap-6">
      {/* THUMB */}
      <div className="flex flex-col gap-4">
        {images?.map((img:any, i:any) => (
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
          src={image}
          className="w-full h-[520px] object-cover"
        />
      </div>
    </div>
  );
};

export default ProductGallery;

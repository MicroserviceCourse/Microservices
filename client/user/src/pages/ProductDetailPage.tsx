import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import ProductGallery from '../components/ProductDetail/ProductGallery'
import ProductInfo from '../components/ProductDetail/ProductInfo'
import ProductTabs from '../components/ProductDetail/ProductTabs'
import RelatedProducts from '../components/ProductDetail/RelatedProducts'
import { useEffect, useState } from 'react'
import { getProductById } from '../service/api/Product'
import type { Product } from '../types/product.type'

const ProductDetailPage = () => {
  const {id} =useParams();
  const [data,setData] = useState<Product | null>(null);
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response = await getProductById(Number(id));
        setData(response.data.data || null);
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[id])
  return (
    <>
      <section className={`w-full bg-[#f6f6f6] border-b border-gray-100 pt-20`}>
        <div className="max-w-7xl mx-auto px-10 py-12">
          <Breadcrumb
            items={[{ label: 'Home', href: '/' }, { label: 'Product' }]}
          />
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-10 py-16 space-y-20">
        {/* TOP */}
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-7">
            <ProductGallery image={data?.thumbnailUrl} images={data?.galleryUrls} />
          </div>
          <div className="col-span-5">
            <ProductInfo product={data as Product} />
          </div>
        </div>

        {/* TABS */}
        <ProductTabs description={data?.description} />

        {/* RELATED */}
        <RelatedProducts id={data?.id} />
      </div>
    </>
  )
}
export default ProductDetailPage;
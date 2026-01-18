import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import ProductGallery from '../components/ProductDetail/ProductGallery'
import ProductInfo from '../components/ProductDetail/ProductInfo'
import ProductTabs from '../components/ProductDetail/ProductTabs'
import RelatedProducts from '../components/ProductDetail/RelatedProducts'

const ProductDetailPage = () => {
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
            <ProductGallery />
          </div>
          <div className="col-span-5">
            <ProductInfo />
          </div>
        </div>

        {/* TABS */}
        <ProductTabs />

        {/* RELATED */}
        <RelatedProducts />
      </div>
    </>
  )
}
export default ProductDetailPage;
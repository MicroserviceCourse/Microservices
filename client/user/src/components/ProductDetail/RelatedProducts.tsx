import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { type Product } from '../../types/product.type'
import { getProduct } from '../../service/api/Product';

const RelatedProducts = ({id}:any) => {
  const [data,setData] = useState<Product[]>([]);
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await getProduct({
          page:1,
          size:3,
          filter:`id!=${id}`
        });
        setData(response.data.data.content || []);
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[id])
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10">related products</h2>

      <div className="grid grid-cols-3 gap-10">
        {data.map((product)=>(
          <ProductCard key={product.id} product={product}/>
        ))}
        
      </div>
    </div>
  )
}

export default RelatedProducts

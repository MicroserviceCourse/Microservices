import type { ApiResponse } from '../../types'
import type { CartResponse } from '../../types/cart.type'
import Http from '../http/http'

export const addCart = async (data: any) => {
  const response = await Http.post('/api/carts', data)
  return response.data
}
export const getCartCount = async () => {
  const response = await Http.get('/api/carts/count')
  return response.data.data
}

export const getCart = async()=>{
  return await Http.get<ApiResponse<CartResponse>>("/api/carts")
}

export const updateQuantityCart = async(data:any)=>{
  return await Http.patch("/api/carts",data,{
  })

}
export const deleteCart =async(data:any)=>{
  return await Http.delete("/api/carts",data)

}
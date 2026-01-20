
export interface CartItemResponse{
    id:number;
    cartId:number;
    productId:number;
    quantity:number;
    price:number;
}
export interface CartResponse {
    totalPrice:number;
    cartItems:CartItemResponse[];

}
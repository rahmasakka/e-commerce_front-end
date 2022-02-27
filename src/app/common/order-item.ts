import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl: string;
    uintPrice: number;
    quantity: number;
    productId: string;

    constructor(cartItem: CartItem){
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.uintPrice = cartItem.unitPrice;
        this.productId = cartItem.id;
    }
}

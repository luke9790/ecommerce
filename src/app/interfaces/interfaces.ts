export interface Product {
	id: number;
	name: string;
	description: string;
	label: string;
	brand: string;
	stock: number;
	image: string;
	categoryId: number;
	subCategoryId: number; 
	type: 'male' | 'female' | 'unisex';
	isFeatured: boolean;
	price: number;
	currency: string;
	discount: number;
  }

  export interface ShippingAddress {
	id?: number;
	address_line1: string;
	address_line2?: string;
	city: string;
	state: string;
	postal_code: string;
	country: string;
  }

  export interface Order {
	id?: number;
	cartItems: { product_id: number; quantity: number; price: number }[];
	total_price: number;
	payment_method: string;
	shipping_address: string;
  }
  
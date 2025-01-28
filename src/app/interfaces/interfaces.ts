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

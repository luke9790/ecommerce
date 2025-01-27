export interface Product {
	id: number;
	name: string;
	description: string;
	label: string; // Etichetta (es. Premium, Regular)
	brand: string; // Marca del prodotto (es. Nike)
	stock: number; // Quantità disponibile
	image: string;
	categoryId: number; // Identificativo della categoria
	subCategoryId: number; 
	type: 'male' | 'female' | 'unisex';
	isFeatured: boolean;
	price: number;
	currency: string;
	discount: number;
  }
  
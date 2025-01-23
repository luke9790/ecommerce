export interface Product {
	id: number; // Identificativo unico del prodotto
	name: string; // Nome del prodotto
	description: string; // Descrizione del prodotto
	label: string; // Etichetta (es. Premium, Regular)
	brand: string; // Marca del prodotto (es. Nike)
	stock: number; // Quantità disponibile
	image: string; // URL dell'immagine
	categoryId: number; // Identificativo della categoria
	type: 'male' | 'female' | 'unisex'; // Tipo del prodotto
	isFeatured: boolean; // Indica se è in evidenza
	price: number; // Prezzo
	currency: string; // Valuta (es. USD, EUR)
	discount?: number; // Percentuale di sconto (opzionale)
  }
  
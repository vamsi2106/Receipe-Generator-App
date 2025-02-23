export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  price: number;
}

export interface CartItem extends Ingredient {
  recipeId: string;
  recipeName: string;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}
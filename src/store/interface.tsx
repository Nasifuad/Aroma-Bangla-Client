// 👇 Define the expected input for addProduct
interface NewProductInput {
  name: string;
  brand: string;
  description: string;
  tags: string;
  price: string;
  discount: number;
  quantity: string;
  sold: string;
  netWeight: string;
  type: string;
  flavor: string;
  reviews: string;
  rating: string;
  user: string;
  image_small: File[];
  image_big: File[];
}

interface Product {
  category: string;
  rating: number;
  reviews?: string[];
  description: string;
  tags: string[];
  type: string;
  flavor: string;
  netWeight: string;
  quantity: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
  brand: string;
  _id: string;
  name: string;
  price: number;
  image_small: string;
  image_big?: string;
  discount: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}
interface Filters {
  minPrice: number;
  maxPrice: number;
  priceRange: string;
  category: string;
  brand: string;
  sort: string;
  sortby: "Newest" | "Price: High to Low" | "Price: Low to High" | "Best Rated";
}

interface ProductStore {
  products: Product[];
  specificProduct?: Product;
  isFetching: boolean;
  cartItems: CartItem[];
  cartCount: number;
  filters: Filters;
  setProducts: (products: Product[]) => void;
  getProduct: () => Promise<void>;
  getProductById: (id: string) => Promise<void>;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  incrementCartItem: (productId: string) => void;
  decrementCartItem: (productId: string) => void;
  addProduct: (product: NewProductInput) => Promise<void>;
  // Function to set filters
  setFilter: (name: keyof Filters, value: string | number) => void;
  clearFilters: () => void;
}

export type { NewProductInput, Product, CartItem, ProductStore, Filters };

// 👇 Define the expected input for addProduct
interface NewProductInput {
  name: string;
  brand: string;
  description: string;
  tags: string;
  price: string;
  discount: string;
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
  _id: string;
  name: string;
  price: number;
  image_small: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductStore {
  products: Product[];
  specificProduct?: Product;
  isFetching: boolean;
  cartItems: CartItem[];
  cartCount: number;
  setProducts: (products: Product[]) => void;
  getProduct: () => Promise<void>;
  getProductById: (id: string) => Promise<void>;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  incrementCartItem: (productId: string) => void;
  decrementCartItem: (productId: string) => void;
  addProduct: (product: NewProductInput) => Promise<void>;
}

export type { NewProductInput, Product, CartItem, ProductStore };

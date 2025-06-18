import { create } from "zustand";

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
}

const apiUrl = "https://yelp-khoh.onrender.com/api/product";

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  specificProduct: undefined,
  cartItems: [],
  cartCount: 0,
  isFetching: false,
  setProducts: (products) => set({ products }),
  getProduct: async () => {
    try {
      set({ isFetching: true });
      const response = await fetch(`${apiUrl}/getProducts`);
      const data = await response.json();
      set({ products: data.data, isFetching: false });
    } catch (error) {
      console.log(error);
      set({ isFetching: false });
    }
  },
  getProductById: async (id: string) => {
    try {
      set({ isFetching: true });
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      console.log("Fetched product by ID:", data);
      set({ specificProduct: data.data, isFetching: false });
    } catch (error) {
      console.log(error);
      set({ isFetching: false });
    }
  },
  addToCart: (product, quantity) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.product._id === product._id
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { product, quantity }],
        };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => item.product._id !== productId
      ),
    })),
  incrementCartItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),
  decrementCartItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
}));

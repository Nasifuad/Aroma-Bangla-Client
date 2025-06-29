import { create } from "zustand";
import type { ProductStore, NewProductInput } from "./interface";

const apiUrl = "https://yelp-khoh.onrender.com/api/product";

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  specificProduct: undefined,
  cartItems: [],
  cartCount: 0,
  isFetching: false,
  filters: {
    minPrice: 0,
    maxPrice: 0,
    priceRange: "",
    category: "",
    brand: "",
    sort: "",
    sortby: "Newest",
  },
  setProducts: (products) => set({ products }),
  getProduct: async () => {
    try {
      set({ isFetching: true });
      const response = await fetch(`${apiUrl}/getProducts`);
      const data = await response.json();
      set({ products: data.data, isFetching: false });
      console.log("Fetched products:", data);
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
      console.log("Fetched produ  ct by ID:", data);
      set({ specificProduct: data, isFetching: false });
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
  addProduct: async (product: NewProductInput) => {
    try {
      const formData = new FormData();
      console.log("Adding product with data:", product);

      Object.entries(product).forEach(([key, value]) => {
        if (key !== "image_small" && key !== "image_big") {
          formData.append(key, value);
        }
      });

      product.image_small.forEach((file) =>
        formData.append("image_small", file)
      );
      product.image_big.forEach((file) => formData.append("image_big", file));

      const response = await fetch(`${apiUrl}/addProduct`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("✅ Product added successfully:", data);
    } catch (error) {
      console.error("❌ Error adding product:", error);
    }
  },

  setFilter: (name, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [name]: value,
      },
    })),

  clearFilters: () =>
    set(() => ({
      filters: {
        minPrice: 0,
        maxPrice: 0,
        priceRange: "",
        category: "",
        brand: "",
        sort: "",
        sortby: "Newest",
      },
    })),
}));

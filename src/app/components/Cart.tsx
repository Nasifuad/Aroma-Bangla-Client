/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import { motion, AnimatePresence } from "framer-motion";

interface CartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, setIsOpen }) => {
  const { cartItems, removeFromCart, incrementCartItem, decrementCartItem } =
    useProductStore();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((total, item) => total + item.product.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="border-b border-gray-100 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <SheetTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-amber-500" />
                Your Cart
                {totalItems > 0 && (
                  <Badge className="bg-amber-500 text-white">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </Badge>
                )}
              </SheetTitle>
              <SheetDescription className="text-gray-500 mt-1">
                {totalItems > 0
                  ? "Review your items before checkout"
                  : "Your cart is waiting to be filled"}
              </SheetDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-500 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <AnimatePresence>
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full text-center py-12"
              >
                <div className="bg-gray-100 rounded-full p-6 mb-6">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6 max-w-xs">
                  Looks like you haven`t added anything to your cart yet
                </p>
                <Button
                  variant="outline"
                  className="border-amber-500 text-amber-600 hover:bg-amber-50"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </motion.div>
            ) : (
              <motion.ul className="space-y-4">
                {cartItems.map((item) => (
                  <motion.li
                    key={item.product._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-shadow"
                  >
                    <div className="bg-gray-100 rounded-lg p-1 flex-shrink-0">
                      <img
                        src={item.product.image_small}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-amber-600 font-medium mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 hover:bg-gray-50"
                            onClick={() => decrementCartItem(item.product._id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 hover:bg-gray-50"
                            onClick={() => incrementCartItem(item.product._id)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 whitespace-nowrap">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {cartItems.length > 0 && (
          <SheetFooter className="border-t border-gray-100 px-6 py-4 bg-white sticky bottom-0">
            <div className="w-full">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gray-700 font-medium">Subtotal</p>
                  <p className="text-xs text-gray-500">
                    Shipping calculated at checkout
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900">${totalPrice}</p>
              </div>
              <Button
                className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
                onClick={() => alert("Proceeding to checkout...")}
              >
                Proceed to Checkout
              </Button>
              <div className="mt-3 text-center">
                <Button
                  variant="link"
                  className="text-amber-600 underline"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

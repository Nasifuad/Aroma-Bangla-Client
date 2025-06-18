/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";

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
      <SheetContent className="w-[90vw] sm:w-[400px] flex flex-col">
        <SheetHeader className="flex flex-row justify-between items-start">
          <div>
            <SheetTitle>
              Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
            </SheetTitle>
            <SheetDescription>
              Review your items and proceed to checkout.
            </SheetDescription>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon"></Button>
          </SheetClose>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto my-4">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.product._id}
                  className="flex items-center space-x-4 border-b pb-2"
                >
                  <img
                    src={item.product.image_small}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => decrementCartItem(item.product._id)}
                    >
                      -
                    </Button>
                    <Badge variant="secondary">{item.quantity}</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => incrementCartItem(item.product._id)}
                    >
                      +
                    </Button>
                  </div>
                  <p className="font-medium w-20 text-right">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cartItems.length > 0 && (
          <SheetFooter className="border-t pt-4">
            <div className="w-full">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">
                  Total ({totalItems} {totalItems === 1 ? "item" : "items"}):
                </span>
                <span className="font-bold">${totalPrice}</span>
              </div>
              <Button
                className="w-full"
                disabled={cartItems.length === 0}
                onClick={() => alert("Proceeding to checkout...")}
              >
                Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

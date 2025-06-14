import React, { useState } from "react";
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

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, setIsOpen }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Brewed Coffee", price: 4.99, quantity: 2 },
    { id: 2, name: "Coffee Beans (500g)", price: 12.99, quantity: 1 },
    { id: 3, name: "Instant Coffee (100g)", price: 6.99, quantity: 3 },
  ]);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[90vw] sm:w-[400px] flex flex-col">
        <SheetHeader className="flex flex-row justify-between items-start">
          <div>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Review your items and proceed to checkout.
            </SheetDescription>
          </div>
          <SheetClose asChild>
            <Button variant="ghost" size="icon">
              {/* <X className="h-5 w-5" /> */}
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto my-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Your cart is empty.
            </p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </Button>
                      <Badge variant="secondary">{item.quantity}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <SheetFooter className="border-t pt-4">
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total:</span>
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
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

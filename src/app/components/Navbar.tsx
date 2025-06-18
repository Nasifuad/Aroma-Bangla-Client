"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, SearchIcon, ShoppingCartIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import Cart from "./Cart";
import { useProductStore } from "@/store/useProductStore";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const handleClose = () => setMobileOpen(false);
  const { cartItems } = useProductStore();

  // Calculate total items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between gap-4 flex-wrap">
        {/* Logo / Title */}
        <Link
          href="/"
          className="text-xl font-bold text-green-700 whitespace-nowrap"
        >
          Aroma- <span className="text-[#FFD700]">Bangla</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-2 p-2">
                  <li>
                    <Link
                      href="/product"
                      className="block px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      Coffee
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/category/machines"
                      className="block px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      Machines
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/about">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md w-full mx-2">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        </div>

        {/* Cart + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button onClick={() => setIsCartOpen(true)}>
              <ShoppingCartIcon className="text-3xl" />
              {/* Cart item count badge */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileOpen(true)} className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClose}
          ></div>
          <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col space-y-4 animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={handleClose}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <Link
              href="/"
              onClick={handleClose}
              className="hover:text-green-600"
            >
              Home
            </Link>
            <Link
              href="/category/coffee"
              onClick={handleClose}
              className="hover:text-green-600"
            >
              Coffee
            </Link>
            <Link
              href="/category/machines"
              onClick={handleClose}
              className="hover:text-green-600"
            >
              Machines
            </Link>
            <Link
              href="/about"
              onClick={handleClose}
              className="hover:text-green-600"
            >
              About
            </Link>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </div>
  );
};

export default Navbar;

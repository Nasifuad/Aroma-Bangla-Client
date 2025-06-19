"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import Cart from "./Cart";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { cartItems } = useProductStore();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-sm shadow-sm py-2 border-b border-gray-100"
          : "bg-white py-3"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.span
              className="text-xl font-bold tracking-tight"
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-gray-900">Aroma</span>
              <span className="text-amber-600">Bangla</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/product">Coffee</NavLink>
            <NavLink href="/category/machines">Machines</NavLink>
            <NavLink href="/category/accessories">Accessories</NavLink>
            <NavLink href="/addProduct">Add Product</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 text-gray-800 focus:outline-none focus:ring-1 focus:ring-amber-500 border border-gray-200 transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center gap-5">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  className="absolute top-0 right-0 text-xs bg-amber-500 text-white rounded-full h-5 w-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="absolute top-0 right-0 h-full w-80 bg-white shadow-xl"
              // initial={{ x: "100%" }}
              // animate={{ x: 0 }}
              // exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30 }}
            >
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">
                    <span className="text-gray-900">Aroma</span>
                    <span className="text-amber-600">Bangla</span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-6">
                <MobileNavLink href="/" onClick={() => setMobileOpen(false)}>
                  Home
                </MobileNavLink>
                <MobileNavLink
                  href="/product"
                  onClick={() => setMobileOpen(false)}
                >
                  Coffee
                </MobileNavLink>
                <MobileNavLink
                  href="/category/machines"
                  onClick={() => setMobileOpen(false)}
                >
                  Machines
                </MobileNavLink>
                <MobileNavLink
                  href="/category/accessories"
                  onClick={() => setMobileOpen(false)}
                >
                  Accessories
                </MobileNavLink>
                <MobileNavLink
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                >
                  About
                </MobileNavLink>

                <div className="pt-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-50 text-gray-800 focus:outline-none focus:ring-1 focus:ring-amber-500 border border-gray-200"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Cart isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </header>
  );
};

// Reusable NavLink component
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href}>
    <motion.span
      className="text-gray-700 hover:text-amber-600 transition-colors relative group"
      whileHover={{ y: -2 }}
    >
      {children}
      <span className="absolute left-0 bottom-0 h-px w-0 bg-amber-600 transition-all duration-300 group-hover:w-full" />
    </motion.span>
  </Link>
);

// Mobile NavLink component
const MobileNavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Link href={href} onClick={onClick}>
    <div className="text-lg font-medium text-gray-800 py-3 border-b border-gray-100 hover:text-amber-600 transition-colors">
      {children}
    </div>
  </Link>
);

export default Navbar;

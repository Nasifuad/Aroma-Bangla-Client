"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Search, ShoppingCart, Sun, Moon } from "lucide-react";
import { useProductStore } from "@/store/useProductStore";
import Cart from "./Cart";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/uiStore";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useUIStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  // const [isDarkMode, setIsDarkMode] = React.useState(false);
  const { cartItems } = useProductStore();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dark mode
  // const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? `${
              isDarkMode
                ? "bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-800"
                : "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200"
            } py-2`
          : `${isDarkMode ? "bg-gray-900" : "bg-white"} py-4`
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.span
              className="text-2xl font-semibold tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className={isDarkMode ? "text-gray-100" : "text-gray-900"}>
                Aroma
              </span>
              <span className="text-amber-500">Bangla</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/" isDarkMode={isDarkMode}>
              Home
            </NavLink>
            <NavLink href="/product" isDarkMode={isDarkMode}>
              Coffee
            </NavLink>
            <NavLink href="/category/machines" isDarkMode={isDarkMode}>
              Machines
            </NavLink>
            <NavLink href="/category/accessories" isDarkMode={isDarkMode}>
              Accessories
            </NavLink>
            <NavLink href="/product" isDarkMode={isDarkMode}>
              See All Products
            </NavLink>
            <NavLink href="/about" isDarkMode={isDarkMode}>
              About
            </NavLink>
          </nav>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xs mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className={`w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border-none transition-all ${
                  isDarkMode
                    ? "bg-gray-800 text-gray-100"
                    : "bg-gray-100 text-gray-900"
                }`}
                aria-label="Search products"
              />
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
          </div>

          {/* Cart, Theme Toggle, and Mobile Menu */}
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 transition-colors ${
                isDarkMode
                  ? "text-gray-300 hover:text-amber-500"
                  : "text-gray-600 hover:text-amber-600"
              }`}
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 text-xs bg-amber-500 text-white rounded-full h-4 w-4 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "text-gray-300 hover:text-amber-500"
                  : "text-gray-600 hover:text-amber-600"
              }`}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.button>

            <button
              onClick={() => setMobileOpen(true)}
              className={`md:hidden p-2 transition-colors ${
                isDarkMode
                  ? "text-gray-300 hover:text-amber-500"
                  : "text-gray-600 hover:text-amber-600"
              }`}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className={`absolute top-0 right-0 h-full w-80 shadow-lg ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              }`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`p-4 flex justify-between items-center border-b ${
                  isDarkMode ? "border-gray-800" : "border-gray-200"
                }`}
              >
                <span className="text-xl font-semibold">
                  <span
                    className={isDarkMode ? "text-gray-100" : "text-gray-900"}
                  >
                    Aroma
                  </span>
                  <span className="text-amber-500">Bangla</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className={`p-2 rounded-full ${
                    isDarkMode
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="p-4 space-y-2">
                <MobileNavLink
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  isDarkMode={isDarkMode}
                >
                  Home
                </MobileNavLink>
                <MobileNavLink
                  href="/product"
                  onClick={() => setMobileOpen(false)}
                  isDarkMode={isDarkMode}
                >
                  Coffee
                </MobileNavLink>
                <MobileNavLink
                  href="/category/machines"
                  onClick={() => setMobileOpen(false)}
                  isDarkMode={isDarkMode}
                >
                  Machines
                </MobileNavLink>
                <MobileNavLink
                  href="/category/accessories"
                  onClick={() => setMobileOpen(false)}
                  isDarkMode={isDarkMode}
                >
                  Accessories
                </MobileNavLink>
                <MobileNavLink
                  href="/addProduct"
                  onClick={() => setMobileOpen(false)}
                  isDarkMode={isDarkMode}
                >
                  Add Product
                </MobileNavLink>
                <MobileNavLink
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  isDarkMode={isDarkMode}
                >
                  About
                </MobileNavLink>
              </nav>

              <div className="p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className={`w-full pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border-none ${
                      isDarkMode
                        ? "bg-gray-800 text-gray-100"
                        : "bg-gray-100 text-gray-900"
                    }`}
                    aria-label="Search products"
                  />
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
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
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isDarkMode: boolean;
}
// Reusable NavLink component
const NavLink = ({ href, children, isDarkMode }: NavLinkProps) => (
  <Link href={href}>
    <motion.span
      className={`text-sm font-medium relative group transition-colors ${
        isDarkMode
          ? "text-gray-300 hover:text-amber-500"
          : "text-gray-600 hover:text-amber-600"
      }`}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      <span
        className={`absolute left-0 bottom-0 h-0.5 w-0 ${
          isDarkMode ? "bg-amber-500" : "bg-amber-600"
        } transition-all duration-300 group-hover:w-full`}
      />
    </motion.span>
  </Link>
);
interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isDarkMode: boolean;
}

// Mobile NavLink component
const MobileNavLink = ({
  href,
  children,
  onClick,
  isDarkMode,
}: MobileNavLinkProps) => (
  <Link href={href} onClick={onClick}>
    <div
      className={`text-base font-medium py-3 px-2 rounded-md transition-colors ${
        isDarkMode
          ? "text-gray-300 hover:text-amber-500 hover:bg-gray-800"
          : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
      }`}
    >
      {children}
    </div>
  </Link>
);

export default Navbar;

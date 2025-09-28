import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ShoppingCart, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-serif font-semibold tracking-tight text-primary">
                quartumgalleri
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/artworks" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/artworks' ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              Artworks
            </Link>
            <Link 
              to="/artists" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/artists' ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              Artists
            </Link>
            <Link 
              to="/events" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/events' ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              Events
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/about' ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/contact' ? 'text-primary' : 'text-foreground/60'
              }`}
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link 
                      to="/" 
                      className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                        location.pathname === '/' ? 'text-primary' : 'text-foreground/60'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </Link>
                    <Link 
                      to="/artworks" 
                      className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                        location.pathname === '/artworks' ? 'text-primary' : 'text-foreground/60'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Artworks
                    </Link>
                    <Link 
                      to="/artists" 
                      className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                        location.pathname === '/artists' ? 'text-primary' : 'text-foreground/60'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Artists
                    </Link>
                    <Link 
                      to="/events" 
                      className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                        location.pathname === '/events' ? 'text-primary' : 'text-foreground/60'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Events
                    </Link>
                    <Link 
                      to="/about" 
                      className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                        location.pathname === '/about' ? 'text-primary' : 'text-foreground/60'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      About
                    </Link>
                    <Link 
                      to="/contact" 
                      className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                        location.pathname === '/contact' ? 'text-primary' : 'text-foreground/60'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </Link>
                    <div className="border-t border-border mt-4 pt-4">
                      <Link 
                        to="/cart" 
                        className="flex items-center px-3 py-2 text-base font-medium transition-colors hover:text-primary text-foreground/60"
                        onClick={() => setIsOpen(false)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Winkelwagen
                        {itemCount > 0 && (
                          <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                            {itemCount}
                          </Badge>
                        )}
                      </Link>
                      <Link 
                        to="/dashboard" 
                        className="flex items-center px-3 py-2 text-base font-medium transition-colors hover:text-primary text-foreground/60"
                        onClick={() => setIsOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
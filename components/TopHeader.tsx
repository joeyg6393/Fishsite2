'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function TopHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="text-2xl font-bold text-blue-600">The Reel Authority</Link>
        </div>
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none`}>
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 p-4 lg:p-0">
            <li><Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
            <li><Link href="/recent-articles" className="text-gray-600 hover:text-blue-600">Articles</Link></li>
            <li><Link href="/categories/gear-reviews" className="text-gray-600 hover:text-blue-600">Gear Reviews</Link></li>
            <li><Link href="/categories/best-products" className="text-gray-600 hover:text-blue-600">Product Comparisons</Link></li>
            <li><Link href="/categories/fishing-spots" className="text-gray-600 hover:text-blue-600">Fishing Spots</Link></li>
            <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link></li>
          </ul>
        </nav>
        <div className="hidden lg:block">
          <div className="relative">
            <Input type="search" placeholder="Search..." className="pl-8 pr-4 py-2 rounded-full" />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}

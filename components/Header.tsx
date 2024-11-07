import Link from 'next/link';
import { Input } from '@/components/ui/input';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-blue-600">
            The Reel Authority
          </Link>
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm">
                Home
              </Link>
              <Link href="/recent-articles" className="text-gray-600 hover:text-blue-600 text-sm">
                Recent Articles
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 text-sm">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 text-sm">
                Contact
              </Link>
            </nav>
            <div className="relative w-56">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full h-8 pl-3 pr-8 text-sm border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
              />
              <svg
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

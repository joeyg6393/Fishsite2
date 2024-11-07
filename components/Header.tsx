import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            The Reel Authority
          </Link>
          <div className="space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/recent-articles" className="text-gray-600 hover:text-blue-600">
              Recent Articles
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

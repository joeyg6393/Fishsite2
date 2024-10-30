'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, ChevronRight, Facebook, Twitter, Instagram, Youtube, MapPin, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Post } from '@/types';

interface EnhancedHomePageProps {
  posts: Post[];
}

export function EnhancedHomePage({ posts }: EnhancedHomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get the most recent 5 articles
  const recentArticles = posts.slice(0, 5);

  // Filter fishing spots articles - check for multiple possible category names
  const fishingSpots = posts.filter(post => 
    post.categories.nodes.some(category => 
      ['fishing-spots', 'fishing spots', 'locations'].some(term => 
        category.slug?.toLowerCase().includes(term) || 
        category.name.toLowerCase().includes(term)
      )
    )
  ).slice(0, 5);

  // Filter gear reviews - check for multiple possible category names
  const gearReviews = posts.filter(post =>
    post.categories.nodes.some(category => 
      ['gear-reviews', 'gear reviews', 'equipment', 'gear'].some(term => 
        category.slug?.toLowerCase().includes(term) || 
        category.name.toLowerCase().includes(term)
      )
    )
  ).slice(0, 5);

  // Get the featured image from the most recent fishing spot
  const featuredSpotImage = fishingSpots[0]?.featuredImage?.node.sourceUrl || 'https://images.unsplash.com/photo-1542372147193-a7aca54189cd?q=80&w=1974&auto=format&fit=crop';

  const categories = [
    { name: 'Bass Fishing', icon: '🐟', slug: 'bass-fishing', id: 'dGVybToxMw==' },
    { name: 'Deep Sea Fishing', icon: '🚢', slug: 'deep-sea-fishing', id: 'dGVybToxMg==' },
    { name: 'Fishing Spots', icon: '🗺️', slug: 'fishing-spots', id: 'dGVybToyMA==' },
    { name: 'Fly Fishing', icon: '🪰', slug: 'fly-fishing', id: 'dGVybToxNA==' },
    { name: 'Freshwater Fishing', icon: '🎣', slug: 'freshwater-fishing', id: 'dGVybToxNQ==' },
    { name: 'Gear Reviews', icon: '🎮', slug: 'gear-reviews', id: 'dGVybTo4' },
    { name: 'Ice Fishing', icon: '❄️', slug: 'ice-fishing', id: 'dGVybToxNg==' },
    { name: 'Kayak Fishing', icon: '🛶', slug: 'kayak-fishing', id: 'dGVybToxNw==' },
    { name: 'Saltwater Fishing', icon: '🌊', slug: 'saltwater-fishing', id: 'dGVybToxOA==' },
    { name: 'Trout Fishing', icon: '🐠', slug: 'trout-fishing', id: 'dGVybTox' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <li><Link href="/categories/fishing-spots" className="text-gray-600 hover:text-blue-600">Fishing Spots</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
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

      {/* Recent Articles Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Recent Articles</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {recentArticles.map((post) => (
                <CarouselItem key={post.id}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    {post.featuredImage && (
                      <div className="relative h-[400px] w-full">
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText || post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-3">{post.title}</h3>
                      <div 
                        className="text-gray-600 mb-4 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                      <Button asChild>
                        <Link href={`/posts/${post.slug}`}>Read More</Link>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Popular Fishing Spots */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Popular Fishing Spots</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Image */}
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={featuredSpotImage}
                alt="Featured Fishing Spot"
                fill
                className="object-cover"
              />
            </div>
            {/* Recent Locations List */}
            <div className="space-y-4">
              {fishingSpots.map((spot) => (
                <Link
                  key={spot.id}
                  href={`/posts/${spot.slug}`}
                  className="block bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      {spot.featuredImage && (
                        <Image
                          src={spot.featuredImage.node.sourceUrl}
                          alt={spot.featuredImage.node.altText || spot.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{spot.title}</h3>
                      <div 
                        className="text-gray-600 text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: spot.excerpt }}
                      />
                    </div>
                    <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  </div>
                </Link>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/categories/fishing-spots">View All Fishing Spots</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Gear Reviews */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest Gear Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gearReviews.length > 0 ? (
              gearReviews.map((review) => (
                <Link
                  key={review.id}
                  href={`/posts/${review.slug}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
                >
                  <div className="relative h-48">
                    {review.featuredImage && (
                      <Image
                        src={review.featuredImage.node.sourceUrl}
                        alt={review.featuredImage.node.altText || review.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
                    <div 
                      className="text-gray-600 text-sm line-clamp-2 mb-3"
                      dangerouslySetInnerHTML={{ __html: review.excerpt }}
                    />
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600">No gear reviews available at the moment.</p>
              </div>
            )}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/categories/gear-reviews">View All Gear Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Fishing Categories</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300 flex flex-col items-center"
              >
                <span className="text-4xl mb-2">{category.icon}</span>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
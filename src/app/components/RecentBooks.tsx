'use client';

import { WeReadBook } from '@/types/weread';
import MediaCard from './MediaCard';

interface RecentBooksProps {
  books: WeReadBook[];
}

export default function RecentBooks({ books }: RecentBooksProps) {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-4">最近在读</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((book) => (
          <MediaCard
            key={book.bookId}
            title={book.title}
            cover={book.cover}
            author={book.author}
          />
        ))}
      </div>
    </div>
  );
} 
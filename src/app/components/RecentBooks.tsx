'use client';

import { WeReadBook } from '@/types/weread';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

interface RecentBooksProps {
  books: WeReadBook[];
}

export default function RecentBooks({ books }: RecentBooksProps) {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-4">最近在读</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((book) => (
          <Card shadow="sm" key={book.bookId} isPressable>
            <CardBody className="p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={book.title}
                className="object-cover w-full aspect-[0.625]"
                src={book.cover}
              />
            </CardBody>
            <CardFooter className="text-small flex-col items-center">
              <b className="line-clamp-1 text-center">{book.title}</b>
              <p className="text-default-500 text-tiny line-clamp-1 text-center">{book.author}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 
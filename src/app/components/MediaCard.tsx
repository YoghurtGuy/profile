'use client';

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from 'next/link';

interface MediaCardProps {
  title: string;
  cover: string;
  author?: string;
  link?: string;
  rating?: string;
  comment?: string;
  priority?: boolean;
}

export default function MediaCard({
  title,
  cover,
  author,
  link,
  rating,
  comment,
}: MediaCardProps) {
  const content = (
    <Card 
      shadow="sm" 
      isPressable={!!link}
      className="rounded-xl overflow-hidden"
    >
      <CardBody className="p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={title}
          className="object-cover w-full aspect-[0.625]"
          src={cover}
        />
      </CardBody>
      <CardFooter className="text-small flex-col items-center">
        <b className="line-clamp-1 text-center">{title}</b>
        {author && <p className="text-default-500 text-tiny line-clamp-1 text-center">{author}</p>}
        {rating && <p className="text-xs text-default-500">评分: {rating}</p>}
        {process.env.SHOW_DOUBAN_COMMENT === "true" && comment && (
          <p className="text-xs text-default-600 mt-1 line-clamp-2">{comment}</p>
        )}
      </CardFooter>
    </Card>
  );

  if (link) {
    return (
      <Link href={link} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
} 
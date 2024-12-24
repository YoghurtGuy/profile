import { MovieItem } from '@/types/douban';
import Link from 'next/link';
import Image from 'next/image';

interface RecentVideoProps {
  movies: MovieItem[];
}

export default function RecentVideo({ movies }: RecentVideoProps) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">最近在看</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.slice(0, 10).map((movie, index) => (
          <a
            key={index}
            className="bg-content1 rounded-lg overflow-hidden shadow-lg"
            href={movie.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {movie.cover && (
              <div className="relative w-full h-80">
                <Image
                  src={movie.cover}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover"
                  priority={index < 4}
                />
              </div>
            )}
            <div className="p-3">
              <Link
                href={movie.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <h3 className="text-base font-semibold mb-1 line-clamp-1 text-center">{movie.title}</h3>
              </Link>
              {movie.rating && (
                <p className="text-xs text-default-500">评分: {movie.rating}</p>
              )}
              {process.env.SHOW_DOUBAN_COMMENT == "true" && movie.comment && (
                <p className="text-xs text-default-600 mt-1 line-clamp-2">
                  {movie.comment}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
} 
"use client";

import { MovieItem } from "@/types/douban";
import MediaCard from "./MediaCard";

interface RecentVideoProps {
    movies: MovieItem[];
}

export default function RecentVideo({ movies }: RecentVideoProps) {
    return (
        <section className="my-8">
            <h2 className="text-2xl font-bold mb-4">最近在看</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie, index) => (
                    <div
                        className={`${index >= 4 ? "hidden" : "block"} sm:${
                            index >= 3 ? "hidden" : "block"
                        } md:${index >= 4 ? "hidden" : "block"}  lg:block`}
                        key={`movie-${index}`}
                    >
                        <MediaCard
                            
                            title={movie.title}
                            cover={movie.cover}
                            link={movie.link}
                            rating={movie.rating}
                            comment={movie.comment}
                            priority={index < 4}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

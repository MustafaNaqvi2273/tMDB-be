export interface Filters {
    page: number;
    limit: number;
    query?: {
        genre: string
    }
}

export interface TMDBResponse {
    overview: string;
    popularity: number;
    vote_count: number;
}
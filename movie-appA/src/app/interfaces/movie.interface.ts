export interface MovieDto {
    id: number;
    title: string;
    yearOfCreation?: number;
    imdbRating: number;
    genre: string;
    description: string;
}
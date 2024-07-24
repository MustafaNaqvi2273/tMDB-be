import { moviesModel } from "../models/movies";
import csvParser from "csv-parser";
import path from "path";
import fs from 'fs';

interface CSVResults {
    Pos: number;
    Title: string;
    Director: string;
    Year: string;
    Country: string;
    Length: number;
    Genre: string;
}

export const seedData = async() => {
    const results: CSVResults[] = [];
    const filePath = path.join(__dirname, '../../BackendData.csv')

    fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        const formattedData = results.map((result) => ({
            title: result.Title,
            director: result.Director,
            year: result.Year,
            country: result.Country,
            genre: result.Genre
        }))
        await moviesModel.insertMany(formattedData);
        console.log('Data successfully seeded');
      } catch (error) {
        console.error('Error seeding data:', error);
      }
    });
}
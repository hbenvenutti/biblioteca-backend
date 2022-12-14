import { BookCreationData } from '@books:dtos/Book';

// ---------------------------------------------------------------------------------------------- //

export const generateOneBook = (): BookCreationData => {
  return {
    title: 'title',
    author: 'author',
    publisher: 'publisher',
    edition: 'edition',
    synopsis: 'synopsis'
  };
};

export const generateThreeBooks = (): BookCreationData[] => {
  const books: BookCreationData[] = [];
  let counter = 1;

  while (counter < 3) {
    books.push({
      title: `title${counter}`,
      author: `author${counter}`,
      publisher: `publisher${counter}`,
      edition: `edition${counter}`,
      synopsis: `synopsis${counter}`
    });

    counter++;
  }

  books.push({
    title: 'teste',
    author: 'teste',
    publisher: 'teste',
    edition: 'teste',
    synopsis: 'teste'
  });

  return books;
};

export interface InvalidBook {
  id?: string,
  title?: string | boolean;
  author?: string | boolean;
  publisher?: string | boolean;
  edition?: string | boolean;
  synopsis?: string | boolean;
}

export interface TestBook {
  id: string,
  title: string;
  author: string;
  publisher: string;
  edition: string;
  synopsis: string;
}

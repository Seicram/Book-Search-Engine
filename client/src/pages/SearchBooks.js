import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState('');

  const [saveBook] = useMutation(SAVE_BOOK, {
    update(cache, { data: { saveBook } }) {
      try {
        const { me } = cache.readQuery({ query: GET_ME });
        cache.writeQuery({
          query: GET_ME,
          data: { me: { ...me, savedBooks: [...me.savedBooks, saveBook] } },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleSaveBook = async (bookData) => {
    try {
      await saveBook({
        variables: { input: bookData },
      });
      // Handle success
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  return (
    <div>
      {/* Your JSX code goes here */}
    </div>
  );
};

export default SearchBooks;

// SavedBooks.js

import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME, REMOVE_BOOK } from '../utils/queries';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
        update(cache) {
          const { me } = cache.readQuery({ query: GET_ME });
          cache.writeQuery({
            query: GET_ME,
            data: { me: { ...me, savedBooks: me.savedBooks.filter((book) => book.bookId !== bookId) } },
          });
        },
      });
      // Handle success
    } catch (err) {
      console.error(err);
      // Handle error
    }
  };

  // Rest of the component code
};

export default SavedBooks;

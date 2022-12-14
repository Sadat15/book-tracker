import React, { useState } from "react";
import BookDataService from "../services/BookService";

const AddBook = () => {
  const initialBookState = {
    id: null,
    title: "",
    description: "",
    completed: false,
    genre: "",
  };
  const [book, setBook] = useState(initialBookState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const saveBook = () => {
    var data = {
      title: book.title,
      description: book.description,
      genre: book.genre,
    };

    BookDataService.create(data)
      .then((response) => {
        setBook({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          completed: response.data.completed,
          genre: response.data.genre,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newBook = () => {
    setBook(initialBookState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBook}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={book.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={book.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              required
              value={book.genre}
              onChange={handleInputChange}
              name="genre"
            />
          </div>

          <button onClick={saveBook} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBook;

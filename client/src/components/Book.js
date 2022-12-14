import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookDataService from "../services/BookService";
import "../App.css";

const Book = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialBookState = {
    id: null,
    title: "",
    description: "",
    completed: false,
    genre: "",
  };
  const [currentBook, setCurrentBook] = useState(initialBookState);
  const [message, setMessage] = useState("");

  const getBook = (id) => {
    BookDataService.get(id)
      .then((response) => {
        setCurrentBook(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getBook(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const updateCompleted = (status) => {
    var data = {
      id: currentBook.id,
      title: currentBook.title,
      description: currentBook.description,
      completed: status,
      genre: currentBook.genre,
    };

    BookDataService.update(currentBook.id, data)
      .then((response) => {
        setCurrentBook({ ...currentBook, completed: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateBook = () => {
    BookDataService.update(currentBook.id, currentBook)
      .then((response) => {
        console.log(response.data);
        setMessage("The book was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteBook = () => {
    BookDataService.remove(currentBook.id)
      .then((response) => {
        console.log(response.data);
        navigate("/books");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBook ? (
        <div className="edit-form">
          <h4>Book</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBook.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBook.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                name="genre"
                value={currentBook.genre}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBook.completed ? "Completed" : "Incomplete"}
            </div>
          </form>

          {/* 
          <div>
            <DropdownList
              dataKey="id"
              textField="color"
              value={value}
              onChange={(nextValue) => setValue(nextValue.id)}
              data={[
                { id: 1, color: "Red" },
                { id: 2, color: "Yellow" },
                { id: 3, color: "Blue" },
              ]}
            />
          </div> */}

          {currentBook.completed ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateCompleted(false)}
            >
              Incomplete
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateCompleted(true)}
            >
              Completed
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteBook}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBook}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Book...</p>
        </div>
      )}
    </div>
  );
};

export default Book;

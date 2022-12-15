const db = require("../models");
const Book = db.books;

// Create and Save a new book
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title cannot be empty!" });
    return;
  }
  // Create a book entry
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed ? req.body.completed : false,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  // Save the book in the database
  book
    .save(book)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Book.",
      });
    });
};

// Retrieve all books from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Book.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books.",
      });
    });
};

// Find a single book with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Book.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Book with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Book with id=" + id });
    });
};

// Update a book by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found!`,
        });
      } else res.send({ message: "Book was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Book with id=" + id,
      });
    });
};

// Delete a book with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Book.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
        });
      } else {
        res.send({
          message: "Book was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Book with id=" + id,
      });
    });
};

// Delete all books from the database.
exports.deleteAll = (req, res) => {
  Book.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Books were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all books.",
      });
    });
};

// Find all completed books
exports.findAllCompleted = (req, res) => {
  Book.find({ completed: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving books.",
      });
    });
};

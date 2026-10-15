
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to read JSON request bodies
app.use(express.json());

// Initial book data
let books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 350
  }, 
  {
    id: 2,
    title: "Wings of Fire",
    author: "A. P. J. Abdul Kalam",
    price: 450
  },
  {
    id: 3,
    title: "The Guide",
    author: "R. K. Narayan",
    price: 300
  }
];

// Home route
app.get("/", (req, res) => {
  res.send("Book Management REST API is running");
});

// GET: Retrieve all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// GET: Retrieve a book by ID
app.get("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  res.json(book);
});

// POST: Add a new book
app.post("/api/books", (req, res) => {
  const { title, author, price } = req.body;

  if (!title || !author || price == null) {
    return res.status(400).json({
      message: "Title, author and price are required"
    });
  }

  const newBook = {
    id: books.length
      ? Math.max(...books.map(book => book.id)) + 1
      : 1,
    title,
    author,
    price
  };

  books.push(newBook);

  res.status(201).json({
    message: "Book added successfully",
    book: newBook
  });
});

// PUT: Update a book
app.put("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  const { title, author, price } = req.body;

  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (price !== undefined) book.price = price;

  res.json({
    message: "Book updated successfully",
    book
  });
});

// DELETE: Remove a book
app.delete("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  const deletedBook = books.splice(index, 1)[0];

  res.json({
    message: "Book deleted successfully",
    book: deletedBook
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (users.some(user => user.username === username)) {
    return res.status(409).json({ message: "Username already exists." });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully!" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  const formattedBooks = JSON.stringify(books, null, 4);
  res.setHeader('Content-Type', 'application/json');
  res.send(formattedBooks);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    // Use JSON.stringify for a neat, readable output
    const formattedBook = JSON.stringify(book, null, 4); // 4 spaces indentation
    res.send(formattedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksByAuthor = [];

  // Iterate through all the books
  for (const key in books) {
    if (books[key].author.toLowerCase() === author.toLowerCase()) {
      booksByAuthor.push(books[key]);
    }
  }

  // If found, return the matching books
  if (booksByAuthor.length > 0) {
    const formattedBooks = JSON.stringify(booksByAuthor, null, 4);
    res.send(formattedBooks);
  } else {
    res.status(404).json({ message: "No books found for this author." });
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title; // get the title from URL
  const booksByTitle = [];

  // Loop through all books and find matches by title
  for (const key in books) {
    if (books[key].title.toLowerCase() === title.toLowerCase()) {
      booksByTitle.push(books[key]);
    }
  }

  // If there are matching books, return them neatly formatted
  if (booksByTitle.length > 0) {
    const formattedBooks = JSON.stringify(booksByTitle, null, 4); // 4 spaces indentation
    res.send(formattedBooks);
  } else {
    res.status(404).json({ message: "No books found with this title." });
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    const formattedReviews = JSON.stringify(book.reviews, null, 4);
    res.send(formattedReviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;

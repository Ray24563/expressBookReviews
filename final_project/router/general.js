const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

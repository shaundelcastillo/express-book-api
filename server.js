const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

let books = [
    { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937 },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
];

let nextId = 4;

// GET /api/books - Get ALL books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET /api/books/:id - Get a SINGLE book by ID
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
});

// POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
    const { title, author, year } = req.body;

    // Validate input
    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Title, author, and year are required' });
    }

    const newBook = { id: nextId++, title, author, year };
    books.push(newBook);
    res.status(201).json({
        message: 'Book added successfully',
        book: newBook
    });
});

// DELETE /api/books/:id - Delete a book by ID
app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const deletedBook = books.splice(bookIndex, 1)[0];
    res.json({
        message: 'Book deleted successfully',
        book: deletedBook
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🖥 Express Server is running on http://localhost:${PORT}`);
    console.log('📚 Try these endpoints:');
    console.log(`    GET     http://localhost:${PORT}/api/books`);
    console.log(`    GET     http://localhost:${PORT}/api/books/1`);
    console.log(`    POST    http://localhost:${PORT}/api/books`);
    console.log(`    DELETE  http://localhost:${PORT}/api/books/1`);
});
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Books from "./pages/Books/Books.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import BookDetails from "./pages/BookDetails/BookDetails.jsx";
import AddBook from "./pages/AddBook/AddBook.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import API from "./services/api"; // Live backend Axios instance
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app_theme") || "matcha";
  });

  const [currentPage, setCurrentPage] = useState("home");
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch live books from MongoDB Atlas on component mount
  useEffect(() => {
    const fetchLiveBooks = async () => {
      try {
        const { data } = await API.get('/books');
        setBooks(data);
        setLoadingBooks(false);
      } catch (error) {
        console.error("Failed to fetch books from database:", error);
        setLoadingBooks(false);
      }
    };
    fetchLiveBooks();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  const handleAddBook = (newBook) => {
    setBooks([newBook, ...books]);
    setCurrentPage("books");
  };

  const handleViewBookDetails = (id) => {
    setSelectedBookId(id);
    setCurrentPage("details");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            setCurrentPage={setCurrentPage}
            onBookClick={handleViewBookDetails}
            books={books.slice(0, 6)}
          />
        );
      case "books":
        return (
          <Books
            books={books}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onBookClick={handleViewBookDetails}
          />
        );
      case "details": {
        // Note: MongoDB documents use '_id' instead of local 'id'
        const selectedBook = books.find((b) => b._id === selectedBookId || b.id === selectedBookId);
        return (
          <BookDetails
            book={selectedBook}
            onBack={() => setCurrentPage("books")}
          />
        );
      }
      case "add":
        return (
          <AddBook
            onAdd={handleAddBook}
            onCancel={() => setCurrentPage("books")}
          />
        );
      case "auth":
        return <Auth setCurrentPage={setCurrentPage} />;
      case "profile":
        return <Profile setCurrentPage={setCurrentPage} />;
      default:
        return (
          <Home
            setCurrentPage={setCurrentPage}
            onBookClick={handleViewBookDetails}
            books={books.slice(0, 6)}
          />
        );
    }
  };

  return (
    <div className="app-container">
      <Navbar
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        theme={theme}
        setTheme={setTheme}
      />
      <main className="main-content">
        {loadingBooks ? (
          <div style={{ textAlign: 'center', padding: '3rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Loading live library books from MongoDB...
          </div>
        ) : (
          renderPage()
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
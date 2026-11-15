import React from "react";
import "./BookDetails.css";

function BookDetails({ book, onBack }) {
  if (!book)
    return <div className="no-results">Book data loading or invalid...</div>;

  return (
    <div className="details-container">
      <button className="back-btn" onClick={onBack}>
        ← Back to Catalog
      </button>
      <div className="details-layout-card">
        <div className="details-cover-section">
          <img src={book.cover} alt={book.title} className="details-main-img" />
        </div>
        <div className="details-info-section">
          <span className="details-category-badge">{book.category}</span>
          <h1 className="details-title">{book.title}</h1>
          <p className="details-author-line">
            By <span className="author-name">{book.author}</span>
          </p>

          <div className="details-stats-row">
            <div className="stat-pill">📅 Published: {book.publishedYear}</div>
            <div className="stat-pill score">
              ⭐ Rating: {book.rating} / 5.0
            </div>
          </div>

          <div className="details-synopsis-box">
            <h3>Synopsis</h3>
            <p className="book-synopsis-text">
              {book.synopsis || book.description || "No synopsis available."}
            </p>
          </div>

          {/* Optional PDF Reader Button if MongoDB record has a valid pdfUrl */}
          {book.pdfUrl && (
            <div style={{ marginTop: '1.5rem' }}>
              <a 
                href={book.pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="submit-btn" 
                style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
              >
                📖 Read Book PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
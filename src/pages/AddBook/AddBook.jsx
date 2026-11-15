import React, { useState } from 'react';
import API from '../../services/api'; // Make sure the path matches your services folder location
import './AddBook.css';

function AddBook({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Fantasy',
    publishedYear: '',
    rating: '',
    cover: '',
    pdfUrl: '',
    isPremium: false,
    synopsis: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const bookPayload = {
        ...formData,
        publishedYear: Number(formData.publishedYear),
        rating: Number(formData.rating)
      };

      // Call live backend API to save to MongoDB Atlas
      const { data } = await API.post('/books', bookPayload);
      
      setLoading(false);
      // Trigger parent callback with newly created backend book document
      if (onAdd) onAdd(data);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to add book. Make sure you are logged in as admin.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Book to MongoDB</h2>
      
      {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label>Book Title *</label>
          <input 
            type="text" 
            required 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
          />
        </div>

        <div className="form-group">
          <label>Author *</label>
          <input 
            type="text" 
            required 
            value={formData.author} 
            onChange={(e) => setFormData({...formData, author: e.target.value})} 
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="Fantasy">Fantasy</option>
              <option value="Tech">Tech</option>
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="Biography">Biography</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
          </div>

          <div className="form-group">
            <label>Published Year *</label>
            <input 
              type="number" 
              required 
              value={formData.publishedYear} 
              onChange={(e) => setFormData({...formData, publishedYear: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label>Rating (1-5) *</label>
            <input 
              type="number" 
              step="0.1" 
              min="1" 
              max="5" 
              required 
              value={formData.rating} 
              onChange={(e) => setFormData({...formData, rating: e.target.value})} 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cover Image URL</label>
            <input 
              type="url" 
              placeholder="https://example.com/cover.jpg"
              value={formData.cover} 
              onChange={(e) => setFormData({...formData, cover: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label>PDF Reader URL</label>
            <input 
              type="url" 
              placeholder="https://example.com/book.pdf"
              value={formData.pdfUrl} 
              onChange={(e) => setFormData({...formData, pdfUrl: e.target.value})} 
            />
          </div>
        </div>

        <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
          <input 
            type="checkbox" 
            id="isPremium"
            checked={formData.isPremium} 
            onChange={(e) => setFormData({...formData, isPremium: e.target.checked})} 
            style={{ width: '20px', height: '20px' }}
          />
          <label htmlFor="isPremium" style={{ margin: 0, cursor: 'pointer' }}> Mark as Premium Subscriber Book</label>
        </div>

        <div className="form-group">
          <label>Synopsis</label>
          <textarea 
            rows="4" 
            value={formData.synopsis} 
            onChange={(e) => setFormData({...formData, synopsis: e.target.value})}
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving to Database..." : "Add to Shelf"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
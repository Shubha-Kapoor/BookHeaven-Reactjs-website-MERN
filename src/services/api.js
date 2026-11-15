import axios from "axios";

// Create Axios instance pointing to your Express backend
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach JWT token for authenticated requests
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Book API services mapped to your live backend
export const bookApi = {
  // Fetch all books (supports optional search and category filters)
  getAllBooks: async (category = "All", search = "") => {
    const { data } = await API.get(`/books?category=${category}&search=${search}`);
    return data;
  },

  // Add a new book (Admin only)
  addBook: async (newBook) => {
    const { data } = await API.post("/books", newBook);
    return data;
  },

  // Get a single book by ID
  getBookById: async (id) => {
    const { data } = await API.get(`/books/${id}`);
    return data;
  },

  // Toggle favorite (Wishlist)
  toggleFavorite: async (bookId) => {
    const { data } = await API.post(`/users/favorite/${bookId}`);
    return data;
  },

  // Update subscription status
  subscribeUser: async () => {
    const { data } = await API.put("/users/subscribe");
    return data;
  }
};

export default API;
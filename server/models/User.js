import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isSubscribed: { type: Boolean, default: false },
  subscriptionExpiresAt: { type: Date }, // Track when subscription lapses
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  readingProgress: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      currentPage: { type: Number, default: 1 },
      lastReadAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
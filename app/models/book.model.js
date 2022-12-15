module.exports = (mongoose) => {
  const Book = mongoose.model(
    "book",
    mongoose.Schema(
      {
        title: String,
        description: String,
        completed: Boolean,
        genre: String,
        startDate: { type: Date, required: false },
        endDate: { type: Date, required: false },
      },
      { timestamps: true }
    )
  );

  return Book;
};

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      completed: Boolean,
      genre: String,
      startDate: { type: Date, required: false },
      endDate: { type: Date, required: false },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Book = mongoose.model("book", schema);
  return Book;
};

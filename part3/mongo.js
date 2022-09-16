const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("node mongo.js Rufaidat");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackNotes:${password}@cluster0.xsbzetz.mongodb.net/noteApp?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    //   const note = new Note({
    //     content: "HTML is Easy",
    //     date: new Date(),
    //     important: true,
    //   });

    //   return note.save();
    Note.find({}).then((result) => {
      result.forEach((note) => {
        console.log(note);
      });
      mongoose.connection.close();
    });
  })
  .then(() => {
    console.log("note saved!");
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));

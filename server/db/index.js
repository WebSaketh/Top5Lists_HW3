const mongoose = require("mongoose");
/*
    This initializes the connection to our database so that we can do CRUD.
    
    @author McKilla Gorilla
*/
mongoose
  .connect(
    "mongodb+srv://websaketh:SAKkot123@top5lists.uu1ve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;

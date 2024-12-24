
import mongoose from "mongoose";


// function to connect db and start server
function connectDb(port, uri, dbName, app) {
  try {
    const connectionInstance = mongoose.connect(`${uri}/${dbName}`);
    console.log("mongodb connected");

    // creating server
    app.listen(port, () => {
      console.log(
        `congrats! your server is running on http://localhost:${port}`
      );
    });
  } catch (error) {
    console.log(`"db connection error:" ${error}`);
  }
}

export default connectDb;

const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8888;

// start the Express server
const app = require("./app");
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
  } );
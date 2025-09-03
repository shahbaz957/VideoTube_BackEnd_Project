import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});
console.log("Cloudinary Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary Name:", process.env.CLOUDINARY_API_KEY);
console.log("Cloudinary Name:", process.env.CLOUDINARY_API_SECRET);
connectDB()
  .then(
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(`Error is Occured during Server Setup`);
      console.log(`Server is Listening at ${process.env.PORT || 8000}`);
    })
  )
  .catch(() => {
    console.log(`MongoDB Is not properly Connected !!! `);
  });

// **************************** This is the One way of Doing the Things *************************

// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log("ERROR : ", error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`App is Listening At ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log("ERROR : ", error);
//     throw error;
//   }
// })(); // this structure is known as iffy structure for immediately invoking the function

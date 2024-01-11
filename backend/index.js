import express from "express";
import { PORT, MONGO_URI } from './config.js';
import mongoose from "mongoose";
import { Car } from './models/carModel.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req)
  return res.status(234).send('Welcome to my route!')
});

// Route to create new Car
app.post("/cars", async (req, res) => {
  try {
    if (
    !request.body.make ||
    !request.body.model ||
    !request.body.year ||
    !request.body.color ||
    !request.body.mileage
) {
  return res.status(400).send({
    message: 'Send all required fields: make, model, year, color, mileage',
  })
}
const newCar = {
  make: request.body.title,
  model: request.body.model,
  year: request.body.year,
  color: request.body.color,
  mileage: request.body.mileage
}

const car = await Car.create(newCar);

return res.status(201).send(car);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
});

// Route to get all cars from database
app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find({});
  }
   catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
   }
});


mongoose.connect(MONGO_URI)
.then (() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
  })
})
.catch((error) => {
  console.log(error);
})

// import { PORT, MONGO_URI } from "./config.js";
// import mongoose from "mongoose";
// import { Cars } from "./models/carsModel.js";

// const app = express();

// // create route
// app.get("/", (req, res) => {
//   console.log(req);
//   return res.status(234).send("Welcome to my route");
// });

// // Route to create new Player
// app.post("/cars", async (req, res) => {
//   try {
//     if (
//     !request.body.name ||
//     !request.body.position ||
//     !request.body.hometown ||
//     !request.body.jerseyNumber
// ) {}
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({message: error.message});
//   }
// });

// // connect database
// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("App connected to the database");
//     app.listen(PORT, () => {
//       console.log(`App is listening on port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

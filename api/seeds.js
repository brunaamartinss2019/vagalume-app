import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import "./config/db.config.js";

import User from "./models/user.model.js";
import Property from "./models/properties.model.js";
import Booking from "./models/bookings.model.js";
import Review from "./models/review.model.js";

async function seed() {
    console.log("Seending the database...");

    //Limpiar la base de datos

    console.log("drop database...");
    await mongoose.connection.dropDatabase();
    console.log("drop database...[OK]");
    console.log("-------------------------");

    //Crear usuarios
    console.log("seeding users...");
    const roles = ["guest", "host", "dual"];
    const users = [];

    for (let i = 0; i < 10; i++) {
        const user = await User.create({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: roles[Math.floor(Math.random() * roles.length)],
            avatar: faker.image.avatar(),
            bio: faker.lorem.sentence(),
        });
        users.push(user);
    }
    console.log("seeding users...[OK]");
    console.log("-------------------------");
    
    // Paso 3: Crear propiedades (solo hosts y duals)
  console.log("seeding properties...");
  const hosts = users.filter((u) => u.role === "host" || u.role === "dual");
  const rias = ["Rías Baixas", "Ría de Vigo", "Ría de Pontevedra", "Rías Altas"];
  const properties = [];

  for (let i = 0; i < 15; i++) {
    const randomHost = hosts[Math.floor(Math.random() * hosts.length)];
    const property = await Property.create({
      host: randomHost._id,
      title: faker.lorem.words(4),
      description: faker.lorem.paragraph(),
      type: Math.random() > 0.5 ? "entire" : "room",
      location: {
        ria: rias[Math.floor(Math.random() * rias.length)],
        address: faker.location.city() + ", Galicia",
        coords: {
          lat: faker.location.latitude({ min: 42, max: 44 }),
          lng: faker.location.longitude({ min: -9, max: -7 }),
        },
      },
      price: faker.number.int({ min: 30, max: 200 }),
      capacity: faker.number.int({ min: 1, max: 8 }),
      photos: [
        faker.image.url(),
        faker.image.url(),
        faker.image.url(),
      ],
      rating: 0,
    });
    properties.push(property);
    console.log(property.title);
  }
  console.log("seeding properties... [OK]");
  console.log("-------------------------------------------------------");

  // Paso 4: Crear reservas
  console.log("seeding bookings...");
  const guests = users.filter((u) => u.role === "guest" || u.role === "dual");
  const statuses = ["pending", "confirmed", "cancelled"];
  const bookings = [];

  for (let i = 0; i < 20; i++) {
    const randomGuest = guests[Math.floor(Math.random() * guests.length)];
    const randomProperty = properties[Math.floor(Math.random() * properties.length)];
    const checkIn = faker.date.future();
    const checkOut = new Date(checkIn.getTime() + faker.number.int({ min: 1, max: 7 }) * 86400000);
    const nights = Math.round((checkOut - checkIn) / 86400000);

    const booking = await Booking.create({
      guest: randomGuest._id,
      property: randomProperty._id,
      checkIn,
      checkOut,
      guests: faker.number.int({ min: 1, max: randomProperty.capacity }),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      totalPrice: randomProperty.price * nights,
    });
    bookings.push(booking);
  }
  console.log("seeding bookings... [OK]");
  console.log("-------------------------------------------------------");

  // Paso 5: Crear reseñas (solo sobre reservas confirmed)
  console.log("seeding reviews...");
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

  for (const booking of confirmedBookings) {
    const review = await Review.create({
      author: booking.guest,
      property: booking.property,
      booking: booking._id,
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentences(2),
    });

    // Recalcula rating medio de la propiedad
    const allReviews = await Review.find({ property: booking.property });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Property.findByIdAndUpdate(booking.property, {
      rating: Math.round(avgRating * 10) / 10,
    });

    console.log(`${review.rating}⭐ — ${review.comment.substring(0, 40)}...`);
  }
  console.log("seeding reviews... [OK]");
  console.log("-------------------------------------------------------");

  // Paso 6: Cerrar conexión
  console.log("close connection...");
  await mongoose.connection.close();
  console.log("close connection... [OK]");
}

seed();
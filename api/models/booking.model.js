import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema(
  {
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,

    },
  },
  {
    timestamps: true, // Añade automáticamente campos createdAt y updatedAt
    versionKey: false, // Desactiva el campo __v de versionado de Mongoose
    // Configuración de serialización JSON del documento
    toJSON: {
      virtuals: true, // Incluye campos virtuales (como "id") en la salida JSON
      // Función de transformación para limpiar el JSON de salida
      transform: function (doc, ret) {
        delete ret._id; // Elimina el _id nativo de MongoDB (se usa el virtual "id" en su lugar)
      },
    },
  },
);

const Booking = mongoose.model("Booking", bookingsSchema);

export default Booking;
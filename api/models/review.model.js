import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    property: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Property",
        required: true,
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    rating: {
        type: Number, 
        required: true, 
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        maxLength: 250, 
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

const Review = mongoose.model("Review", reviewSchema);

export default Review;
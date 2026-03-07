import mongoose from "mongoose";

const propertiesSchema = new mongoose.Schema(
  {
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String, 
        required: true,
        maxLength: 50,
    },
    description: {
        type: String, 
        required: true,
    },
    type: {
        type: String, 
        enum: ["entire", "room"],
        required: true, 
    },
    location: {
        ria: { type: String, required: true },
        address: { type: String, required: true },
        coords: {
            lat: { type: Number },
            lng: { type: Number },
        },
    },
    price: {
        type: Number, 
        required: true,
    },  
    capacity: {
        type: Number,
        required: true,
        
    },
    photos: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length >= 3,
            message: "Debe haber al menos 3 fotos",
        },
    },
    rating: {
        type: Number,
        default: 0,
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

const Property = mongoose.model("Property", propertiesSchema);

export default Property;
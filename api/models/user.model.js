import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true, 
        trim: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/,
    },
    password: {
        type: String, 
        required: true,
    },
    role: {
        type: String, 
        enum: ["guest", "host", "dual"],
        required: true, 
    },
    avatar: {
        type: String, 
        trim: true,
        match: /^https?:\/\/.+/,
    },
    bio: {
        type: String, 
        trim: true, 
        maxLength: 500,
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
        delete ret.password;
      },
    },
  },
);

//encripta la contraseña antes de guardar

userSchema.pre("save", async function() {
    if (!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password, 10);
});

//Método - compara contraseña en login

userSchema.methods.checkPassword = async function (passwordToCheck) {
    return await bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
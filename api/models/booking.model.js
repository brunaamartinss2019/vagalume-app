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
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, 
    versionKey: false, 
    toJSON: {
      virtuals: true, 
      transform: function (doc, ret) {
        delete ret._id; 
      },
    },
  },
);

const Booking = mongoose.model("Booking", bookingsSchema);

export default Booking;
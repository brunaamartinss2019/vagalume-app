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

const Review = mongoose.model("Review", reviewSchema);

export default Review;
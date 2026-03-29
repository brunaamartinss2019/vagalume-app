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
        timestamps: true, 
        versionKey: false, 
        toJSON: {
            virtuals: true, 
            transform: function (doc, ret) {
                delete ret._id; 
                delete ret.password;
            },
        },
    },
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.checkPassword = async function (passwordToCheck) {
    return await bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
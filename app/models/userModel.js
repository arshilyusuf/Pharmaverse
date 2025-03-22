import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required; this is a MongoSchema Error"],
    },
    email: {
      type: String,
      unique: [true, "Email Already Exists, this is a Mongo Schema Error"],
      required: [true, "Email is required; this is a Mongo Schema Error"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required; this is a Mongo Schema Error"],
      unique: [
        true,
        "Phone number already exists, this is a Mongo Schema Error",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "user", "vendor"],
      required: [true, "User must have a role"],
      default: "user",
    },
    registrationNumber: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      minlength: 8,
      select: false,
    },
    
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);



const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

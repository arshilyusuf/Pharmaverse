import mongoose from "mongoose";
import Drug from "./drugModel";
import User from "./userModel";


const SupplyOrderSchema = mongoose.Schema({
  drugID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drug",
    required: [true, "Drug ID is required, this is a mongoose schema error"],
  },
  drugName: {
    type: String,
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required, this is a mongoose schema error"],
  },
  suppliedTo: {
    type: String,
    required: [
      true,
      "Supplied to is required, this is a mongoose schema error",
    ],
  },
  vendorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Vendor ID is required, this is a mongoose schema error"],
  },
  vendorRegistrationNumber: {
    type: String,
  },
  orderDate: {
    type: Date,
    required: [true, "Order Date is required, this is a mongoose schema error"],
  },
  status: {
    type: String,
    required: [true, "Status is required, this is a mongoose schema error"],
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
});

// Middleware to populate drugName and vendorRegistrationNumber before saving
SupplyOrderSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("drugID")) {
    const drug = await Drug.findById(this.drugID);
    if (drug) {
      this.drugName = drug.name;
      console.log(`Drug name set to: ${this.drugName}`);
    } else {
      this.drugName = "";
      console.log("Drug not found, drugName set to empty string");
    }
  }

  if (this.isNew || this.isModified("vendorID")) {
    const user = await User.findById(this.vendorID);
    if (user) {
      this.vendorRegistrationNumber = user.registrationNumber;
      console.log(
        `Vendor registration number set to: ${this.vendorRegistrationNumber}`
      );
    } else {
      this.vendorRegistrationNumber = "";
      console.log(
        "User not found, vendorRegistrationNumber set to empty string"
      );
    }
  }

  next();
});


const SupplyOrder =
  mongoose.models.SupplyOrder ||
  mongoose.model("SupplyOrder", SupplyOrderSchema);
export default SupplyOrder;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    zone: { type: mongoose.Schema.Types.ObjectId, ref: "zone", required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date },
  },
  { collection: "stores" }
);

// Middleware para establecer createdAt antes de guardar el documento
storeSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

// Middleware para establecer createdAt antes de guardar el documento
storeSchema.pre("save", function (next) {
  if (!this.modifiedAt) {
    this.modifiedAt = new Date();
  }
  next();
});

// Middleware para actualizar modifiedAt antes de actualizar el documento
storeSchema.pre("updateOne", function (next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

// Middleware para actualizar modifiedAt después de actualizar el documento
storeSchema.post("updateOne", function () {
  this.findOneAndUpdate({}, { $set: { modifiedAt: new Date() } });
});

const Store = mongoose.model("store", storeSchema);

module.exports = Store;

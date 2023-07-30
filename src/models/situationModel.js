const mongoose = require("mongoose");
const { Schema } = mongoose;

const situationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date },
  },
  { collection: "situations" }
);

// Middleware para establecer createdAt antes de guardar el documento
situationSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

// Middleware para establecer createdAt antes de guardar el documento
situationSchema.pre("save", function (next) {
  if (!this.modifiedAt) {
    this.modifiedAt = new Date();
  }
  next();
});

// Middleware para actualizar modifiedAt antes de actualizar el documento
situationSchema.pre("updateOne", function (next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

// Middleware para actualizar modifiedAt después de actualizar el documento
situationSchema.post("updateOne", function () {
  this.findOneAndUpdate({}, { $set: { modifiedAt: new Date() } });
});

const Situation = mongoose.model("situation", situationSchema);

module.exports = Situation;

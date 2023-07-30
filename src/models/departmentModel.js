const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date },
  },
  { collection: "departments" }
);

// Middleware para establecer createdAt antes de guardar el documento
departmentSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

// Middleware para establecer createdAt antes de guardar el documento
departmentSchema.pre("save", function (next) {
  if (!this.modifiedAt) {
    this.modifiedAt = new Date();
  }
  next();
});

// Middleware para actualizar modifiedAt antes de actualizar el documento
departmentSchema.pre("updateOne", function (next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

// Middleware para actualizar modifiedAt después de actualizar el documento
departmentSchema.post("updateOne", function () {
  this.findOneAndUpdate({}, { $set: { modifiedAt: new Date() } });
});

const Department = mongoose.model("department", departmentSchema);

module.exports = Department;

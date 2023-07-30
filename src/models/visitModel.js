const mongoose = require("mongoose");
const { Schema } = mongoose;

const visitSchema = new mongoose.Schema(
  {
    startHour: { type: Number, required: true },
    finishHour: { type: Number, required: true },
    visitDate: { type: Date }, //Se debe confirmar si la fecha se pone automáticamente al momento de crear la visita o si va a ser una fecha insertada
    repairman: { type: String, required: true },
    detail: { type: String, required: true },
    ott: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date },
  },
  { collection: "visits" }
);

//middleware para establecer automáticamente la fecha de la visita, pendiente confirmar
// visitSchema.pre("save", function (next) {
//   if (!this.visitDate) {
//     this.fechaVisita = new Date();
//   }
//   next();
// });

// Middleware para establecer createdAt antes de guardar el documento
visitSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

// Middleware para establecer createdAt antes de guardar el documento
visitSchema.pre("save", function (next) {
  if (!this.modifiedAt) {
    this.modifiedAt = new Date();
  }
  next();
});

// Middleware para actualizar modifiedAt antes de actualizar el documento
visitSchema.pre("updateOne", function (next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

// Middleware para actualizar modifiedAt después de actualizar el documento
visitSchema.post("updateOne", function () {
  this.findOneAndUpdate({}, { $set: { modifiedAt: new Date() } });
});

const Visit = mongoose.model("visit", visitSchema);

module.exports = Visit;

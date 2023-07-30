const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: { type: Number, default: 0, required: true },
    reportedFrom: { type: String, required: true },
    requester: { type: String, required: true },
    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coordinator",
      required: true,
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
      required: true,
    },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "equipment",
      required: true,
    },
    detail: { type: String, required: true },
    priority: { type: String, required: true },
    hopedDate: { type: Date },
    serviceKind: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "deparment" },
    fulfilment: { type: String },
    status: { type: String, required: true },
    visit: [{ type: mongoose.Schema.Types.ObjectId, ref: "visit" }],
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { collection: "tickets" }
);

// Middleware para establecer createdAt antes de guardar el documento
ticketSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

// Middleware para establecer createdAt antes de guardar el documento
ticketSchema.pre("save", function (next) {
  if (!this.modifiedAt) {
    this.modifiedAt = new Date();
  }
  next();
});

// Middleware para actualizar modifiedAt antes de actualizar el documento
ticketSchema.pre("updateOne", function (next) {
  this.update({}, { $set: { modifiedAt: new Date() } });
  next();
});

// Middleware para actualizar modifiedAt después de actualizar el documento
ticketSchema.post("updateOne", function () {
  this.findOneAndUpdate({}, { $set: { modifiedAt: new Date() } });
});

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = Ticket;

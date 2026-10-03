const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
  {
    ticketId: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: String,   // set automatically
    priority: String,   // set automatically
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
    reply: { type: String, default: '' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);

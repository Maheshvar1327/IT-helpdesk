const router = require('express').Router();
const Ticket = require('../models/Ticket');
const { protect, adminOnly } = require('../middleware/auth');

// AUTOMATION: decide category and priority from the words in the ticket
function autoClassify(text) {
  text = text.toLowerCase();

  let category = 'General';
  if (/wifi|internet|network|lan|router/.test(text)) category = 'Network';
  else if (/password|login|account|email|otp/.test(text)) category = 'Account';
  else if (/printer|keyboard|mouse|monitor|laptop|projector/.test(text)) category = 'Hardware';
  else if (/install|software|app|update|license|virus/.test(text)) category = 'Software';

  let priority = 'Low';
  if (/urgent|not working|down|crash|exam|cannot|can't|virus/.test(text)) priority = 'High';
  else if (/slow|error|problem|issue/.test(text)) priority = 'Medium';

  return { category, priority };
}

// Create a ticket
router.post('/', protect, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { category, priority } = autoClassify(title + ' ' + description);
    const count = await Ticket.countDocuments();

    const ticket = await Ticket.create({
      ticketId: 'TKT-' + String(count + 1).padStart(4, '0'),
      title, description, category, priority,
      createdBy: req.user.id,
    });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get tickets (admin sees all, user sees own)
router.get('/', protect, async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { createdBy: req.user.id };
  const tickets = await Ticket.find(filter).populate('createdBy', 'name').sort('-createdAt');
  res.json(tickets);
});

// Admin updates status and reply
router.put('/:id', protect, adminOnly, async (req, res) => {
  const { status, reply } = req.body;
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status, reply }, { new: true });
  res.json(ticket);
});

module.exports = router;

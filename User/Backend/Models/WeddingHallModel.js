const mongoose = require('mongoose');

const WeddingHallSchema = new mongoose.Schema({
    hallNumber: { type: Number, required: true },
    hallName: { type: String, required: true },
    hallCapacity: { type: Number, required: true },
    hallPrice: { type: Number, required: true },
    hallLocation: { type: String, required: true },
    hallStatus: { type: String, required: true },
    hallImage: { type: String, required: false },
    hallType: { type: String, required: true },
    hallDescription: { type: String, required: true }
});

const WeddingHall = mongoose.model('WeddingHall', WeddingHallSchema);
module.exports = WeddingHall;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    name: {
        type: String,
        required: true
    },
    record_tracker: [
        {
          date: {
            type: String,
            required: true
          },
          status: {
            type: String,
            required: true
          }
        }
      ]
},{
    timestamps: true
});

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
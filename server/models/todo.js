const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 1, max: 100 },
  done: { type: Boolean, default: false },
}, {
  versionKey: false,
  // toObject: {
  //   transform: function (doc, ret) {
  //     ret.id = ret._id;
  //     delete ret._id;
  //   }
  // },
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

module.exports = mongoose.model('Todo', TodoSchema);

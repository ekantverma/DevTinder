const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String 
  },
  email: { 
    type: String, 
    required: true,
    unique: true
  },
  password: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number
  },
  gender: { 
    type: String
  },
  photoUrl: {
    type: String,
    default: ''
  }, 
  about: {
    type: String,
    default: "This is default about!"
  },
  skills: [String]
});

module.exports = mongoose.model("User", userSchema);

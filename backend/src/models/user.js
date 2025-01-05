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
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
  },
  password: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number,
    min: 18
  },
  gender: { 
    type: String,
    validate(value){
      if(!["male", "female", "others"].includes(value)){
        throw new Error("Gender should be either'male', 'female', or 'others'")
      }
    }
  },
  photoUrl: {
    type: String,
    default: 'https://i.pinimg.com/736x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg'
  }, 
  about: {
    type: String,
    default: "This is default about!"
  },
  skills: [String]
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);

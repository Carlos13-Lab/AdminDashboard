const User = require("../models/user");
// const { encryptPassword } = require("../helpers/crypto");

const findById = async (id) => {
  const user = await User.findById(id, 
    ["userName", "email", "phone_Number", "role", "active"]).populate({path: 'product', select: 'email'})
  return user;
};

const findByIdSeller = async (id) => {
  const user = await User.findById(id,
    ["userName", "email", "phone_Number", "role", "active"]).populate({path: 'sale', select: 'saleDate'})
  return user;
};

const findByEmail = async (email) => {
  const user = await User.findOne({ email }, 
    ["userName", "email", "phone_Number", "role", "active"])
    .populate({
    path: "sale",
    select: "saleDate",
  })

  return user;
};

const newUser = async (body) => {
  const { userName, email, password, role, phone_Number, active } = body;

  const user = new User({
    userName,
    email,
    password,
    role,
    phone_Number,
    active,
  });

  await user.save();

  let savedUser;

  if(user.role == 'seller'){
    savedUser = await findByIdSeller(user._id)
  }else{
    savedUser = await  findById(user._id)
  }

  return savedUser;
};


const UpdateUser = async ({id, body}) => {
  const { userName, email, password, role, phone_Number, active } = body;

  const options = {
    userName, email, password, role, phone_Number, active 
  }

  const userUpdate = await User.findByIdAndUpdate(
    {_id: id},
    {$set: options},
    {new: true}
  )
  const data = await findById(userUpdate.id)
  return data;
}
module.exports = { newUser, findByEmail, UpdateUser, findById };

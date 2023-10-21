const User = require("../models/user");
// const { encryptPassword } = require("../helpers/crypto");

const findById = async (id) => {
  const user = await User.findById(id, 
    ["userName", "email", "phone_Number", "role", "active"]).populate({path: 'product', select: 'email'})
  return user;
};

const findByIdSeller = async (id) => {
  const user = await User.findById(id, ["userName", "email", "phone_Number", "role", "active"])
    .populate([{ path: 'sale', select: 'saleDate', 
      populate: [
        {
          path: 'clientId',
          select: 'userName email role'
        },
        {
          path: 'Info',
          select: 'email',
          populate: {
              path: 'service',
              select: 'name'
          }
        },
      ]
  }])
  return user;
};


const findByEmail = async (email) => {
  const user = await User.findOne({ email }, 
    ["userName", "email", "phone_Number", "role", "active",])
    .populate({
    path: "sale",
      select: "saleDate", 
      populate: [
        {
          path: 'clientId',
          select: 'userName email role'
        },
        {
          path: 'Info',
          select: 'email',
          populate: {
            path: 'service',
            select: 'name'
          }
        },
      ]
  })

  return user;
};

const NewUser = async ({ userName, email, password, role, phone_Number, active, }) => {

  const user = new User({
    userName,
    email,
    password,
    role,
    phone_Number,
    active
  });

  await user.save();

  let savedUser;
  switch (user.role) {
    case 'seller':
      savedUser = await findByIdSeller(user._id);
      break;
    default:
      savedUser = await findById(user._id);
      break;
  }

  return savedUser;
};

module.exports = { NewUser, findByEmail, findById, findByIdSeller };

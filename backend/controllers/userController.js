import User from "../models/User.js";

export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "Successfully created a new User",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create User",
    });
  }
};

export const updatedUser = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        _id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        hotelname: req.body.hotelname,
        hotellocation: req.body.hotellocation,
      },
      {
        new: true,
      }
    );

    if (user) {
      res.send({
        status: 200,
        user: user,
      });
    } else {
      res.send({
        status: 500,
        user: user,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      await User.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: "Successfully Deleted User",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to delete User",
    });
  }
};
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully get User",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to find User",
    });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      message: "Successfully get users",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to find users",
    });
  }
};

const userModel = require('../models/user.model');
const userProfileModel = require('../models/userProfile.model');

const insertUser = async (req, res) => {
  try {
    const userData = req.body;

    const isUserExist = await userModel.findOne({ mobileNumber: userData.mobileNumber });

    if (isUserExist) {
      return res.status(200).send({
        status: true,
        data: null,
        message: 'User Already Exists'
      });
    } else {
      const newUser = new userModel(userData);
      const savedUser = await newUser.save();
      return res.status(200).send({
        status: true,
        data: savedUser,
        message: 'User details inserted successfully'
      });
    }

  } catch (error) {
    console.error("Error inserting user details:", error);

    return res.status(500).send({
      status: false,
      data: null,
      message: 'Failed to insert user details'
    });
  }
};

const insertUserProfile = async (req, res) => {
  try {
    let userProData = req.body;

    isProfileExist = await userProfileModel.find({ refUserId: userProData.refUserId });
    if (isProfileExist.length > 0) {
      return res.status(200).send({
        status: true,
        data: isProfileExist,
        message: 'User Profile Already Exist.'
      });
    } else {
      let profile = new userProfileModel(userProData);
      let isProFileSaved = await profile.save();
      if (isProFileSaved) {
        return res.status(200).send({
          status: true,
          data: isProFileSaved,
          message: 'User Profile Updated Successfully.'
        });
      } else {
        return res.status(404).send({
          status: false,
          data: null,
          message: 'Failed To Insert Data.'
        });
      }
    }

  } catch (error) {
    console.error("Error Inserting User Details:", error);
    return res.status(500).send({
      status: false,
      data: null,
      message: 'Failed To Insert Data.'
    });
  }
}

const getUserProfileById = async (req, res) => {
  try {
    let userId = req.query.userId;
    let profileData = await userProfileModel.find({ refUserId: userId });
    if (profileData.length > 0) {
      return res.status(200).send({
        status: true,
        data: profileData,
        message: 'User Profile Retrived Successfully.'
      });
    } else {
      return res.status(404).send({
        status: true,
        data: null,
        message: 'User Profile Not Found.'
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send({
        status: true,
        data: null,
        message: 'Internal Server Error.'
      });
  }
}

const sendUserOTP = async (req, res) => {
  try {
    const OTPForUser = 1234;
    let userData = req.body;

    const isUserExist = await userModel.findOne({ mobileNumber: userData.mobileNumber });
    if (isUserExist) {
      return res.status(200).send({
        status: true,
        data: [{ otp: OTPForUser }],
        message: 'OTP send Successfully'
      });
    } else {
      const newUser = new userModel({
        userName: userData.userName,
        mobileNumber: userData.mobileNumber,
        userType: userData.userType
      });

      const savedUser = await newUser.save();

      return res.status(200).send({
        status: true,
        data: savedUser,
        message: 'User Details Inserted Successfully'
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      data: [],
      message: 'Failed To Insert Data.'
    });
  }
}


const verifyUserOTP = (req, res) => {
  try {
    let OTP = 1234;
    let mobileNumber = req.body.mobileNumber;
    let userOTP = req.body.otp;

    if (OTP == userOTP) {
      return res.status(200).send({
        status: true,
        data: [],
        message: 'User Verification Successful..!'
      });
    } else {
      return res.status(404).send({
        status: false,
        data: [],
        message: 'User OTP Not Match..!'
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: false,
      data: [],
      message: 'Failed To Insert Data.'
    });
  }
}

module.exports = { insertUser, insertUserProfile, getUserProfileById, verifyUserOTP, sendUserOTP };

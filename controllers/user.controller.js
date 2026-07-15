import userModel from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import envConfig from "../configs/envConfig.js";

export const create = async (req, res) => {
  try {
    const hashPassword= await bcrypt.hash(req.body.password,10);
    req.body.password=hashPassword;
    const data = await userModel.create(req.body);
    return res.status(201).json({
      success: true,
      message: "User created Successfully..",
      User: data,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required..",
      });
    } else {
      const data = await userModel.findOne({ email });

      if (data) {
        return res.status(400).json({
          success: false,
          message: "User Exists..",
        });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
          name,
          email,
          password: hashPassword,
        });
        return res.status(201).json({
          success: true,
          message: "Signup Successfull",
          user: newUser,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found :("
            })
        }else{
            const isValid= await bcrypt.compare(password,user.password);
            if(!isValid){
                return res.status(400).json({
                    success:false,
                    message:"Wrong Password"
                })
            }
            else{
              const token=jwt.sign({id:user.id},envConfig.SECRET_KEY,{expiresIn:'1d'});
                return res.status(200).json({
                    success:true,
                    message:"User Information",
                    user:user,
                    token:token
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

export const getAll = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      success: true,
      message: "All Users Data",
      User: users,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User Data",
        User: user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (user) {
      return res.status(200).json({
        success: true,
        message: "User Deleted..",
        DeletedUser: user,
      });
    } else {
      return res.status(400).json({
        success: true,
        message: "User Not Found..",
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const olduser = await userModel.findByIdAndUpdate(id,req.body);
    const newuser = await userModel.findByIdAndUpdate(id,req.body,{new:true})
    if (olduser) {
      return res.status(200).json({
        success: true,
        message: "User Updated..",
        OldData: olduser,
        NewData: newuser
      });
    } else {
      return res.status(400).json({
        success: true,
        message: "User Not Found..",
      });
    }
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

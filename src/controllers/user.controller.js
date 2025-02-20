import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) =>{
    const {fullname, email, username, password} = req.body
    console.log("email: ",email);
    console.log(fullname, username, password);
    console.log(req.body);
    
    if(fullname === "" || username === "" || email === "" || password === ""){
        throw new ApiError(400, "All fields are required")

    // if ( 
    // [fullname, email, username, password].some((fileds) => 
    // fields?.trim() === ""))
    }

    const existedUser = User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "avatar upload failed");
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export { registerUser }
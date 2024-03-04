import { userModel } from "../models/user.model.js";

export default class userManager {
    regUser = async (username, email, password) => {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('Email already in use');
        }
        const newUser = await userModel.create({ username, email, password });
        return newUser;
    }
    
    getUserInfo = async (email) => {
        return await userModel.findOne({ email });
    }

    logInUser = async (email, password)=> {
        const user = await userModel.findOne({ email, password })
        if(!user){
            throw new Error("Invalid credentials");
        }
        return user;
    }
}
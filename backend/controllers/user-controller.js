import User from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUsers = async(req , res , next) => {
    let users;
    try{
        users = await User.find();
    }
    catch(err){
        return console.log(err);
    }
    
    if(!users){
        return res.status(500).json({message: "unexpected error occured"})
    }

    return res.status(200).json({users});
};

export const singup = async(req , res , next) => {
    const { name ,email ,password } = req.body;

    if(!name || name.trim()==="" || !email || email.trim()==="" || !password || password.trim()===""){
        return res.status(422).json({message: "invalid inputs"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try{
        user = new User({name,email,password:hashedPassword});
        user = await user.save();
    }
    catch(err){
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({message: "Unexpected error occured"});
    }

    return res.status(201).json({user});

};


export const updateUser = async(req , res , next) => {
    const id = req.params.id;

    const { name ,email ,password } = req.body;

    if(!name || name.trim()==="" || !email || email.trim()==="" || !password || password.trim()===""){
        return res.status(422).json({message: "invalid inputs"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try{
        user = await User.findByIdAndUpdate(id , {name , email , password: hashedPassword});
    }
    catch(err){
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({message: "Something went wrong"});
    }

    return res.status(200).json({message: "updated successfully"});

};

export const deleteUser = async (req , res , next) => {
    const id = req.params.id;
    
    let user;
    try{
        user = await User.findOneAndDelete(id);
    }
    catch(err){
        return console.log(err);
    }

    if(!user){
        return res.status(500).json({message: "Something went wrong"});
    }

    return res.status(200).json({message: "deleted successfully"});
}

export const login = async (req , res , next) => {
    const { email ,password } = req.body;

    if(!email || email.trim()==="" || !password || password.trim()===""){
        return res.status(422).json({message: "invalid inputs"});
    }

    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }
    catch(err){
        return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message: "Unable to find User"});
    }

    const isCorrectPassword = bcrypt.compareSync(password , existingUser.password);
    if(!isCorrectPassword){
        return res.status(400).json({message: "Invalid Credentials"});
    }

    return res.status(200).json({message: "login successfully"});

}














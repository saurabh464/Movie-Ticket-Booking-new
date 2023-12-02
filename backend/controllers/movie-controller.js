import jwt from "jsonwebtoken";
import Movie from "../models/Movie";
import mongoose from "mongoose";

export const addMovie = async(req , res , next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];  //Bearer token


    if(!extractedToken || extractedToken.trim()===""){
        res.status(404).json({message: "Token not found"});
    }
    // console.log(extractedToken);
    let adminId;
    
    // verify token
    jwt.verify(extractedToken , process.env.SECRET_KEY, (err, decrypted) => {
        if(err){
            return res.status(400).json({message:`${err.message}`});
        }
        else{
            adminId = decrypted.id;
            return;
        }
    });

    //create new movie
    const { title, description, actors, releaseDate, posterUrl, featured } = req.body;

    if(!title || !description || !releaseDate || !posterUrl || !featured){
        res.status(422).json({message: "Invalid inputs"});
    }

    let movie;
    try{
        movie = new Movie({ title, description, actors, releaseDate: new Date(`${releaseDate}`), posterUrl, featured , admin: adminId})
        movie = await movie.save();
    }
    catch(err){
        return console.log(err);
    }

    if(!movie){
        res.status(500).json({message: "request failed"});
    }
    res.status(200).json({movie});
}


export const getAllMovies = async(req , res , next) => {
    let movies;
    try {
        movies = await Movie.find();
    } catch (error) {
        return console.log(error);
    }
    if(!movies){
        return res.status(500).json({message: "Request Failed"});
    }

    res.status(200).json({movies}); 
}
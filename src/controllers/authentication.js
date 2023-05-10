import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export default {
    async register(req, res){

        const { name, email, password } = req.body;
        
        try{
            let user = await User.findOne({
                email
            });
            if(user){
                return res.status(400).json({
                    "message": "user already exists"
                })
            }

            user = new User({
                name,
                email,
                password
            });
            
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,{
                    expiresIn: 10000
                },
                (err, token) => {
                    if(err) throw err;
                    res.status(200).json({token});
                }
            );
        } catch(error){
            res.status(500).json(error);
        }

    },


    // login user
    async login(req, res){
        const {email, password} = req.body;

        try{
            let user = await User.findOne({
                email
            });
            if(!user){
                return res.status(404).json({
                    "message": " user not found"
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({
                    "message": " Incorrect Password"
                });
            }
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: 3600
                },
                (err, token)=>{
                    if(err) throw err;
                    res.status(200).json({token});
                }
            )
        } catch(error){
            res.status(500).json(error);
        }
    }
}

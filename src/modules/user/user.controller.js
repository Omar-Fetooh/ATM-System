import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

import userModel from "../../../database/models/user.model.js";
import { AppError, catchAsyncHandler } from "../../utils/error.js";

export const register = catchAsyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const userExist = await userModel.findOne({ username })
    if (userExist) {
        return new AppError("sorry, user already registered", 409)
    }

    const hash = bcrypt.hashSync(password, Number(process.env.saltRounds));
    const user = await userModel.create({ username, password: hash })

    res.status(201).json({ msg: "user registered successfully", user })
})

export const login = catchAsyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username })
    if (!user || !bcrypt.compareSync(password, user.password))
        return next(new AppError("User not exist or wrong password", 404))

    const token = jwt.sign({ username, role: user.role }, process.env.signatureKey)

    res.status(200).json({ msg: "user logged in successfully", token })
})

import accountModel from "../../../database/models/account.model.js";
import transactionModel from "../../../database/models/transaction.model.js";
import { AppError, catchAsyncHandler } from "../../utils/error.js";

export const createAccount = catchAsyncHandler(async (req, res, next) => {
    const { balance } = req.body;
    const accountExist = await accountModel.findOne({ user: req.user._id });
    if (accountExist) {
        return next(new AppError("account already exist", 409))
    }

    const account = await accountModel.create({
        user: req.user._id,
        balance,
        status: "Active",
    })

    res.status(201).json({ msg: "Account created Successfully", account })
})

export const deposit = catchAsyncHandler(async (req, res, next) => {
    const { amount } = req.body;
    const accountExist = await accountModel.findOne({ user: req.user._id });
    if (!accountExist) {
        return next(new AppError("account does not exist", 404))
    }

    accountExist.balance += amount

    const transaction = await transactionModel.create({
        accountId: req.user._id,
        transactionType: "Deposit",
        amount,
        transactionDate: Date.now(),
        transactionStatus: "Success",
    })
    accountExist.accountHistory.push(transaction)

    await accountExist.save()

    res.status(201).json({ msg: "Amount deposited successfully", accountExist })
})

export const withdraw = catchAsyncHandler(async (req, res, next) => {
    const { amount } = req.body;
    const accountExist = await accountModel.findOne({ user: req.user._id });
    if (!accountExist) {
        return next(new AppError("account does not exist", 404))
    }

    accountExist.balance -= amount

    const transaction = await transactionModel.create({
        accountId: req.user._id,
        transactionType: "Withdrawal",
        amount,
        transactionDate: Date.now(),
        transactionStatus: "Success",
    })
    accountExist.accountHistory.push(transaction)

    await accountExist.save()

    res.status(201).json({ msg: "Amount withDrawed successfully", accountExist })
})

export const getBalance = catchAsyncHandler(async (req, res, next) => {
    const accountExist = await accountModel.findOne({ user: req.user._id });
    if (!accountExist) {
        return next(new AppError("account does not exist", 404))
    }

    const balance = accountExist.balance;

    res.status(201).json({ msg: "done", balance })
})

export const getTransactions = catchAsyncHandler(async (req, res, next) => {
    const accountExist = await accountModel.findOne({ user: req.user._id });
    if (!accountExist) {
        return next(new AppError("account does not exist", 404))
    }

    const transactions = await transactionModel.find({ accountId: req.user._id });

    res.status(201).json({ msg: "done", transactions })
})
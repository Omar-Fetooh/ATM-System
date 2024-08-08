import mongoose, { Types } from "mongoose"

const transactionSchema = mongoose.Schema({
    accountId: {
        type: Types.ObjectId,
        ref: 'account',
        required: true
    },
    transactionType: {
        type: String,
        enum: ["Withdrawal", "Deposit", "Balance Inquiry"]
    },
    amount: {
        type: Number,
        default: 0,
    },
    transactionDate: {
        type: Date,
        required: true,
    },
    transactionStatus: {
        type: String,
        enum: ["Success", "Failed", "Pending"]
    },
    // recipientAccountId: [{              /// optional 
    //     type: Types.ObjectId,
    //     ref: 'user'
    // }]
},
    {
        timestamps: true,
        versionKey: false
    }
)


const transactionModel = mongoose.model('transaction', transactionSchema)

export default transactionModel
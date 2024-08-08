import mongoose, { Types } from "mongoose"

const accountSchema = mongoose.Schema({
    user: {
        type: Types.ObjectId,
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Blocked"]
    },
    accountHistory: [{
        type: Types.ObjectId,
        ref: 'transaction'
    }]
},
    {
        timestamps: true,
        versionKey: false
    }
)


const accountModel = mongoose.model('account', accountSchema)

export default accountModel
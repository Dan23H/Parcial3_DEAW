const {Schema, model} = require('mongoose')

const MessageScheme = Schema({
    message: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

MessageScheme.method('toJSON',function() {
    const {__v,_id, ...object} = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Message', MessageScheme)
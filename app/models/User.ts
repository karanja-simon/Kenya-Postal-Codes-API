import {Schema, model} from 'mongoose';

let UserSchema: Schema = new Schema({
    name: {
        type: String,
        default: '',
        required: true
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: '',
        required: true
    }
});



export default model('User', UserSchema);
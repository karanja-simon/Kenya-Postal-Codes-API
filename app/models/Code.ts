import {Schema, model} from 'mongoose';

let CodeSchema: Schema = new Schema({
    postalCode: {type: Number, default: 0},
    postalName: {type: String, default: ''},
}, { collection: 'codes' });


export default model('Code', CodeSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA']
    },
    arrival: {
        type: Date,
    }
});

var flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function() {
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth();
            let day = today.getDate();
            let nextYear = new Date(year + 1, month, day);
            return nextYear;
        }
    },
    destinations: [destinationSchema],
    airport: {
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA'],
        default: 'SEA'
    },
    tickets:[{type: Schema.Types.ObjectId, ref: 'Ticket'}],
},{
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);


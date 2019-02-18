var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show
};

// function show(req, res) {
//     Flight.findById(req.params.id), function(err, flight) {
//         Ticket.find({flight: flight._id}, function(err, tickets) {
//                 res.render('flights/show', { title: 'Flight Detail', flight, tickets });
//             });        
//     };
// }



// function show(req, res) {
//     Flight.findById(req.params.id)
//       .populate('tickets').exec(function (err, flight) {
//         Flight.find({ _id: {$nin: flight.tickets}})
//           .exec(function (err, tickets) {
//             console.log(tickets);
//             res.render('flights/show', { title: 'Flight Detail', flight, tickets });
//           });
//       });
//   }


function show(req, res) {
    Flight.findById(req.params.id)
    .populate('tickets').exec(function (err, flight) {
        //Ticket.find({ flight: flight._id }, function (err, tickets) {
            // console.log(tickets);
        res.render('flights/show', { title: 'Flight Detail', flight });
        //});
    });
}



    function index(req, res) {
        Flight.find({}, function (err, flights) {
            res.render('flights/index', { title: 'Flights', flights });
        });
    }

    function newFlight(req, res) {
        res.render('flights/new', { title: 'Add Flight' });
    }

    function create(req, res) {
        for (let key in req.body) {
            if (req.body[key] === '') delete req.body[key];
        };
        var flight = new Flight(req.body);
        flight.save(function (err) {
            if (err) return res.render('flights/new');
            console.log(flight);
            res.redirect('/flights');
        });
    }
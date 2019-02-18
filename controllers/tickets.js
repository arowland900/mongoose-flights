var Ticket = require('../models/ticket');
var Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
};

function create(req, res) {
    console.log("Got here");
    console.log(req.params.id);
    Flight.findById(req.params.id, function (err, flight) {
        var ticket = new Ticket(req.body);
        // Adding ticket to flight
        flight.tickets.push(ticket);
        ticket.save(function (err) { });
        console.log("Pushed Ticket");
        flight.save(function (err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
};


function addToFlight(ticket, flightId) {

}

function newTicket(req, res) {

    Flight.findById(req.params.id, function (err, flight) {
        console.log(flight);
        Ticket.find({}, function (err, tickets) {
            res.render('tickets/new', {
                title: 'Add Ticket',
                tickets, flight
            });
        });
    });
}
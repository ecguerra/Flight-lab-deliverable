const dbConfig = require('./config/db.config')
const { flight } = require('./models')


const db = require('./models')
const Airport = db.airport
const Flight = db.flight
const Passenger = db.passenger
const Terminal = db.terminal

// db connection
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit();
  });

// Make and save first airport

const airport = new Airport({
	name: 'First Airport',
	country: 'US',
	opened: '2020-12-15'
})

airport.save()
console.log('Airport saved', airport)

// Make and save flights

const flight1 = new Flight({
  from: 'CDG',
  to: 'JFK',
  airline: 'American Airlines'
})

flight1.save()
console.log('Flight saved', flight1)

const flight2 = new Flight({
  from: 'LHR',
  to: 'JFK',
  airline: 'British Airways'
})

flight2.save()
console.log('Flight saved', flight2)


// Make and save JFK airport
const jfk = new Airport({
  name: 'JFK',
  country: 'US',
  opened: '1990-1-12'
})

jfk.save()
console.log('Airport saved', jfk)

// Make and save Terminal 1
const terminal1 = new Terminal({
  name: 'Terminal 1',
  flights: [flight1, flight2],
  capacity: 234324
})

terminal1.save()
console.log('Terminal saved', terminal1)


// add terminal to airport
Airport.findOneAndUpdate(
  {name: 'JFK'}, 
  {$push: { terminals: terminal1 }},
  {useFindAndModify:false, new:true}
)
  .exec((err,updatedAirport) => {console.log('Airport Updated', updatedAirport)})
  
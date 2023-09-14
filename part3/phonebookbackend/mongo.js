const mongoose = require('mongoose');

const [, , password, name, number] = process.argv;

if (!password) {
	console.log('give password as argument');
	process.exit();
}
const URL = `mongodb+srv://bibendi:${password}@cluster0.hblhvtz.mongodb.net/phonebook?retryWrites=true&w=majority`;

console.log('Connecting to the database...');
mongoose
	.connect(URL)
	.then(() => {
		console.log('Connected to the database');
		const personSchema = new mongoose.Schema({
			name: String,
			number: String
		});
		const Person = mongoose.model('Person', personSchema);
		if (name && number) {
			console.log('Saving person');

			const person = new Person({ name, number });
			person.save().then(() => {
				console.log('Saved person');
				mongoose.connection.close();
				console.log('Disconnecting from the database');
			});
		}
		else {
			Person.find({}).then(result => {
				console.log('phonebook:');
				result.forEach(person => console.log(person.name, person.number));
				mongoose.connection.close();
			});
		}
	});
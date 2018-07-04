import mongoose from 'mongoose'

export default function connect ():void {
	mongoose.connect('mongodb://localhost/test')
	let db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error:'))
	db.once('open', function ():void {
	    console.log('connection has been established')
	})
}

// Bulletin Board Application Create a website that allows people to post messages to a page. 
//A message consists of a title and a body. The site should have two pages:
//The first page shows people a form where they can add a new message.
//The second page shows each of the messages people have posted. Make sure there's a way to navigate the site so users can access each page.
//Messages must be stored in a postgres database. Create a "messages" table with three columns: column name / column data type:
//id: serial primary key ,title: text, body: text

const pg = require('pg');
const app = require('express')();
const bodyParser = require('body-parser');


var connection = 'postgres://' + 'postgres' + ':' + '12345678' +'@localhost/bulletinboard';


app.set('views', 'views');
app.set('view engine', 'pug');
 
app.use(bodyParser.urlencoded({ extended: false }));

//create a route in a get req and render the pugfile , the pugfile needs to contain a form which can post a message
app.get('/', (request,response) => {
	response.render('bulletin')
})


// post req which we can use to post the message. this needs a route of the posted message,
app.post('/postform',(request,response) =>{
	pg.connect(connection, (err, client, done) => {
		if (err) {
		 throw err;
		}
		client.query(`INSERT INTO messages (title, body) VALUES ('${request.body.title}', '${request.body.body}')`, () => {
			client.query("SELECT * FROM messages", (err, result) => {
				if (err) {
		         throw err;
		        }
				response.render('postform', { posts: result.rows});
				done();
				pg.end();
			});
		});
	});
});
		
app.listen(8000, function(){
  console.log('Express listening on port', this.address().port);
});







//form. 
//post button
//route app.get[./.]
//local host app.listen
//redirect  to message board 
//response.render pug file



//Messages must be stored in a postgres database. Create a "messages" table with three columns: column name / column data type:

//id: serial primary key
//title: text
//body: text
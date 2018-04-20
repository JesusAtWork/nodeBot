const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const server = require("http").Server(app);
const morgan = require("morgan");
const colors = require("colors");
const readline = require('readline-sync');
const translate = require('google-translate-api');
const io = require("socket.io")(server);

/*const mysql = require("mysql");

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database:"chatbots"
});
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to DB")
});
*/
app.use(morgan('dev'));
app.use(bodyParser.json())

server.listen(4000);

app.use(express.static("client"));


console.log("      .~~.   .~~.".green);
console.log("     '. \ ' ' / .'".green);
console.log("      .~ .~~~..~.".red);
console.log("     : .~.'~'.~. :".red);
console.log("    ~ (   ) (   ) ~".red);
console.log("   ( : '~'.~.'~' : )".red);
console.log("    ~ .~ (   ) ~. ~".red);
console.log("     (  : '~' :  )".red);
console.log("      '~ .~~~. ~'".red);
console.log("          '~'".red);

console.log("========================");
console.log("=   RASPBERRY PI BOT   =");
console.log("========================");
console.log("");

var bot = {
    name:'Botcito'
}
var me = {
    name:''
}

var loop = 0;

while(true){
    if(loop==0){
        console.log("Hola soy "+bot.name.green+" en que te puedo ayudar")
    }else if(loop>0){
        console.log("Que mas quieres?")
    }

    var query = readline.question("> ");
    query.toLowerCase();

    switch (query) {
        case 'hola':
               me.name = readline.question('Como te llamas? ');
               console.log('Hola '+me.name);
            break;
        case 'salir':
            console.log('Adios')
            break;
        default:
            //console.log('No entiendo lo que estas diciendo'.green)
            break;
    }

    var math = query.includes('cuanto es ');
    var definition = query.includes('que es ');
    var trans = query.includes('en: ');

    if(math){
        //console.log('Estas preguntando algo de mates'.green);
        let inp = query.substring(10);
        console.log(colors.blue(inp)+" es igual a ".green+colors.blue(eval(inp)));
    }
    if(definition){
        console.log('Estas preguntando acerca de una definicion'.green);
    }
    if(trans){
        let inp = query.substring(10);
        translate(inp, {to: 'en'}).then(res => {
            console.log(res.text.green);
        }).catch(err => {
            console.error(err);
        });
    }

    loop++;
}

//app.set("view engine", "ejs");
/*
app.get("/", function(req, res) {
	con.query("SELECT * FROM chatbots", function (err, rows) {
		res.render("index",{bots:rows});       
	});
});

con.query("SELECT * FROM chatbots", function (err, rows) {
	rows.forEach(bot => {
		app.get("/"+bot.name, function(req, res) {
			con.query("SELECT * FROM chatbots WHERE name='"+bot.name+"' ", function (err, rows) {
				res.render("chatbot",{bot:rows[0]});       
			});
		});
	});
});*/
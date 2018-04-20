const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const server = require("http").Server(app);
const morgan = require("morgan");
const colors = require("colors");
const readline = require('readline-sync');
const translate = require('google-translate-api');
const io = require("socket.io")(server);
const weather = require("weather-js");

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

console.log("Hola soy "+bot.name.green+" en que te puedo ayudar")

function query(query){

  query = readline.question("> ");
  query.toLowerCase();

/*    switch (query) {
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
    }*/

  var math = query.includes('cuanto es ');
  var definition = query.includes('que es ');
  var trans = query.includes('en: ');
  var clima = query.includes('tiempo');
  
  if(math){
    var result = strToMath(query);
    console.log(colors.blue(query.substring(10))+" es igual a ".green+colors.blue(result));
  }
  if(trans){
    var translatestr = query.substring(4);
  
    translate(translatestr, {to: 'en'}).then(res => {
          console.log(res.text);
      }).catch(err => {
          console.error('ERROR: '+err);
      });
  }
  if(clima){
    getWeather(query);
  }
  if(definition){console.log('Estas preguntando acerca de una definicion'.green);}
}
function getWeather(query){
    var translatestr = query.substring(6);
    weather.find({
      search:'Requegua,sexta region',
      degreeType:'C'
    },
    function(err,result){
      if(err) console.log(err);
      //console.log(JSON.stringify(result,null,2));
      var current = result[1].current;
      var tomorrow = result[1].forecast[2];
      var tomorrow2 = result[1].forecast[3];

      if(current.skytext=='Sunny'){
        current.skytext='Soleado'.green;
      }
      else if(current.skytext=='Clear'){
        current.skytext='Despejado'.yellow;
      }
      
      if(tomorrow.skytextday=='Sunny'){
        tomorrow.skytextday='Soleado'.green;
      }
      else if(tomorrow.skytextday=='Clear'){
        tomorrow.skytextday='Despejado'.yellow;
      }
      
      if(tomorrow2.skytextday=='Sunny'){
        tomorrow2.skytextday='Soleado'.green;
      }
      else if(tomorrow2.skytextday=='Clear'){
        tomorrow2.skytextday='Despejado'.yellow;
      }
    
      if(tomorrow.low<=12){
        tomorrow.low=tomorrow.low.red+'ºC'.red;
      }else if(tomorrow.low<12 && tomorrow.low>20){
        tomorrow.low=tomorrow.low.yellow+'ºC'.yellow;
      }else if(tomorrow.low>20){
        tomorrow.low=tomorrow.low.green+'ºC'.green;
      }
      
      if(tomorrow.high<=12){
        tomorrow.high=tomorrow.high.red+'ºC'.red;
      }else if(tomorrow.high<12 && tomorrow.high>20){
        tomorrow.high=tomorrow.high.yellow+'ºC'.yellow;
      }else if(tomorrow.high>20){
        tomorrow.high=tomorrow.high.green+'ºC'.green;
      }
      
      if(tomorrow2.low<=12){
        tomorrow2.low=tomorrow2.low.red+'ºC'.red;
      }else if(tomorrow2.low<12 && tomorrow2.low>20){
        tomorrow2.low=tomorrow2.low.yellow+'ºC'.yellow;
      }else if(tomorrow2.low>20){
        tomorrow2.low=tomorrow2.low.green+'ºC'.green;
      }
      
      if(tomorrow2.high<=12){
        tomorrow2.high=tomorrow2.high.red+'ºC'.red;
      }else if(tomorrow2.high<12 && tomorrow2.high>20){
        tomorrow2.high=tomorrow2.high.yellow+'ºC'.yellow;
      }else if(tomorrow2.high>20){
        tomorrow2.high=tomorrow2.high.green+'ºC'.green;
      }
      
      console.log(
        'Temperatura Actual: '+
        current.temperature.green+'ºC '.green+' '+
        current.skytext
      );
      console.log("---".yellow+tomorrow.day.yellow+"---".yellow);
      console.log(
        'Minima: '+tomorrow.low+' '+
        'Maxima: '+tomorrow.high+' '+
        tomorrow.skytextday
      );
      console.log("---".yellow+tomorrow2.day.yellow+"---".yellow);
      console.log(
        'Minima: '+tomorrow2.low+' '+
        'Maxima: '+tomorrow2.high+' '+
        tomorrow2.skytextday
      );
    }
  )
}
function strToMath(query){
  //console.log('Estas preguntando algo de mates'.green);
  var mathStr = query.substring(10);
  return eval(mathStr);
}
function strToTranslate(query){
  var translateStr = query.substring(4);
  
  translate(translateStr, {to: 'en'}).then(res => {
      return res.text;
  }).catch(err => {
      console.error(err);
      return 'ERROR: '+err;
  });
}

query();
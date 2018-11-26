var express      = require('express')
var cookieParser = require('cookie-parser')
 
var app = express()
app.use(cookieParser())
 
app.get('/', function(req, res) {
  console.log('Cookies: ', req.cookies);
  // console.log('Here: ',req.);
  if(typeof(req.cookies.xyz) != 'undefined'){
  	console.log('yayy');
  }
  else {
  	console.log('noo');
  }
})
 
app.listen(8080)
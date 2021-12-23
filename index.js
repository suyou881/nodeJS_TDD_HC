let express = require('express');
var multer = require("multer");
var fs = require("fs");
let morgan = require('morgan');
let bodyParser = require('body-parser');
var querystring = require("querystring");
var path = require("path");
const axios = require('axios').default;
var exphbs = require("express-handlebars");
const formidable = require('formidable');
var cloudinary = require('cloudinary').v2;
const cookieParser = require("cookie-parser");
const url = require("url");

const cloudinaryConfig = (req, res, next) => {
    cloudinary.config({
        cloud_name: 'dqhxarzwd',
        api_key: '563238535556164',
        api_secret: 'fRkqBE7iGTS5w5FsqLKWNfQRfwM',
        secure: true
    });
    next();
}
let app = express();

let user = require('./api/user/index.js');

const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    helpers: {
        navLink: function (url, options) {
                return '<li' +
                    ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
                    '><a href="' + url + '">' + options.fn(this) + '</a></li>';
            }
            ,
        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        },
        isEmpty: function (items, options) {
            if (items.length == 0)
                return options.fn(this);
            else if (items.length > 1)
                return
            options.inverse(this);
        }
    }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/js"));
app.use(function (req, res, next) {
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
});
app.use('/*', cloudinaryConfig);
if(process.env.NODE_ENV !=='test'){
    app.use(morgan('dev'));
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secret"));



app.use('/',user);

//test 코드를 돌릴 때 supertest에서도 서버를 돌리기 때문에 중복이 된다.
//그래서 여기에서는 잠시 막아놓는다.
// app.listen(3000,function(){
//     console.log('Example app listening on port 3000!');
// });


module.exports=app;
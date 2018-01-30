require("dotenv").config();

var password = require("./password.js")

var sqlPassword = password.password.password;


var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: sqlPassword,
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId + "\n");
	connection.end();
})

var inquirer = require("inquirer");
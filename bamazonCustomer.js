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
	queryStore();
})

function queryStore () {
	var query = connection.query("SELECT item_id, product_name, department_name, price FROM products", function (err, res) {
		for (var i = 0; i < res.length; i++) {
			console.log("Item ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " +  "Department: " + res[i].department_name + " | " + "Price: " + res[i].price);
		}
	});
}

var inquirer = require("inquirer");
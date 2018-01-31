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
	customerBuysProduct();
	});
}

var inquirer = require("inquirer");

function customerBuysProduct () {
	inquirer.prompt([
	{
		type: "input",
		message: "Welcome to Bamazon! Please select an item to purchase via item id.",
		name: "item_id"
		
	},
	{
		type: "input",
		message: "How much would you like to buy? Please enter a numeric value.",
		name: "requested_quantity"
	}
]).then(function(inquirerResponse) {
	// console.log(inquirerResponse.requested_quantity);
	// Query the store for inputted item only
	var query = connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE item_id = ?", [inquirerResponse.item_id], function(err, res) {
		for (var i = 0; i < res.length; i++) {
			// console.log(res[i].price);
			//If/else logic based on quantity:
			if (inquirerResponse.requested_quantity <= res[i].stock_quantity) {
				console.log("Your total for " + res[i].product_name + " at quantity: " + inquirerResponse.requested_quantity + " is " + res[i].price * inquirerResponse.requested_quantity + " \nThrough our super shady predictive analytics, we have already billed you at your preferred payment method. Thanks for choosing Bamazon!");
				var requested_quantity = parseInt(inquirerResponse.requested_quantity);
				console.log(requested_quantity);
				var updateQuantity = res[i].stock_quantity - requested_quantity;
				console.log(updateQuantity);
				var query = connection.query("UPDATE products SET stock_quantity = ?", [updateQuantity], "WHERE item_id = ?", [inquirerResponse.item_id], function(err, res) {
					console.log("Table updated!");
				});
			} else {
				console.log("Sorry, insufficent quantity. Please select another item. If you don't want to continue shoppng you can leave with control C.");
				customerBuysProduct();
			}
		}
	})

});

}


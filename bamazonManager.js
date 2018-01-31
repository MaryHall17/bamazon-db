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
	displayOptions();
})

var inquirer = require("inquirer");

function displayOptions () {
	inquirer.prompt([
	{ 
		type: "list",
		message: "Hello, Mary Hall. What would you like to do?",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
		name: "manager_choice"

	}
	]).then(function(inquirerResponse) {
		
		var command = inquirerResponse.manager_choice;
		console.log(command);
		
		//Switch statements

		switch (command) {
			case "View Products for Sale":
			viewProducts();
			break;

			case "View Low Inventory":
			viewInventory();
			break;

			case "Add to Inventory":
			addToInventory();
			break;

			case "Add New Product":
			addNewProduct();
			break;
		}

		function viewProducts() {
			var query = connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
				
				for (var i = 0; i < res.length; i++) {
				console.log("Item ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " +  "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Inventory: " + res[i].stock_quantity);
				}

			});
		}

		function viewInventory() {
			var query = connection.query("SELECT item_id, product_name, stock_quantity FROM products", function (err, res) {

				for (var i = 0; i < res.length; i++) {
					
					if(res[i].stock_quantity <= 5) {
						console.log("Item ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Inventory: " + res[i].stock_quantity);
					} else {
						console.log("Inventory for " + res[i].item_id + " is in good shape");
					}
				}
			})

		}

		function addToInventory() {
			inquirer.prompt([
			{
				type: "input",
				message: "What's the item_id?",
				name: "item_id"	

			},
			{
				type: "input",
				message: "Thanks. How many units would you like to add, Mary?",
				name: "inventory_addition"
			}
			]).then(function(inquirerResponse) {
				var query = connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [inquirerResponse.item_id], function(err, res) {
					// console.log(err);
					for (var i=0; i < res.length; i++) {
						
						var addition = parseInt(inquirerResponse.inventory_addition);
						console.log(addition);
						var updateQuantity = addition + res[i].stock_quantity;

					}

					var query = connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [updateQuantity, inquirerResponse.item_id], function(err, res) {
							console.log(updateQuantity);
						});
				})
				
			})

		}

		function addNewProduct() {
			inquirer.prompt([
			{
				type: "input",
				message: "What's the item id?",
				name: "item_id"
				
			},
			{
				type: "input",
				message: "What's the product name?",
				name: "product_name"
			},
			{
				type: "input",
				message: "Which department?",
				name: "department_name"
			},
			{
				type: "input",
				message: "How much are we selling this bad boy for?",
				name: "price"
			},
			{
				type: "input",
				message: "Groovy! How many do we have right now?",
				name: "stock_quantity"
			}
		]).then(function(inquirerResponse) {
				console.log("something happened");
				var sql = "INSERT INTO products VALUES ?";
				var item_id = parseInt(inquirerResponse.item_id);
				var price = parseInt(inquirerResponse.price);
				var stock_quantity = parseInt(inquirerResponse.stock_quantity);
				var values = [[item_id, inquirerResponse.product_name, inquirerResponse.department_name, price, stock_quantity]];
				var query = connection.query(sql, [values], function(err, res) {
					console.log(res);

				})
			})
		}
	})
}
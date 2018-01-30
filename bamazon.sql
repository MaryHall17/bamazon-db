CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL,
    product_name VARCHAR (200) NOT NULL,
    department_name VARCHAR (100) NOT NULL,
    price DECIMAL (10, 2),
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1004, "Shady BBQ Sauce", "Groceries", 5.99, 600); 

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5600, "Pikachu Headphones", "Electronics", 19.99, 750);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7899, "Fire Emblem: Awakening", "Gaming", 39.99, 860);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2300, "The Complete Works of Shakespeare", "Books", 10.99, 900);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8999, "Fair Trade Diamond Ring", "Jewelry", 1399.99, 600);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1100, "Basic Keurig Coffee Set of 10", "Groceries", 9.99, 800);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5400, "Basic Teen Girl Glitter Phone Case", "Electronics", 10.99, 400);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3200, "Basic Protein Powder, 15 oz.", "Health & Wellness", 19.99, 350);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2400, "The Complete Otaku Collection", "Books", 59.99, 200);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5800, "Last Week's iPhone maybe the 9", "Electronics", 1999.99, 50);




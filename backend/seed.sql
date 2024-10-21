-- DROP TABLE IF EXISTS Customers;
-- CREATE TABLE IF NOT EXISTS Customers (CustomerId INTEGER PRIMARY KEY, CompanyName TEXT, ContactName TEXT);
--INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (1, 'Alfreds Futterkiste', 'Maria Anders'), (4, 'Around the Horn', 'Thomas Hardy'), (11, 'Bs Beverages', 'Victoria Ashworth'), (13, 'Bs Beverages', 'Random Name');

DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS Users (email TEXT PRIMARY KEY, challenge TEXT);
-- INSERT INTO Users (email, challenge) VALUES ('kmarrip@ncsu.edu', "--- BEGIN KEY ---");

SELECT * FROM Users;
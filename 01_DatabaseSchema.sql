-- 1. BUILDING THE SCHEMA 

CREATE TABLE Stores (
    StoreID INT IDENTITY(1,1) PRIMARY KEY,
    Location NVARCHAR(100) NOT NULL,
    ManagerName NVARCHAR(100) NOT NULL
);

CREATE TABLE Products (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Inventory (
    InventoryID INT IDENTITY(1,1) PRIMARY KEY,
    StoreID INT NOT NULL FOREIGN KEY REFERENCES Stores(StoreID),
    ProductID INT NOT NULL FOREIGN KEY REFERENCES Products(ProductID),
    QuantityInStock INT NOT NULL DEFAULT 0,
    LastUpdated DATETIME DEFAULT GETDATE()
);

CREATE TABLE Sales (
    SaleID INT IDENTITY(1,1) PRIMARY KEY,
    StoreID INT NOT NULL FOREIGN KEY REFERENCES Stores(StoreID),
    ProductID INT NOT NULL FOREIGN KEY REFERENCES Products(ProductID),
    QuantitySold INT NOT NULL,
    SaleDate DATETIME DEFAULT GETDATE()
);


-- 2. SEEDING THE MOCK DATA

INSERT INTO Stores (Location, ManagerName)
VALUES 
('Downtown Metro', 'Alice Chen'),
('North Suburb', 'Marcus Johnson'),
('Westside Plaza', 'Sarah Jenkins'),
('Airport Terminal', 'David Kim'),
('Southgate Mall', 'Elena Rodriguez');

INSERT INTO Products (Name, Category, Price)
VALUES 
('ThinkPad X1 Carbon', 'Laptops', 1499.99),
('MacBook Pro 14', 'Laptops', 1999.99),
('Dell XPS 13', 'Laptops', 1299.99),
('Sony WH-1000XM5', 'Audio', 348.00),
('AirPods Pro', 'Audio', 249.00),
('Samsung Galaxy S24', 'Smartphones', 899.99),
('iPhone 15 Pro', 'Smartphones', 999.99),
('iPad Air', 'Tablets', 599.00),
('Logitech MX Master 3S', 'Accessories', 99.99),
('Anker 737 Power Bank', 'Accessories', 149.99);

INSERT INTO Inventory (StoreID, ProductID, QuantityInStock)
VALUES 
(1, 1, 45), (1, 4, 8), 
(1, 7, 112),
(2, 2, 3), 
(2, 5, 85), (2, 9, 42),
(3, 3, 60), (3, 6, 95), 
(3, 10, 5), 
(4, 5, 120), (4, 8, 30),
(5, 1, 22), (5, 7, 4); 

INSERT INTO Sales (StoreID, ProductID, QuantitySold, SaleDate)
VALUES 
(1, 7, 2, DATEADD(DAY, -5, GETDATE())),
(1, 1, 1, DATEADD(DAY, -4, GETDATE())),
(2, 5, 4, DATEADD(DAY, -3, GETDATE())),
(3, 6, 1, DATEADD(DAY, -2, GETDATE())),
(5, 7, 3, DATEADD(DAY, -1, GETDATE())),
(1, 4, 2, GETDATE());

--SELECT * FROM Sales;
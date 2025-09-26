-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2025 at 04:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kape_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `addons`
--

CREATE TABLE `addons` (
  `addonID` int(11) NOT NULL,
  `addonName` varchar(100) NOT NULL,
  `priceSmall` decimal(10,2) DEFAULT 10.00,
  `priceLarge` decimal(10,2) DEFAULT 15.00,
  `isActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addons`
--

INSERT INTO `addons` (`addonID`, `addonName`, `priceSmall`, `priceLarge`, `isActive`) VALUES
(1, 'Milk', 10.00, 15.00, 1),
(2, 'Espresso Shot', 10.00, 15.00, 1),
(3, 'Syrup', 10.00, 15.00, 1),
(4, 'Strawberry Puree', 10.00, 15.00, 1),
(5, 'Condense', 10.00, 15.00, 1),
(6, 'Salted Cream', 10.00, 15.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryID` int(11) NOT NULL,
  `categoryName` varchar(100) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryID`, `categoryName`, `isActive`) VALUES
(1, 'Coffee Based', 1),
(2, 'Non-Coffee', 1),
(3, 'Cheese Cake Series', 1),
(4, 'Berry Series', 1),
(5, 'Ube Series', 1),
(6, 'Latte', 1),
(7, 'Tea Series', 1);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `streetNumber` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `barangay` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `contactNumber` varchar(20) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL,
  `customerID` int(11) DEFAULT NULL,
  `paymentMethod` varchar(20) DEFAULT NULL,
  `status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `createdAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `orderItemID` int(11) NOT NULL,
  `orderID` int(11) DEFAULT NULL,
  `productID` int(11) DEFAULT NULL,
  `sizeID` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productID` int(11) NOT NULL,
  `productName` varchar(150) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productID`, `productName`, `categoryID`, `isActive`, `createdAt`) VALUES
(1, 'Caramel Macchiato', 1, 1, '2025-09-08 16:06:13'),
(2, 'Cinnamon Latte', 1, 1, '2025-09-08 16:06:13'),
(3, 'Coconut Latte', 1, 1, '2025-09-08 16:06:13'),
(4, 'Sea Salt Latte', 1, 1, '2025-09-08 16:06:13'),
(5, 'Spanish Latte', 1, 1, '2025-09-08 16:06:13'),
(6, 'Hazelnut Latte', 1, 1, '2025-09-08 16:06:13'),
(7, 'Mocha Latte', 1, 1, '2025-09-08 16:06:13'),
(8, 'Dirty Matcha', 1, 1, '2025-09-08 16:06:13'),
(9, 'Dulca de Leche Latte', 1, 1, '2025-09-08 16:06:13'),
(10, 'Salted Caramel Latte', 1, 1, '2025-09-08 16:06:13'),
(11, 'White Mocha Latte', 1, 1, '2025-09-08 16:06:13'),
(12, 'Cafe Latte', 1, 1, '2025-09-08 16:06:13'),
(13, 'Matcha', 2, 1, '2025-09-08 16:06:13'),
(14, 'Cookies & Cream', 2, 1, '2025-09-08 16:06:13'),
(15, 'Milo Overload', 2, 1, '2025-09-08 16:06:13'),
(16, 'Red Velvet', 2, 1, '2025-09-08 16:06:13'),
(17, 'Coconut Matcha', 2, 1, '2025-09-08 16:06:13'),
(18, 'Berry Cheesecake', 3, 1, '2025-09-08 16:06:13'),
(19, 'Matcha Cheesecake', 3, 1, '2025-09-08 16:06:13'),
(20, 'Oreo Cheesecake', 3, 1, '2025-09-08 16:06:13'),
(21, 'Ube Cheesecake', 3, 1, '2025-09-08 16:06:13'),
(22, 'Red Velvet Cheesecake', 3, 1, '2025-09-08 16:06:13'),
(23, 'Strawberry Milk', 4, 1, '2025-09-08 16:06:13'),
(24, 'Berry Matcha', 4, 1, '2025-09-08 16:06:13'),
(25, 'Berry Oreo', 4, 1, '2025-09-08 16:06:13'),
(26, 'Berry Choco', 4, 1, '2025-09-08 16:06:13'),
(27, 'Creamy Ube', 5, 1, '2025-09-08 16:06:13'),
(28, 'Ube Latte', 5, 1, '2025-09-08 16:06:13'),
(29, 'Ube Matcha', 5, 1, '2025-09-08 16:06:13'),
(30, 'Ube Macapuno', 5, 1, '2025-09-08 16:06:13'),
(37, 'Berry Cafe', 4, 1, '2025-09-19 14:45:59'),
(38, 'Berry Latte', 4, 1, '2025-09-19 14:52:03'),
(42, 'Berry Juice', 4, 1, '2025-09-24 14:23:19'),
(43, 'blueberry', 4, 1, '2025-09-24 15:07:23');

-- --------------------------------------------------------

--
-- Table structure for table `product_prices`
--

CREATE TABLE `product_prices` (
  `productID` int(11) NOT NULL,
  `sizeID` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_prices`
--

INSERT INTO `product_prices` (`productID`, `sizeID`, `price`) VALUES
(1, 1, 55.00),
(1, 2, 85.00),
(2, 1, 55.00),
(2, 2, 85.00),
(3, 1, 55.00),
(3, 2, 85.00),
(4, 1, 55.00),
(4, 2, 85.00),
(5, 1, 55.00),
(5, 2, 85.00),
(6, 1, 55.00),
(6, 2, 85.00),
(7, 1, 55.00),
(7, 2, 85.00),
(8, 1, 55.00),
(8, 2, 85.00),
(9, 1, 55.00),
(9, 2, 85.00),
(10, 1, 55.00),
(10, 2, 85.00),
(11, 1, 55.00),
(11, 2, 85.00),
(12, 1, 55.00),
(12, 2, 85.00),
(13, 1, 55.00),
(13, 2, 85.00),
(14, 1, 55.00),
(14, 2, 85.00),
(15, 1, 55.00),
(15, 2, 85.00),
(16, 1, 55.00),
(16, 2, 85.00),
(17, 1, 55.00),
(17, 2, 85.00),
(18, 1, 55.00),
(18, 2, 85.00),
(19, 1, 55.00),
(19, 2, 85.00),
(20, 1, 55.00),
(20, 2, 85.00),
(21, 1, 55.00),
(21, 2, 85.00),
(22, 1, 55.00),
(22, 2, 85.00),
(23, 1, 55.00),
(23, 2, 85.00),
(24, 1, 55.00),
(24, 2, 85.00),
(25, 1, 55.00),
(25, 2, 85.00),
(26, 1, 55.00),
(26, 2, 85.00),
(27, 1, 55.00),
(27, 2, 85.00),
(28, 1, 55.00),
(28, 2, 85.00),
(29, 1, 55.00),
(29, 2, 85.00),
(30, 1, 55.00),
(30, 2, 85.00),
(37, 1, 55.00),
(37, 2, 85.00),
(38, 1, 55.00),
(38, 2, 85.00),
(42, 1, 55.00),
(42, 2, 85.00),
(43, 1, 55.00),
(43, 2, 85.00);

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `sizeID` int(11) NOT NULL,
  `sizeName` varchar(50) NOT NULL,
  `defaultPrice` decimal(10,2) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`sizeID`, `sizeName`, `defaultPrice`, `isActive`) VALUES
(1, '16oz', 55.00, 1),
(2, '22oz', 85.00, 1);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transactionID` int(11) NOT NULL,
  `cashierID` int(11) NOT NULL,
  `orderSummary` text NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `paymentMethod` enum('Cash','Card','GCash') DEFAULT 'Cash',
  `status` enum('Completed','Refunded','Voided') DEFAULT 'Completed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_log`
--

CREATE TABLE `transaction_log` (
  `logID` int(11) NOT NULL,
  `userEmail` varchar(100) DEFAULT 'Guest',
  `actionType` varchar(50) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction_log`
--

INSERT INTO `transaction_log` (`logID`, `userEmail`, `actionType`, `details`, `createdAt`) VALUES
(1, 'Guest', 'DELETE_PRODUCT', 'Deleted product ID=31', '2025-09-19 09:37:17'),
(2, 'Guest', 'DELETE_PRODUCT', 'Deleted product ID=35', '2025-09-19 09:38:01'),
(3, 'Guest', 'DELETE_PRODUCT', 'Deleted product ID=34', '2025-09-19 09:38:04'),
(4, 'Guest', 'DELETE_PRODUCT', 'Deleted product ID=33', '2025-09-19 09:38:06'),
(5, 'Guest', 'DELETE_PRODUCT', 'Deleted product ID=32', '2025-09-19 13:30:28'),
(6, 'Guest', 'DELETE_PRODUCT', 'Deleted product ID=36', '2025-09-19 13:38:20'),
(7, 'Guest', 'DELETE_PRODUCT', 'Deleted product ID=39', '2025-09-19 16:09:34'),
(8, 'Guest', 'DELETE_PRODUCT', 'Deleted product ID=40', '2025-09-24 14:22:32'),
(9, 'Guest', 'DELETE_PRODUCT', 'Deleted product ID=41', '2025-09-24 14:23:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `role` enum('admin','cashier') DEFAULT 'admin',
  `isActive` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `username`, `passwordHash`, `role`, `isActive`) VALUES
(1, 'admin', '$2y$10$kFK7AkmYA3BkcGstrunmLupuS.VTgq/mS84IxoKmTTzkTxyr8DEWG', 'admin', 1),
(2, 'cashier', '$2y$10$j0hbcs6M821qzLv61a2KkuPNor.otE4De./x7wunKF0p80oJOHio2', 'cashier', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addons`
--
ALTER TABLE `addons`
  ADD PRIMARY KEY (`addonID`),
  ADD UNIQUE KEY `addonName` (`addonName`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryID`),
  ADD UNIQUE KEY `categoryName` (`categoryName`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `customerID` (`customerID`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`orderItemID`),
  ADD KEY `orderID` (`orderID`),
  ADD KEY `productID` (`productID`),
  ADD KEY `sizeID` (`sizeID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `categoryID` (`categoryID`);

--
-- Indexes for table `product_prices`
--
ALTER TABLE `product_prices`
  ADD PRIMARY KEY (`productID`,`sizeID`),
  ADD KEY `sizeID` (`sizeID`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`sizeID`),
  ADD UNIQUE KEY `sizeName` (`sizeName`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transactionID`),
  ADD KEY `cashierID` (`cashierID`);

--
-- Indexes for table `transaction_log`
--
ALTER TABLE `transaction_log`
  ADD PRIMARY KEY (`logID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addons`
--
ALTER TABLE `addons`
  MODIFY `addonID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `orderItemID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `sizeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transactionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction_log`
--
ALTER TABLE `transaction_log`
  MODIFY `logID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`),
  ADD CONSTRAINT `order_items_ibfk_3` FOREIGN KEY (`sizeID`) REFERENCES `sizes` (`sizeID`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`categoryID`) ON DELETE CASCADE;

--
-- Constraints for table `product_prices`
--
ALTER TABLE `product_prices`
  ADD CONSTRAINT `product_prices_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_prices_ibfk_2` FOREIGN KEY (`sizeID`) REFERENCES `sizes` (`sizeID`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`cashierID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

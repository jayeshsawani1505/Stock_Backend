-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 27, 2024 at 09:52 AM
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
-- Database: `stock`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `creditnoteinvoices`
--

CREATE TABLE `creditnoteinvoices` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `creditNote_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `reference_number` varchar(100) DEFAULT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `currency` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `website` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `billing_name` varchar(100) DEFAULT NULL,
  `billing_address_line1` varchar(255) DEFAULT NULL,
  `billing_address_line2` varchar(255) DEFAULT NULL,
  `billing_country` varchar(50) DEFAULT NULL,
  `billing_state` varchar(50) DEFAULT NULL,
  `billing_city` varchar(50) DEFAULT NULL,
  `billing_pincode` varchar(20) DEFAULT NULL,
  `shipping_name` varchar(100) DEFAULT NULL,
  `shipping_address_line1` varchar(255) DEFAULT NULL,
  `shipping_address_line2` varchar(255) DEFAULT NULL,
  `shipping_country` varchar(50) DEFAULT NULL,
  `shipping_state` varchar(50) DEFAULT NULL,
  `shipping_city` varchar(50) DEFAULT NULL,
  `shipping_pincode` varchar(20) DEFAULT NULL,
  `bank_name` varchar(100) DEFAULT NULL,
  `branch` varchar(100) DEFAULT NULL,
  `account_number` varchar(50) DEFAULT NULL,
  `account_holder_name` varchar(100) DEFAULT NULL,
  `ifsc` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `delivery_challans`
--

CREATE TABLE `delivery_challans` (
  `id` int(11) NOT NULL,
  `delivery_number` varchar(50) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `reference_number` varchar(100) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `expense_id` int(11) NOT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_mode` enum('Cash','Credit Card','Debit Card','Bank Transfer','Other') NOT NULL,
  `expense_date` date NOT NULL,
  `payment_status` enum('Paid','Pending','Failed') NOT NULL DEFAULT 'Pending',
  `description` text DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `item_code` varchar(50) NOT NULL,
  `units` varchar(50) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `selling_price` decimal(10,2) NOT NULL,
  `purchase_price` decimal(10,2) NOT NULL,
  `status` enum('In Stock','Out of Stock') NOT NULL DEFAULT 'In Stock',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `invoice_number` varchar(50) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `invoice_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `reference_number` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `recurring` tinyint(1) DEFAULT 0,
  `recurring_cycle` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `login_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','User','Manager') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `message_content` text NOT NULL,
  `status` enum('Sent','Delivered','Read') DEFAULT 'Sent',
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `read_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_mode` enum('Cash','Credit Card','Debit Card','Bank Transfer','Other') NOT NULL,
  `payment_date` date NOT NULL,
  `payment_status` enum('Completed','Pending','Failed') NOT NULL DEFAULT 'Pending',
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `item_type` enum('Product','Service') NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_code` varchar(50) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `selling_price` decimal(10,2) NOT NULL,
  `purchase_price` decimal(10,2) NOT NULL,
  `units` varchar(50) DEFAULT NULL,
  `alert_quantity` int(11) DEFAULT NULL,
  `barcode_code` varchar(50) DEFAULT NULL,
  `discount_type` varchar(50) DEFAULT NULL,
  `tax` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `purchase_id` varchar(50) NOT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `reference_no` varchar(100) DEFAULT NULL,
  `supplier_invoice_serial_no` varchar(100) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quotations`
--

CREATE TABLE `quotations` (
  `id` int(11) NOT NULL,
  `quotation_number` varchar(50) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `quotation_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `reference_number` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `return_debit_notes_purchases`
--

CREATE TABLE `return_debit_notes_purchases` (
  `id` int(11) NOT NULL,
  `purchase_id` varchar(50) NOT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `purchase_order_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `reference_no` varchar(100) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `signature`
--

CREATE TABLE `signature` (
  `signature_id` int(11) NOT NULL,
  `signature_name` varchar(100) NOT NULL,
  `signature_photo` varchar(255) DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subproducts`
--

CREATE TABLE `subproducts` (
  `subproduct_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `subproduct_name` varchar(100) NOT NULL,
  `subproduct_code` varchar(50) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `units` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `vendor_id` int(11) NOT NULL,
  `vendor_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `closing_balance` decimal(10,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `creditnoteinvoices`
--
ALTER TABLE `creditnoteinvoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `delivery_challans`
--
ALTER TABLE `delivery_challans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`expense_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD UNIQUE KEY `item_code` (`item_code`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`login_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `recipient_id` (`recipient_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `product_code` (`product_code`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vendor_id` (`vendor_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `quotations`
--
ALTER TABLE `quotations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `return_debit_notes_purchases`
--
ALTER TABLE `return_debit_notes_purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vendor_id` (`vendor_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `signature`
--
ALTER TABLE `signature`
  ADD PRIMARY KEY (`signature_id`);

--
-- Indexes for table `subproducts`
--
ALTER TABLE `subproducts`
  ADD PRIMARY KEY (`subproduct_id`),
  ADD UNIQUE KEY `subproduct_code` (`subproduct_code`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`vendor_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `creditnoteinvoices`
--
ALTER TABLE `creditnoteinvoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `delivery_challans`
--
ALTER TABLE `delivery_challans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `expense_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quotations`
--
ALTER TABLE `quotations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `return_debit_notes_purchases`
--
ALTER TABLE `return_debit_notes_purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `signature`
--
ALTER TABLE `signature`
  MODIFY `signature_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subproducts`
--
ALTER TABLE `subproducts`
  MODIFY `subproduct_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `vendor_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `creditnoteinvoices`
--
ALTER TABLE `creditnoteinvoices`
  ADD CONSTRAINT `creditnoteinvoices_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `creditnoteinvoices_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL;

--
-- Constraints for table `delivery_challans`
--
ALTER TABLE `delivery_challans`
  ADD CONSTRAINT `delivery_challans_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `delivery_challans_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `login` (`login_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `login` (`login_id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE SET NULL;

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL;

--
-- Constraints for table `quotations`
--
ALTER TABLE `quotations`
  ADD CONSTRAINT `quotations_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `quotations_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL;

--
-- Constraints for table `return_debit_notes_purchases`
--
ALTER TABLE `return_debit_notes_purchases`
  ADD CONSTRAINT `return_debit_notes_purchases_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `return_debit_notes_purchases_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE SET NULL;

--
-- Constraints for table `subproducts`
--
ALTER TABLE `subproducts`
  ADD CONSTRAINT `subproducts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

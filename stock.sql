-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2024 at 07:08 AM
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
  `category_photo` varchar(55) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_photo`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Electronics product', NULL, 'Devices, gadgets, and accessories.', '2024-11-07 08:00:19', '2024-11-07 09:34:32'),
(5, 'acdc', NULL, 'rererefdfdfdf', '2024-11-07 08:41:09', '2024-11-07 09:37:18'),
(6, 'sample category', NULL, 'sample category', '2024-11-07 08:45:08', '2024-11-13 05:27:15'),
(7, 'saas', NULL, 'sasasa', '2024-11-07 09:27:49', '2024-11-07 09:27:49'),
(8, 'Electronics', '1731567021864-199315581.png', 'Devices and gadgets', '2024-11-08 03:59:02', '2024-11-14 06:50:21'),
(9, 'Furniture', NULL, 'Office and home furniture', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(10, 'Clothing', NULL, 'Apparel and accessories', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(11, 'Kitchen', NULL, 'Kitchen appliances and tools', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(12, 'Books', NULL, 'Educational and fiction books', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(13, 'Toys', NULL, 'Children toys', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(14, 'Sports Equipment', NULL, 'Gear and accessories for sports', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(15, 'Health & Wellness', NULL, 'Vitamins, supplements, and wellness products', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(16, 'Beauty', NULL, 'Skincare and beauty products', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(17, 'Automotive', NULL, 'Car parts and accessories', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(18, 'booksai', '/uploads/category/1731567330409-644110513.jpg', 'sasas', '2024-11-11 13:35:57', '2024-11-14 06:55:30');

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
  `product_id` int(11) DEFAULT NULL,
  `subproduct_id` int(10) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_id` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `creditnoteinvoices`
--

INSERT INTO `creditnoteinvoices` (`id`, `customer_id`, `creditNote_date`, `due_date`, `reference_number`, `product_id`, `subproduct_id`, `quantity`, `unit`, `rate`, `notes`, `terms_conditions`, `total_amount`, `signature_id`, `created_at`, `updated_at`) VALUES
(1, 13, '0000-00-00', '0000-00-00', 'REF123', 1, 0, 10, 'pcs', 100.00, 'Note1', 'Terms A', 1000.00, 0, '2024-11-09 05:07:13', '2024-11-09 05:35:44'),
(2, 14, '1970-01-01', '2024-11-21', 'REF124', 2, 0, 5, NULL, 200.00, 'Note2', 'Terms B', 1000.00, 1, '2024-11-09 05:07:13', '2024-11-14 13:42:16'),
(4, 27, '2024-11-14', '2024-11-15', '23', 1, 1, 323, NULL, 23.00, '2323sdd', 'dsdsdsd', 2323.00, NULL, '2024-11-11 13:41:47', '2024-11-14 10:33:01');

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

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `profile_photo`, `name`, `currency`, `email`, `website`, `phone`, `notes`, `billing_name`, `billing_address_line1`, `billing_address_line2`, `billing_country`, `billing_state`, `billing_city`, `billing_pincode`, `shipping_name`, `shipping_address_line1`, `shipping_address_line2`, `shipping_country`, `shipping_state`, `shipping_city`, `shipping_pincode`, `bank_name`, `branch`, `account_number`, `account_holder_name`, `ifsc`, `created_at`, `updated_at`) VALUES
(13, NULL, 'krupalsinh chavda', '₹', 'krupalsinh@gmail.com', 'test.com', '7600230620', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', '7441052212', 'test test test', 'test', '2024-11-07 07:21:26', '2024-11-07 07:37:10'),
(14, NULL, 'jayesh sawani', '£', 'jayesh@gmail.com', 'dsdsd', '323232323`', 'dsds', 'dsds', 'dsdsd', 'dsd', 'dsd', 'dsdsd', 'dsd', 'dsd', 'dsds', 'dsdsd', 'dsd', 'dsd', 'dsdsd', 'dsd', 'dsd', 'dsdsd', 'dsdsd', 'dsd', 'dsdsd', 'dsdsds', '2024-11-07 07:48:52', '2024-11-07 07:49:04'),
(16, NULL, 'harsh joshi', '₹', 'hasrsh@gmail.com', 'test@.com', '7600230620', 'no', 'amd', 'amd', 'amd', 'india', 'guj', 'amd', '382330', 'amd', 'amd', 'amd', 'india', 'guj', 'amd', '382330', 'sbi', 'amd', '787778878', 'amd', 'amdDDSDS78', '2024-11-07 13:52:03', '2024-11-07 13:52:03'),
(17, NULL, 'John Doe', '£', 'johndoe@example.com', 'http://johndoe.com', '1234567890', 'Important client', 'John Doe', '123 Maple St', 'Suite 100', 'USA', 'CA', 'Los Angeles', '90001', 'John Doe', '123 Maple St', 'Suite 100', 'USA', 'CA', 'Los Angeles', '90001', 'Bank of America', 'Downtown', '123456789', 'John Doe', 'BOFAUS3N', '2024-11-07 14:30:55', '2024-11-07 14:33:07'),
(18, 'photo2.png', 'Jane Smith', 'EUR', 'janesmith@example.com', 'http://janesmith.com', '0987654321', 'Requires follow-up', 'Jane Smith', '456 Oak St', 'Apt 202', 'France', 'Ile-de-France', 'Paris', '75000', 'Jane Smith', '456 Oak St', 'Apt 202', 'France', 'Ile-de-France', 'Paris', '75000', 'BNP Paribas', 'Main', '987654321', 'Jane Smith', 'BNPAFRPP', '2024-11-07 14:30:55', '2024-11-07 14:30:55'),
(20, 'photo4.jpg', 'Lisa White', 'USD', 'lisa@example.com', 'www.lisawhite.com', '6677889900', 'Note 4', 'Lisa White', '101 Billing Lane', 'Suite 12', 'USA', 'Texas', 'Houston', '77001', 'Lisa White', '101 Shipping Lane', 'Suite 13', 'USA', 'Texas', 'Houston', '77001', 'Wells Fargo', 'East', '4567890123456789', 'Lisa White', 'WFBIUS6S', '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(21, 'photo5.jpg', 'Steve Black', 'CAD', 'steve@example.com', 'www.steveblack.ca', '4455667788', 'Note 5', 'Steve Black', '202 Billing Blvd', NULL, 'Canada', 'Ontario', 'Toronto', 'M5H 2N2', 'Steve Black', '202 Shipping Blvd', NULL, 'Canada', 'Ontario', 'Toronto', 'M5H 2N2', 'RBC', 'South', '5678901234567890', 'Steve Black', 'ROYCCAT2', '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(22, 'photo6.jpg', 'Rachel Lee', 'JPY', 'rachel@example.jp', 'www.rachelee.jp', '5566778899', 'Note 6', 'Rachel Lee', '303 Billing Way', NULL, 'Japan', 'Tokyo', 'Tokyo', '100-0001', 'Rachel Lee', '303 Shipping Way', NULL, 'Japan', 'Tokyo', 'Tokyo', '100-0001', 'Mitsubishi UFJ', 'Central', '6789012345678901', 'Rachel Lee', 'BOTKJPJT', '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(23, 'photo7.jpg', 'Dave Green', 'AUD', 'dave@example.com.au', 'www.davegreen.com', '2233445566', 'Note 7', 'Dave Green', '404 Billing Pl', NULL, 'Australia', 'New South Wales', 'Sydney', '2000', 'Dave Green', '404 Shipping Pl', NULL, 'Australia', 'New South Wales', 'Sydney', '2000', 'NAB', 'West', '7890123456789012', 'Dave Green', 'NATAAU33', '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(24, 'photo8.jpg', 'Emma Blue', 'INR', 'emma@example.in', 'www.emmablue.in', '9988776655', 'Note 8', 'Emma Blue', '505 Billing Path', NULL, 'India', 'Maharashtra', 'Mumbai', '400001', 'Emma Blue', '505 Shipping Path', NULL, 'India', 'Maharashtra', 'Mumbai', '400001', 'SBI', 'Central', '8901234567890123', 'Emma Blue', 'SBININBB', '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(25, 'photo9.jpg', 'Max Gray', 'NZD', 'max@example.nz', 'www.maxgray.co.nz', '3344556677', 'Note 9', 'Max Gray', '606 Billing Terrace', NULL, 'New Zealand', 'Auckland', 'Auckland', '1010', 'Max Gray', '606 Shipping Terrace', NULL, 'New Zealand', 'Auckland', 'Auckland', '1010', 'ANZ', 'East', '9012345678901234', 'Max Gray', 'ANZBNZ22', '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(26, 'photo10.jpg', 'Sara Green', 'SGD', 'sara@example.sg', 'www.saragreen.sg', '7766554433', 'Note 10', 'Sara Green', '707 Billing Circle', NULL, 'Singapore', 'Central', 'Singapore', '069112', 'Sara Green', '707 Shipping Circle', NULL, 'Singapore', 'Central', 'Singapore', '069112', 'DBS', 'West', '1234567890123457', 'Sara Green', 'DBSSSGSG', '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(27, NULL, 'new test 123', '₹', 'test@gmail.com', 'dsd', '2212121212', 'dsd', 'dsd', 'dsd', 'dsd', 'dsd', 'dsdsd', 'sd', '323232', 'dsd', 'dsd', 'dsd', 'dsd', 'dsdsd', 'sd', '323232', 'ewewe', 'ewewe', '323232323', 'ewewe', 'dsdw323', '2024-11-11 13:32:22', '2024-11-11 13:32:32'),
(28, '/uploads/customer/1731562441892-510194116.jpg', 'drashti', '₹', 'drashti@gmail.com', 'no.com', '7878784547', 'no', 'drashti', 'naroda', 'naroda', 'india', 'guj', 'amd', '382330', 'drashti', 'naroda', 'naroda', 'india', 'guj', 'amd', '382330', 'naroda', 'naroda', '21212122212', 'drashti naroda', 'naroda123', '2024-11-14 05:15:09', '2024-11-14 05:34:02');

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
  `product_id` int(11) DEFAULT NULL,
  `subproduct_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_id` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(255) NOT NULL,
  `invoice_details` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_challans`
--

INSERT INTO `delivery_challans` (`id`, `delivery_number`, `customer_id`, `delivery_date`, `due_date`, `product_id`, `subproduct_id`, `quantity`, `rate`, `notes`, `terms_conditions`, `total_amount`, `signature_id`, `created_at`, `updated_at`, `status`, `invoice_details`) VALUES
(1, 'DCN-001', 28, '2024-11-14', '2024-11-19', 9, 2, 3323, 3232.00, 'esdsd', 'dsdsd', 32323.00, 2, '2024-11-16 10:44:18', '2024-11-16 10:58:58', 'unpaid', ''),
(2, 'DCN-002', 13, '2024-11-16', '2024-11-17', 1, 1, 12, 12.00, 'dsdsd', 'dsd', 540.00, 2, '2024-11-16 10:56:20', '2024-11-19 08:47:18', 'paid', '[{\"product_id\":10,\"subproduct_id\":null,\"quantity\":4,\"unit\":\"box\",\"rate\":110,\"total_amount\":440},{\"product_id\":7,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100}]'),
(3, 'DCN-003', 28, '2024-11-19', '2024-11-13', NULL, 0, NULL, NULL, 'bo9,o', 'huoo', 200.00, 1, '2024-11-19 08:46:50', '2024-11-19 08:46:50', 'unpaid', '[{\"product_id\":10,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100},{\"product_id\":7,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100}]');

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

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`expense_id`, `reference`, `amount`, `payment_mode`, `expense_date`, `payment_status`, `description`, `attachment`, `created_at`, `updated_at`) VALUES
(2, '2wqw', 212.00, 'Cash', '2024-11-15', 'Paid', 'fdfd', '/uploads/expenses/1731740364126-591387732.jpg', '2024-11-16 06:59:24', '2024-11-16 06:59:24');

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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `notes` varchar(555) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `item_name`, `item_code`, `units`, `quantity`, `selling_price`, `purchase_price`, `status`, `created_at`, `updated_at`, `notes`) VALUES
(1, 'Item AB', 'ITEM001', 'pcs', 118, 20.50, 18.00, '', '2024-11-08 09:57:36', '2024-11-11 09:09:25', 'fdsfdf'),
(3, 'Item B', 'ITEM002', 'pcs', 190, 25.00, 18.00, 'In Stock', '2024-11-08 10:32:26', '2024-11-08 12:01:28', 'dsdsdsd'),
(4, 'Item C', 'ITEM003', 'kg', 150, 30.00, 20.00, 'In Stock', '2024-11-08 10:32:26', '2024-11-08 10:32:26', ''),
(5, 'Item D', 'ITEM004', 'pcs', 50, 10.00, 8.00, 'In Stock', '2024-11-08 10:32:26', '2024-11-08 10:32:26', ''),
(6, 'Item E', 'ITEM005', 'liters', 300, 15.00, 12.00, 'In Stock', '2024-11-08 10:32:26', '2024-11-08 10:32:26', ''),
(7, 'Item F', 'ITEM006', 'pcs', 120, 22.50, 16.50, 'In Stock', '2024-11-08 10:32:26', '2024-11-08 10:32:26', ''),
(8, 'Item G', 'ITEM007', 'kg', 180, 28.00, 18.50, 'In Stock', '2024-11-08 10:32:26', '2024-11-08 10:32:26', ''),
(9, 'Item H', 'ITEM008', 'pcs', 250, 18.00, 13.50, 'In Stock', '2024-11-08 10:32:26', '2024-11-08 10:32:26', ''),
(10, 'Item I', 'ITEM009', 'liters', 400, 35.00, 25.00, 'In Stock', '2024-11-08 10:32:26', '2024-11-08 10:32:26', ''),
(11, 'Item J', 'ITEM010', 'pcs', 500, 40.00, 30.00, 'In Stock', '2024-11-08 10:32:26', '2024-11-08 10:32:26', ''),
(12, 'Ittem K', 'ITEM011', 'box', 58, 100.00, 95.00, 'In Stock', '2024-11-08 12:06:13', '2024-11-08 12:07:02', 'default notes added'),
(13, 'dsd', 'dsd', 'sds', 212, 21212.00, 2121.00, '', '2024-11-11 13:39:46', '2024-11-11 13:39:46', 'default notes'),
(14, 'testq2', 'irttems L', 'box', 157, 1212.00, 1212.00, '', '2024-11-11 13:40:11', '2024-11-13 08:21:03', 'default notes');

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
  `transpoter_name` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `recurring` tinyint(1) DEFAULT 0,
  `recurring_cycle` varchar(55) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `subproduct_id` int(10) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_id` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `invoice_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`invoice_details`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_number`, `customer_id`, `invoice_date`, `due_date`, `transpoter_name`, `status`, `recurring`, `recurring_cycle`, `product_id`, `subproduct_id`, `quantity`, `unit`, `rate`, `bank_id`, `notes`, `terms_conditions`, `total_amount`, `signature_id`, `created_at`, `updated_at`, `invoice_details`) VALUES
(1, 'INV-001', 14, '2024-10-26', '2024-11-26', 'REF-001', 'paid', NULL, '0', 1, NULL, 11, NULL, 25.00, NULL, 'Thank you for your business.', 'Payment is due within 30 days.', 150.00, NULL, '2024-11-07 10:42:53', '2024-11-07 14:19:47', NULL),
(8, 'INV-002', 14, '2024-11-06', '2024-11-10', 'REF002', 'unpaid', NULL, '0', 1, 1, 10, NULL, 150.00, NULL, 'teser', 'Custom Terms', 1500.00, 2, '2024-11-08 06:25:39', '2024-11-15 12:23:41', NULL),
(9, 'INV003', 14, NULL, NULL, 'REF003', 'unpaid', NULL, '0', 2, NULL, 3, NULL, 100.00, NULL, '-', 'Standard Terms', 300.00, NULL, '2024-11-08 06:25:39', '2024-11-09 12:07:30', NULL),
(10, 'INV004', 16, NULL, NULL, 'REF004', 'partially_paid', NULL, '0', 2, NULL, 7, NULL, 250.00, NULL, '-', 'Custom Terms', 1750.00, NULL, '2024-11-08 06:25:39', '2024-11-09 12:07:35', NULL),
(11, 'INV-005', 17, '1970-01-01', '1970-01-01', 'REF005', 'cancelled', NULL, '0', 7, NULL, 8, NULL, 180.00, NULL, '-', 'Standard Terms', 1440.00, NULL, '2024-11-08 06:25:39', '2024-11-15 12:25:25', NULL),
(12, 'INV006', 18, NULL, NULL, 'REF006', 'draft', NULL, '0', 8, NULL, 12, NULL, 120.00, NULL, '-', 'Custom Terms', 1440.00, NULL, '2024-11-08 06:25:39', '2024-11-09 12:15:17', NULL),
(13, 'INV007', 18, NULL, NULL, 'REF007', 'refunded', NULL, '0', 7, NULL, 9, NULL, 220.00, NULL, '-', 'Standard Terms', 1980.00, NULL, '2024-11-08 06:25:39', '2024-11-14 11:03:41', NULL),
(14, 'INV008', 20, NULL, NULL, 'REF008', 'unpaid', NULL, '0', 8, NULL, 6, NULL, 170.00, NULL, '-', 'Custom Terms', 1020.00, NULL, '2024-11-08 06:25:39', '2024-11-09 12:15:25', NULL),
(15, 'INV009', 21, NULL, NULL, 'REF009', 'paid', NULL, '0', 9, NULL, 4, NULL, 200.00, NULL, '-', 'Standard Terms', 800.00, NULL, '2024-11-08 06:25:39', '2024-11-09 12:15:34', NULL),
(16, 'INV010', 22, '1970-01-01', '1970-01-01', 'REF010', 'overdue', NULL, '0', 1, NULL, 11, NULL, 130.00, NULL, '-fdfdf', 'Custom Terms', 3322.00, NULL, '2024-11-08 06:25:39', '2024-11-12 08:06:14', NULL),
(17, 'INV0011', 13, NULL, NULL, 'REF001', 'overdue', NULL, '0', 9, NULL, 5, NULL, 200.00, NULL, '-', 'Standard Terms', 1000.00, NULL, '2024-11-08 06:25:39', '2024-11-09 12:15:41', NULL),
(19, 'INV-018', 28, '2024-11-15', '2024-11-19', 'hhh', 'unpaid', NULL, '02', NULL, NULL, NULL, NULL, NULL, NULL, 'jhhj', 'jhhgh', 8000.00, 2, '2024-11-18 11:59:41', '2024-11-18 13:52:33', '[{\"product_id\":8,\"subproduct_id\":null,\"quantity\":20,\"unit\":\"box\",\"rate\":400,\"total_amount\":8000}]'),
(20, 'INV-020', 13, '2024-11-19', '2024-11-22', 'rere', 'unpaid', NULL, 'june', NULL, NULL, NULL, NULL, NULL, NULL, 'dfd', 'fdfdf', 2000.00, 1, '2024-11-18 13:55:53', '2024-11-18 13:55:53', '[{\"subproduct_id\":3,\"product_id\":9,\"quantity\":20,\"unit\":\"box\",\"rate\":100,\"total_amount\":2000},{\"subproduct_id\":2,\"product_id\":9,\"quantity\":20,\"unit\":\"box\",\"rate\":100,\"total_amount\":2000}]'),
(21, 'INV-021', 14, '2024-11-16', '2024-11-17', 'dsd', 'paid', NULL, 'dsd', NULL, NULL, NULL, NULL, NULL, NULL, 'fdfdf', 'fdfdf', 800.00, 2, '2024-11-18 14:45:36', '2024-11-19 05:18:13', '[{\"product_id\":8,\"subproduct_id\":null,\"quantity\":4,\"unit\":\"box\",\"rate\":200,\"total_amount\":800},{\"product_id\":9,\"subproduct_id\":null,\"quantity\":4,\"unit\":\"box\",\"rate\":100,\"total_amount\":400}]');

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

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`login_id`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'user@example.com', '$2a$10$oyQMqq06ACQjgDsxriA1MuHb2QYDu2OXDs9I3jH7jZqEIaD4nGd3G', 'Admin', '2024-10-27 13:18:07', '2024-10-27 13:18:07'),
(3, 'Pectrading@gmail.com', '$2a$10$C/zXt5qQPmr8ljFwgq5y1ufuia0r1jnuf0x8Awz0dfyoD1oo.YIve', 'Admin', '2024-11-16 07:09:11', '2024-11-16 07:09:11');

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
  `invoice_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_mode` varchar(55) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_status` varchar(55) NOT NULL DEFAULT 'Pending',
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`payment_id`, `invoice_id`, `amount`, `payment_mode`, `payment_date`, `payment_status`, `description`, `created_at`, `updated_at`) VALUES
(3, 20, 10.00, 'credit_card', '2024-11-19', 'Pending', 'na', '2024-11-19 13:40:57', '2024-11-19 13:40:57'),
(6, 19, 1400.00, 'paypal', '2024-11-19', 'unpaid', 'no', '2024-11-19 14:31:52', '2024-11-19 14:31:52'),
(7, 21, 400.00, 'credit_card', '2024-11-19', 'unpaid', 'no', '2024-11-19 15:46:51', '2024-11-19 15:46:51');

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

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `item_type`, `product_name`, `product_code`, `category_id`, `quantity`, `selling_price`, `purchase_price`, `units`, `alert_quantity`, `barcode_code`, `discount_type`, `tax`, `description`, `product_image`, `created_at`, `updated_at`) VALUES
(1, 'Product', 'Sample Product', 'SP001', 6, 100, 25.50, 20.00, 'Box', 10, NULL, NULL, NULL, 'This is a sample product description.', NULL, '2024-11-07 09:46:47', '2024-11-07 10:31:56'),
(2, 'Product', 'ewewe1212', 'ewewe', 1, 22, 22.00, 22.00, 'Pieces', 22, NULL, NULL, NULL, 'edsdsd', NULL, '2024-11-07 10:26:14', '2024-11-07 10:26:55'),
(7, '', 'Laptop', 'LAP123', 8, 112, 50000.00, 45000.00, 'pcs', 10, NULL, NULL, NULL, 'High-end laptop', NULL, '2024-11-08 04:37:46', '2024-11-15 12:24:19'),
(8, '', 'Chair', 'CHR456', 9, 116, 1500.00, 1200.00, 'pcs', 20, NULL, NULL, NULL, 'Ergonomic chair', NULL, '2024-11-08 04:37:46', '2024-11-18 15:42:08'),
(9, '', 'T-Shirt', 'TSH789', 10, 482, 300.00, 200.00, 'pcs', 50, NULL, NULL, NULL, 'Cotton T-shirt', NULL, '2024-11-08 04:37:46', '2024-11-18 15:42:08'),
(10, 'Product', 'newe', 'sa2q', 9, 62, 1212.00, 122.00, 'Box', 122, NULL, NULL, NULL, 'dsdsd', '/uploads/product/1731573684314-267880745.png', '2024-11-11 13:35:42', '2024-11-15 11:08:45'),
(11, 'Product', 'home speacker', 'homeKU', 8, 100, 500.00, 250.00, 'piece', 10, NULL, NULL, NULL, 'na', '', '2024-11-19 10:16:33', '2024-11-19 10:16:33');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `reference_no` varchar(100) DEFAULT NULL,
  `supplier_invoice_serial_no` varchar(100) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `subproduct_id` int(10) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_id` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `payment_mode` varchar(55) DEFAULT NULL,
  `status` varchar(55) DEFAULT NULL,
  `invoice_details` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `vendor_id`, `purchase_date`, `due_date`, `reference_no`, `supplier_invoice_serial_no`, `product_id`, `subproduct_id`, `quantity`, `unit`, `rate`, `notes`, `terms_conditions`, `total_amount`, `signature_id`, `created_at`, `updated_at`, `payment_mode`, `status`, `invoice_details`) VALUES
(2, 4, '0000-00-00', '0000-00-00', 'fdfdfdf', 'dsdsd', 1, NULL, 10, NULL, 10.00, 'DSDSDSDSD', 'DDSSDSD', 100.00, NULL, '2024-11-09 09:44:52', '2024-11-09 10:02:37', 'cash', 'unpaid', ''),
(5, 4, '2023-01-01', '2023-02-01', 'REF001', 'S001', 1, NULL, 10, NULL, 100.00, 'Initial Purchase', 'Terms A', 1000.00, NULL, '2024-11-09 10:14:32', '2024-11-09 10:14:32', 'Cash', 'Pending', ''),
(6, 5, '2023-01-05', '2023-02-05', 'REF002', 'S002', 2, NULL, 20, NULL, 150.00, 'Bulk Order', 'Terms B', 3000.00, NULL, '2024-11-09 10:14:32', '2024-11-09 10:14:32', 'Credit', 'Completed', ''),
(7, 7, '2023-01-10', '2023-02-10', 'REF003', 'S003', 7, NULL, 15, NULL, 200.00, 'Reorder', 'Terms C', 3000.00, NULL, '2024-11-09 10:14:32', '2024-11-09 10:14:32', 'Bank Transfer', 'Pending', ''),
(8, 6, '2023-01-15', '2023-02-15', 'REF004', 'S004', 8, NULL, 25, NULL, 120.00, 'Seasonal Stock', 'Terms D', 3000.00, NULL, '2024-11-09 10:14:32', '2024-11-09 10:14:32', 'Cash', 'Completed', ''),
(9, 8, '2023-01-19', '2023-02-19', 'REF005', 'S005', 9, NULL, 30, NULL, 130.00, 'Urgent Purchase', 'Terms E', 3900.00, NULL, '2024-11-09 10:14:32', '2024-11-09 10:16:47', 'Credit', 'paid', ''),
(10, 9, '2023-01-19', '2023-02-19', 'REF005', 'S006', 8, NULL, 30, NULL, 130.00, 'Urgent Purchase', 'Terms E', 3900.00, 2, '2024-11-09 10:19:47', '2024-11-14 14:10:17', 'Credit', 'unpaid', ''),
(11, 15, '0000-00-00', '0000-00-00', '21', '12', 10, NULL, 122, NULL, 212.00, 'dsd', 'sdsd', 1222.00, NULL, '2024-11-11 13:47:25', '2024-11-11 13:47:25', 'cash', 'paid', ''),
(12, 14, '0000-00-00', '0000-00-00', 'asas', 'asa', 7, NULL, 212, NULL, 212.00, 'sdsd', 'dsdd', 212.00, NULL, '2024-11-11 13:48:39', '2024-11-11 13:48:39', 'cash', 'partially_paid', ''),
(13, 15, '2024-11-12', '2024-11-13', 'sd', 'sdd', 9, 2, 21, NULL, 212.00, 'dds', 'sd', 212.00, 2, '2024-11-11 13:49:08', '2024-11-15 06:26:22', 'cash', 'paid', ''),
(14, 5, '2024-11-17', '2024-11-19', 'jkjkk', 'kjjj', NULL, NULL, NULL, NULL, NULL, 'yuhgvh', 'jbhjb;', 2000.00, 2, '2024-11-19 07:24:37', '2024-11-19 10:23:52', 'credit_card', 'paid', '[{\"product_id\":7,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":100,\"total_amount\":1000},{\"product_id\":8,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":100,\"total_amount\":1000}]');

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
  `status` varchar(50) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `subproduct_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `invoice_details` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotations`
--

INSERT INTO `quotations` (`id`, `quotation_number`, `customer_id`, `quotation_date`, `due_date`, `status`, `product_id`, `subproduct_id`, `quantity`, `rate`, `notes`, `terms_conditions`, `total_amount`, `signature_id`, `created_at`, `updated_at`, `invoice_details`) VALUES
(1, 'QTN-001', 28, '2024-11-13', '2024-11-15', 'paid', 9, 2, 22, 22.00, 'sdcd', 'cddsc', 2222.00, 1, '2024-11-16 09:24:01', '2024-11-16 10:08:19', ''),
(2, 'QTN-002', 28, '2024-11-19', '2024-11-12', 'unpaid', NULL, 0, NULL, NULL, 'vfv', 'vfvffv', 200.00, 1, '2024-11-19 09:27:58', '2024-11-19 09:27:58', '[{\"product_id\":10,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100},{\"product_id\":7,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100}]'),
(3, 'QTN-003', 13, '2024-11-18', '2024-11-21', 'unpaid', NULL, 0, NULL, NULL, 'fvzfz', 'fvfv', 200.00, 2, '2024-11-19 09:28:31', '2024-11-19 09:28:31', '[{\"product_id\":9,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100},{\"product_id\":2,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100}]');

-- --------------------------------------------------------

--
-- Table structure for table `return_debit_notes_purchases`
--

CREATE TABLE `return_debit_notes_purchases` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `purchase_order_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `reference_no` varchar(100) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `subproduct_id` int(10) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_id` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `payment_mode` varchar(55) DEFAULT NULL,
  `status` varchar(55) DEFAULT NULL,
  `invoice_details` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `return_debit_notes_purchases`
--

INSERT INTO `return_debit_notes_purchases` (`id`, `vendor_id`, `purchase_order_date`, `due_date`, `reference_no`, `product_id`, `subproduct_id`, `quantity`, `rate`, `notes`, `terms_conditions`, `total_amount`, `signature_id`, `created_at`, `updated_at`, `payment_mode`, `status`, `invoice_details`) VALUES
(1, 10, NULL, '0000-00-00', 'dsdsd', 7, NULL, 10, 10.00, 'dsdsdsd', 'dsdsd', 500.00, NULL, '2024-11-09 11:41:58', '2024-11-09 11:55:23', 'cash', 'cancelled', ''),
(2, 4, '2024-11-12', '2023-01-26', 'REF001', 1, 1, 10, 100.00, 'Initial Purchase', 'Terms A', 1000.00, 2, '2024-11-09 11:47:25', '2024-11-15 07:22:45', 'Cash', 'paid', ''),
(3, 5, '2024-11-14', '2024-12-31', 'REF002', 2, NULL, 20, 150.00, 'Bulk Order', 'Terms B', 3000.00, 1, '2024-11-09 11:47:25', '2024-11-14 14:18:03', 'Credit', 'paid', ''),
(4, 7, NULL, '2023-02-10', 'REF003', 7, NULL, 15, 200.00, 'Reorder', 'Terms C', 3000.00, NULL, '2024-11-09 11:47:25', '2024-11-09 11:47:25', 'Bank Transfer', 'Pending', ''),
(5, 6, NULL, '2023-02-15', 'REF004', 8, NULL, 25, 120.00, 'Seasonal Stock', 'Terms D', 3000.00, NULL, '2024-11-09 11:47:25', '2024-11-09 11:47:25', 'Cash', 'Completed', ''),
(6, 8, NULL, '2023-02-20', 'REF005', 9, NULL, 30, 130.00, 'Urgent Purchase', 'Terms E', 3900.00, NULL, '2024-11-09 11:47:25', '2024-11-09 11:47:25', 'Credit', 'Pending', ''),
(7, 9, '2023-02-19', '2023-02-19', 'REF005', 8, NULL, 30, 130.00, 'Urgent Purchase', 'Terms E', 3900.00, NULL, '2024-11-09 11:47:25', '2024-11-12 12:31:08', 'Credit', 'paid', ''),
(8, 5, '2024-11-18', '2024-11-20', 'klknlk', NULL, NULL, NULL, NULL, 'vdfv', 'vfvdfv', 500.00, 1, '2024-11-19 07:44:58', '2024-11-19 07:46:44', 'Cash', 'unpaid', '[{\"product_id\":9,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":50,\"total_amount\":500}]');

-- --------------------------------------------------------

--
-- Table structure for table `signature`
--

CREATE TABLE `signature` (
  `signature_id` int(11) NOT NULL,
  `signature_name` varchar(100) NOT NULL,
  `signature_photo` varchar(255) DEFAULT NULL,
  `status` varchar(55) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `signature`
--

INSERT INTO `signature` (`signature_id`, `signature_name`, `signature_photo`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Drashti Vaishnanai', '/uploads/signature/1731587422283-608554871.png', '', '2024-11-14 11:30:12', '2024-11-14 12:42:54'),
(2, 'krupalsinh', '/uploads/signature/1731588203384-291938190.png', '0', '2024-11-14 12:24:24', '2024-11-14 12:43:23');

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
  `selling_price` decimal(10,2) NOT NULL,
  `units` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `purchase_price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subproducts`
--

INSERT INTO `subproducts` (`subproduct_id`, `product_id`, `subproduct_name`, `subproduct_code`, `quantity`, `selling_price`, `units`, `description`, `created_at`, `updated_at`, `purchase_price`) VALUES
(1, 1, 'Sample Subproduct', 'SSP001', 190, 25.00, 'Pieces', 'This is a sample subproduct description.', '2024-11-12 08:49:46', '2024-11-15 12:22:15', 15.75),
(2, 9, 'M Size', 'TMSIZE', 80, 150.00, 'Pieces', 'na hoy la', '2024-11-12 09:25:25', '2024-11-18 13:55:53', 100.00),
(3, 9, 's tshirt', 'skusmall', 91, 100.00, 'Box', 'cdcc', '2024-11-18 08:42:25', '2024-11-18 13:55:53', 90.00);

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
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`vendor_id`, `vendor_name`, `email`, `phone_number`, `closing_balance`, `created_at`, `updated_at`) VALUES
(4, 'ABC Supplies', 'contact@abcsupplies.com', '1234567890', 100.50, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(5, 'XYZ Wholesalers', 'sales@xyzwholesalers.com', '9876543210', 200.75, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(6, 'Global Goods', 'info@globalgoods.com', '1234509876', 300.00, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(7, 'QuickMart', 'support@quickmart.com', '8765432109', 150.25, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(8, 'Prime Distributors', 'service@primedis.com', '2345678901', 275.00, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(9, 'Central Supplies', 'info@centralsupplies.com', '3456789012', 125.50, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(10, 'National Wholesale', 'contact@nationalws.com', '4567890123', 450.30, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(11, 'Direct Markets', 'support@directmarkets.com', '5678901234', 320.80, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(12, 'WorldWide Products', 'sales@worldwide.com', '6789012345', 210.45, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(13, 'SuperMart Suppliers', 'service@supermart.com', '7890123456', 180.00, '2024-11-08 09:12:13', '2024-11-08 09:12:28'),
(14, 'new testdsd', 'vp212@gmail.com', '212121212', 32323.00, '2024-11-11 13:34:34', '2024-11-11 13:34:57'),
(15, '212jjewe', 'vp43434@gmail.com', '323323233', 232323.00, '2024-11-11 13:35:14', '2024-11-11 13:35:14');

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
  ADD PRIMARY KEY (`payment_id`);

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
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `creditnoteinvoices`
--
ALTER TABLE `creditnoteinvoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `delivery_challans`
--
ALTER TABLE `delivery_challans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `expense_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `quotations`
--
ALTER TABLE `quotations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `return_debit_notes_purchases`
--
ALTER TABLE `return_debit_notes_purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `signature`
--
ALTER TABLE `signature`
  MODIFY `signature_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subproducts`
--
ALTER TABLE `subproducts`
  MODIFY `subproduct_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `vendor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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

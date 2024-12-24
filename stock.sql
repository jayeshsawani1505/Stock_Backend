-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2024 at 06:23 AM
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
(13, 'Toys', NULL, 'Childres toys', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(14, 'Sports Equipment', NULL, 'Gear and accessories for sports', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(15, 'Health & Wellness', NULL, 'Vitamins, supplements, and wellness products', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(16, 'Beauty', NULL, 'Skincare and beauty products', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(17, 'Automotive', NULL, 'Car parts and accessories', '2024-11-08 03:59:02', '2024-11-08 03:59:02'),
(18, 'booksai', '/uploads/category/1731567330409-644110513.jpg', 'sasas', '2024-11-11 13:35:57', '2024-11-14 06:55:30');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`company_id`, `company_name`) VALUES
(1, 'PEC Treding'),
(2, 'PEC Naroda'),
(3, 'PEC Nagpur'),
(4, 'PEC Nanded');

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
  `opening_balance` decimal(10,2) NOT NULL,
  `closing_balance` double(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `profile_photo`, `name`, `currency`, `email`, `website`, `phone`, `notes`, `billing_name`, `billing_address_line1`, `billing_address_line2`, `billing_country`, `billing_state`, `billing_city`, `billing_pincode`, `shipping_name`, `shipping_address_line1`, `shipping_address_line2`, `shipping_country`, `shipping_state`, `shipping_city`, `shipping_pincode`, `bank_name`, `branch`, `account_number`, `account_holder_name`, `ifsc`, `opening_balance`, `closing_balance`, `created_at`, `updated_at`) VALUES
(13, NULL, 'krupalsinh chavda', '₹', 'krupalsinh@gmail.com', 'test.com', '7600230620', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', '7441052212', 'test test test', 'test', 0.00, 0.00, '2024-11-07 07:21:26', '2024-11-07 07:37:10'),
(14, NULL, 'jayesh sawani', '£', 'jayesh@gmail.com', 'dsdsd', '323232323`', 'dsds', 'dsds', 'dsdsd', 'dsd', 'dsd', 'dsdsd', 'dsd', 'dsd', 'dsds', 'dsdsd', 'dsd', 'dsd', 'dsdsd', 'dsd', 'dsd', 'dsdsd', 'dsdsd', 'dsd', 'dsdsd', 'dsdsds', 0.00, 0.00, '2024-11-07 07:48:52', '2024-11-07 07:49:04'),
(16, NULL, 'harsh joshi', '₹', 'hasrsh@gmail.com', 'test@.com', '7600230620', 'no', 'amd', 'amd', 'amd', 'india', 'guj', 'amd', '382330', 'amd', 'amd', 'amd', 'india', 'guj', 'amd', '382330', 'sbi', 'amd', '787778878', 'amd', 'amdDDSDS78', 0.00, 0.00, '2024-11-07 13:52:03', '2024-11-07 13:52:03'),
(17, NULL, 'John Doe', '£', 'johndoe@example.com', 'http://johndoe.com', '1234567890', 'Important client', 'John Doe', '123 Maple St', 'Suite 100', 'USA', 'CA', 'Los Angeles', '90001', 'John Doe', '123 Maple St', 'Suite 100', 'USA', 'CA', 'Los Angeles', '90001', 'Bank of America', 'Downtown', '123456789', 'John Doe', 'BOFAUS3N', 0.00, 510.00, '2024-11-07 14:30:55', '2024-12-14 08:00:57'),
(18, 'photo2.png', 'Jane Smith', 'EUR', 'janesmith@example.com', 'http://janesmith.com', '0987654321', 'Requires follow-up', 'Jane Smith', '456 Oak St', 'Apt 202', 'France', 'Ile-de-France', 'Paris', '75000', 'Jane Smith', '456 Oak St', 'Apt 202', 'France', 'Ile-de-France', 'Paris', '75000', 'BNP Paribas', 'Main', '987654321', 'Jane Smith', 'BNPAFRPP', 0.00, 0.00, '2024-11-07 14:30:55', '2024-11-07 14:30:55'),
(20, 'photo4.jpg', 'Lisa White', 'USD', 'lisa@example.com', 'www.lisawhite.com', '6677889900', 'Note 4', 'Lisa White', '101 Billing Lane', 'Suite 12', 'USA', 'Texas', 'Houston', '77001', 'Lisa White', '101 Shipping Lane', 'Suite 13', 'USA', 'Texas', 'Houston', '77001', 'Wells Fargo', 'East', '4567890123456789', 'Lisa White', 'WFBIUS6S', 0.00, 0.00, '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(21, 'photo5.jpg', 'Steve Black', 'CAD', 'steve@example.com', 'www.steveblack.ca', '4455667788', 'Note 5', 'Steve Black', '202 Billing Blvd', NULL, 'Canada', 'Ontario', 'Toronto', 'M5H 2N2', 'Steve Black', '202 Shipping Blvd', NULL, 'Canada', 'Ontario', 'Toronto', 'M5H 2N2', 'RBC', 'South', '5678901234567890', 'Steve Black', 'ROYCCAT2', 0.00, 0.00, '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(22, 'photo6.jpg', 'Rachel Lee', 'JPY', 'rachel@example.jp', 'www.rachelee.jp', '5566778899', 'Note 6', 'Rachel Lee', '303 Billing Way', NULL, 'Japan', 'Tokyo', 'Tokyo', '100-0001', 'Rachel Lee', '303 Shipping Way', NULL, 'Japan', 'Tokyo', 'Tokyo', '100-0001', 'Mitsubishi UFJ', 'Central', '6789012345678901', 'Rachel Lee', 'BOTKJPJT', 0.00, 0.00, '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(23, 'photo7.jpg', 'Dave Green', 'AUD', 'dave@example.com.au', 'www.davegreen.com', '2233445566', 'Note 7', 'Dave Green', '404 Billing Pl', NULL, 'Australia', 'New South Wales', 'Sydney', '2000', 'Dave Green', '404 Shipping Pl', NULL, 'Australia', 'New South Wales', 'Sydney', '2000', 'NAB', 'West', '7890123456789012', 'Dave Green', 'NATAAU33', 2501.00, 1001.00, '2024-11-08 03:25:24', '2024-12-09 08:02:21'),
(24, 'photo8.jpg', 'Emma Blue', 'INR', 'emma@example.in', 'www.emmablue.in', '9988776655', 'Note 8', 'Emma Blue', '505 Billing Path', NULL, 'India', 'Maharashtra', 'Mumbai', '400001', 'Emma Blue', '505 Shipping Path', NULL, 'India', 'Maharashtra', 'Mumbai', '400001', 'SBI', 'Central', '8901234567890123', 'Emma Blue', 'SBININBB', 0.00, 0.00, '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(25, 'photo9.jpg', 'Max Gray', 'NZD', 'max@example.nz', 'www.maxgray.co.nz', '3344556677', 'Note 9', 'Max Gray', '606 Billing Terrace', NULL, 'New Zealand', 'Auckland', 'Auckland', '1010', 'Max Gray', '606 Shipping Terrace', NULL, 'New Zealand', 'Auckland', 'Auckland', '1010', 'ANZ', 'East', '9012345678901234', 'Max Gray', 'ANZBNZ22', 54950.00, 54500.00, '2024-11-08 03:25:24', '2024-12-09 07:33:11'),
(26, 'photo10.jpg', 'Sara Green', 'SGD', 'sara@example.sg', 'www.saragreen.sg', '7766554433', 'Note 10', 'Sara Green', '707 Billing Circle', NULL, 'Singapore', 'Central', 'Singapore', '069112', 'Sara Green', '707 Shipping Circle', NULL, 'Singapore', 'Central', 'Singapore', '069112', 'DBS', 'West', '1234567890123457', 'Sara Green', 'DBSSSGSG', 0.00, 0.00, '2024-11-08 03:25:24', '2024-11-08 03:25:24'),
(27, 'null', 'new test 12345', '₹', 'test@gmail.com', 'dsd', '2212121212', 'dsd', 'dsd', 'dsd', 'dsd', 'dsd', 'dsdsd', 'sd', '323232', 'dsd', 'dsd', 'dsd', 'dsd', 'dsdsd', 'sd', '323232', 'ewewe', 'ewewe', '323232323', 'ewewe', 'dsdw323', 0.00, 0.00, '2024-11-11 13:32:22', '2024-11-26 13:23:19'),
(28, '/uploads/customer/1731562441892-510194116.jpg', 'drashti', '₹', 'drashti@gmail.com', 'no.com', '7878784547', 'no', 'drashti', 'naroda', 'naroda', 'india', 'guj', 'amd', '382330', 'drashti', 'naroda', 'naroda', 'india', 'guj', 'amd', '382330', 'naroda', 'naroda', '21212122212', 'drashti naroda', 'naroda123', 0.00, -7500.00, '2024-11-14 05:15:09', '2024-12-09 07:53:07'),
(29, 'null', 'maikom', 'rs', 'maikon@gmail.com', 'dk.com', '788787778', 'dsd', 'AMD', 'AMD', 'AMD', 'AMD', 'AMD', 'AMD', '45445', 'AMD', 'AMD', 'AMD', 'AMD', 'AMD', 'AMD', '45445', 'AMD', 'AMD', '3232', 'AMD', 'AMDew', 0.00, 20000.00, '2024-12-09 09:56:46', '2024-12-11 11:21:50'),
(30, 'null', 'abc', 'rs', 'abc@gmail.com', 'ds.com', '212122121', 'ss', 'ds', 'ds', 'ds', 'ds', 'ds', 'ds', '32323', 'ds', 'ds', 'ds', 'ds', 'ds', 'ds', '32323', 'dsdsd', 'dsdsd', '23232323', 'dsdsds', 'fsdf12', 23340.00, 24000.00, '2024-12-11 05:58:57', '2024-12-18 12:34:39'),
(31, 'null', 'kau', 'rs', 'kau@gmail.com', 's', '54215421', 's', 'ds', 's', 'dq', 'sd', 'dscdx', 'ds', '5623', 'ds', 's', 'dq', 'sd', 'dscdx', 'ds', '5623', 'sa', 'ds', '21212', 'sa', 'csd12', 21600.00, 26500.00, '2024-12-14 10:53:19', '2024-12-21 07:55:37');

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
  `adjustmentType` varchar(255) DEFAULT NULL,
  `adjustmentValue` varchar(255) DEFAULT NULL,
  `adjustmentType2` varchar(255) DEFAULT NULL,
  `adjustmentValue2` varchar(255) DEFAULT NULL,
  `subtotal_amount` varchar(255) DEFAULT NULL,
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

INSERT INTO `delivery_challans` (`id`, `delivery_number`, `customer_id`, `delivery_date`, `due_date`, `product_id`, `subproduct_id`, `quantity`, `rate`, `notes`, `terms_conditions`, `adjustmentType`, `adjustmentValue`, `adjustmentType2`, `adjustmentValue2`, `subtotal_amount`, `total_amount`, `signature_id`, `created_at`, `updated_at`, `status`, `invoice_details`) VALUES
(1, 'DCN-001', 28, '2024-11-14', '2024-11-19', 9, 2, 3323, 3232.00, 'esdsd', 'dsdsd', NULL, NULL, NULL, NULL, NULL, 32323.00, 2, '2024-11-16 10:44:18', '2024-11-16 10:58:58', 'unpaid', ''),
(2, 'DCN-002', 13, '2024-11-16', '2024-11-17', 1, 1, 12, 12.00, 'dsdsd', 'dsd', NULL, NULL, NULL, NULL, NULL, 540.00, 2, '2024-11-16 10:56:20', '2024-11-19 08:47:18', 'paid', '[{\"product_id\":10,\"subproduct_id\":null,\"quantity\":4,\"unit\":\"box\",\"rate\":110,\"total_amount\":440},{\"product_id\":7,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100}]'),
(3, 'DCN-003', 28, '2024-11-19', '2024-11-13', NULL, 0, NULL, NULL, 'bo9,o', 'huoo', NULL, NULL, NULL, NULL, NULL, 200.00, 1, '2024-11-19 08:46:50', '2024-11-19 08:46:50', 'unpaid', '[{\"product_id\":10,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100},{\"product_id\":7,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100}]'),
(4, 'DCN-004', 28, '2024-11-26', '2024-11-28', NULL, 0, NULL, NULL, 'll', 'll', NULL, NULL, NULL, NULL, NULL, 100.00, 2, '2024-11-27 12:01:47', '2024-11-27 12:01:47', 'unpaid', '[{\"category_id\":8,\"product_id\":11,\"quantity\":10,\"unit\":\"cartoon\",\"rate\":10,\"total_amount\":100}]'),
(5, 'DCN-005', 31, '2024-12-15', '2024-12-15', NULL, 0, NULL, NULL, '', '', 'sa', '540', 'ta', '250', '27500', 28290.00, 2, '2024-12-18 10:21:51', '2024-12-23 09:39:51', 'unpaid', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":10,\"unit\":\"piece\",\"rate\":250,\"discount\":0,\"subtotal_amount\":2500},{\"category_name\":\"Clothing\",\"product_name\":\"T-Shirt\",\"quantity\":10,\"unit\":\"piece\",\"rate\":2500,\"discount\":0,\"subtotal_amount\":25000}]');

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
  `transporter_name` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `recurring` tinyint(1) DEFAULT 0,
  `recurring_cycle` varchar(55) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `subproduct_id` int(10) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `terms_conditions` text DEFAULT NULL,
  `adjustmentType` varchar(255) DEFAULT NULL,
  `adjustmentValue` varchar(255) DEFAULT NULL,
  `adjustmentType2` varchar(255) NOT NULL,
  `adjustmentValue2` varchar(255) NOT NULL,
  `subtotal_amount` varchar(255) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_id` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `invoice_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`invoice_details`)),
  `opening_balance` varchar(255) DEFAULT NULL,
  `closing_balance` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_number`, `customer_id`, `invoice_date`, `due_date`, `transporter_name`, `status`, `recurring`, `recurring_cycle`, `category_id`, `product_id`, `subproduct_id`, `quantity`, `unit`, `rate`, `bank_id`, `notes`, `terms_conditions`, `adjustmentType`, `adjustmentValue`, `adjustmentType2`, `adjustmentValue2`, `subtotal_amount`, `total_amount`, `signature_id`, `created_at`, `updated_at`, `invoice_details`, `opening_balance`, `closing_balance`) VALUES
(1, 'INV-001', 14, '2024-10-26', '2024-11-26', 'REF-001', 'paid', NULL, '0', 0, 1, NULL, 11, NULL, 25.00, NULL, 'Thank you for your business.', 'Payment is due within 30 days.', NULL, NULL, '', '', NULL, 150.00, NULL, '2024-11-07 10:42:53', '2024-11-07 14:19:47', NULL, NULL, NULL),
(8, 'INV-002', 14, '2024-11-06', '2024-11-10', 'REF002', 'unpaid', NULL, '0', 0, 1, 1, 10, NULL, 150.00, NULL, 'teser', 'Custom Terms', NULL, NULL, '', '', NULL, 1500.00, 2, '2024-11-08 06:25:39', '2024-11-15 12:23:41', NULL, NULL, NULL),
(9, 'INV003', 14, NULL, NULL, 'REF003', 'unpaid', NULL, '0', 0, 2, NULL, 3, NULL, 100.00, NULL, '-', 'Standard Terms', NULL, NULL, '', '', NULL, 300.00, NULL, '2024-11-08 06:25:39', '2024-11-09 12:07:30', NULL, NULL, NULL),
(10, 'INV004', 16, NULL, NULL, 'REF004', 'partially_paid', NULL, '0', 0, 2, NULL, 7, NULL, 250.00, NULL, '-', 'Custom Terms', NULL, NULL, '', '', NULL, 1750.00, NULL, '2024-11-08 06:25:39', '2024-11-09 12:07:35', NULL, NULL, NULL),
(11, 'INV-005', 17, '1970-01-01', '1970-01-01', 'REF005', 'cancelled', NULL, '0', 0, 7, NULL, 8, NULL, 180.00, NULL, '-', 'Standard Terms', NULL, NULL, '', '', NULL, 1440.00, NULL, '2024-11-08 06:25:39', '2024-11-15 12:25:25', NULL, NULL, NULL),
(12, 'INV006', 18, NULL, NULL, 'REF006', 'draft', NULL, '0', 0, 8, NULL, 12, NULL, 120.00, NULL, '-', 'Custom Terms', NULL, NULL, '', '', NULL, 1440.00, NULL, '2024-11-08 06:25:39', '2024-11-09 12:15:17', NULL, NULL, NULL),
(13, 'INV007', 18, NULL, NULL, 'REF007', 'refunded', NULL, '0', 0, 7, NULL, 9, NULL, 220.00, NULL, '-', 'Standard Terms', NULL, NULL, '', '', NULL, 1980.00, NULL, '2024-11-08 06:25:39', '2024-11-14 11:03:41', NULL, NULL, NULL),
(14, 'INV008', 20, NULL, NULL, 'REF008', 'unpaid', NULL, '0', 0, 8, NULL, 6, NULL, 170.00, NULL, '-', 'Custom Terms', NULL, NULL, '', '', NULL, 1020.00, NULL, '2024-11-08 06:25:39', '2024-11-09 12:15:25', NULL, NULL, NULL),
(15, 'INV009', 21, NULL, NULL, 'REF009', 'paid', NULL, '0', 0, 9, NULL, 4, NULL, 200.00, NULL, '-', 'Standard Terms', NULL, NULL, '', '', NULL, 800.00, NULL, '2024-11-08 06:25:39', '2024-11-09 12:15:34', NULL, NULL, NULL),
(16, 'INV010', 22, '1970-01-01', '1970-01-01', 'REF010', 'overdue', NULL, '0', 0, 1, NULL, 11, NULL, 130.00, NULL, '-fdfdf', 'Custom Terms', NULL, NULL, '', '', NULL, 3322.00, NULL, '2024-11-08 06:25:39', '2024-11-12 08:06:14', NULL, NULL, NULL),
(17, 'INV0011', 13, NULL, NULL, 'REF001', 'paid', NULL, '0', 0, 9, NULL, 5, NULL, 200.00, NULL, '-', 'Standard Terms', NULL, NULL, '', '', NULL, 1000.00, NULL, '2024-11-08 06:25:39', '2024-12-04 07:36:04', NULL, NULL, NULL),
(19, 'INV-018', 28, '2024-11-15', '2024-11-19', 'hhh', 'unpaid', NULL, '02', 0, NULL, NULL, NULL, NULL, NULL, NULL, 'jhhj', 'jhhgh', NULL, NULL, '', '', NULL, 8000.00, 2, '2024-11-18 11:59:41', '2024-11-18 13:52:33', '[{\"product_id\":8,\"subproduct_id\":null,\"quantity\":20,\"unit\":\"box\",\"rate\":400,\"total_amount\":8000}]', NULL, NULL),
(20, 'INV-020', 13, '2024-11-19', '2024-11-22', 'rere', 'unpaid', NULL, 'june', 0, NULL, NULL, NULL, NULL, NULL, NULL, 'dfd', 'fdfdf', NULL, NULL, '', '', NULL, 2000.00, 1, '2024-11-18 13:55:53', '2024-11-18 13:55:53', '[{\"subproduct_id\":3,\"product_id\":9,\"quantity\":20,\"unit\":\"box\",\"rate\":100,\"total_amount\":2000},{\"subproduct_id\":2,\"product_id\":9,\"quantity\":20,\"unit\":\"box\",\"rate\":100,\"total_amount\":2000}]', NULL, NULL),
(21, 'INV-021', 14, '2024-11-16', '2024-11-17', 'dsd', 'paid', NULL, 'dsd', 0, NULL, NULL, NULL, NULL, NULL, NULL, 'fdfdf', 'fdfdf', NULL, NULL, '', '', NULL, 800.00, 2, '2024-11-18 14:45:36', '2024-11-19 05:18:13', '[{\"product_id\":8,\"subproduct_id\":null,\"quantity\":4,\"unit\":\"box\",\"rate\":200,\"total_amount\":800},{\"product_id\":9,\"subproduct_id\":null,\"quantity\":4,\"unit\":\"box\",\"rate\":100,\"total_amount\":400}]', NULL, NULL),
(22, 'INV-022', 27, '2024-11-20', '2024-11-21', 'test', 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'klk', 'lkl', NULL, NULL, '', '', NULL, 0.00, 2, '2024-11-21 15:47:48', '2024-11-21 15:47:48', '[{\"product_id\":8,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":100,\"total_amount\":1000}]', NULL, NULL),
(23, 'INV-023', 20, '2024-11-22', '2024-11-24', NULL, 'unpaid', 0, NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, 'dsds', 'dsd', NULL, NULL, '', '', NULL, 200.00, 2, '2024-11-23 08:32:10', '2024-11-23 08:32:10', '[{\"product_id\":11,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100},{\"product_id\":7,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"total_amount\":100}]', NULL, NULL),
(24, 'INV-024', 28, '2024-11-27', '2024-11-27', NULL, 'partially_paid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'cxcx', 'cxcx', NULL, NULL, '', '', NULL, 2100.00, 2, '2024-11-27 09:29:52', '2024-11-27 09:29:52', '[{\"category_id\":10,\"product_id\":8,\"quantity\":10,\"unit\":\"piece\",\"rate\":10},{\"category_id\":8,\"product_id\":9,\"quantity\":10,\"unit\":\"piece\",\"rate\":100},{\"category_id\":11,\"product_id\":10,\"quantity\":100,\"unit\":\"piece\",\"rate\":10}]', NULL, NULL),
(25, 'INV-025', 20, '2024-11-12', '2024-11-29', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'dfdff', 'fdf', NULL, NULL, '', '', NULL, 600.00, 2, '2024-11-28 08:06:28', '2024-11-28 08:06:28', '[{\"category_id\":8,\"product_id\":11,\"quantity\":10,\"unit\":\"cartoon\",\"rate\":10,\"total_amount\":100},{\"category_id\":10,\"product_id\":9,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"total_amount\":100},{\"category_id\":9,\"product_id\":8,\"quantity\":20,\"unit\":\"box\",\"rate\":10,\"total_amount\":200},{\"category_id\":8,\"product_id\":7,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"total_amount\":100},{\"category_id\":9,\"product_id\":10,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"total_amount\":100}]', NULL, NULL),
(27, 'INV-026', 13, '2024-11-27', '2024-11-29', NULL, 'refunded', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'dsddsd', 'dsdsd', NULL, NULL, '', '', NULL, 500.00, 2, '2024-11-28 13:39:36', '2024-11-28 13:46:56', '[{\"category_id\":8,\"product_id\":11,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100},{\"category_id\":10,\"product_id\":9,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"total_amount\":100},{\"category_id\":8,\"product_id\":7,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"total_amount\":100},{\"category_id\":9,\"product_id\":10,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"total_amount\":100},{\"category_id\":9,\"product_id\":8,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"total_amount\":100}]', NULL, NULL),
(28, 'INV-028', 20, '2024-11-28', '2024-11-29', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'ds', 'dsdd', 'add', '10', '', '', '10100', 10110.00, 2, '2024-11-29 12:02:18', '2024-11-29 12:02:18', '[{\"category_id\":8,\"product_id\":11,\"quantity\":100,\"unit\":\"piece\",\"rate\":100,\"subtotal_amount\":10000},{\"category_id\":10,\"product_id\":9,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"subtotal_amount\":100},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0}]', NULL, NULL),
(29, 'INV-028', 20, '2024-11-28', '2024-11-29', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'ds', 'dsdd', 'add', '10', '', '', '10100', 10110.00, 2, '2024-11-29 12:03:23', '2024-11-29 12:03:23', '[{\"category_id\":8,\"product_id\":11,\"quantity\":100,\"unit\":\"piece\",\"rate\":100,\"subtotal_amount\":10000},{\"category_id\":10,\"product_id\":9,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"subtotal_amount\":100},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0}]', NULL, NULL),
(30, 'INV-030', 20, '2024-11-28', '2024-11-28', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'kkii', 'rere', 'add', '11', '', '', '1000', 1011.00, 2, '2024-11-29 12:17:08', '2024-11-29 12:17:08', '[{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":null,\"product_id\":null,\"quantity\":10,\"unit\":\"piece\",\"rate\":100,\"subtotal_amount\":1000}]', NULL, NULL),
(31, 'INV-030', 20, '2024-11-28', '2024-11-28', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'kkii', 'rere', 'add', '11', '', '', '1000', 1011.00, 2, '2024-11-29 12:17:57', '2024-11-29 12:17:57', '[{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":null,\"product_id\":null,\"quantity\":0,\"unit\":\"piece\",\"rate\":0,\"subtotal_amount\":0},{\"category_id\":8,\"product_id\":11,\"quantity\":10,\"unit\":\"piece\",\"rate\":100,\"subtotal_amount\":1000}]', NULL, NULL),
(33, 'INV-032', 28, '2024-11-28', '2024-11-29', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'ds', 'dsd', 'add', '1', '', '', '10', 11.00, 1, '2024-11-29 12:40:47', '2024-11-29 12:40:47', '[{\"category_id\":9,\"product_id\":8,\"quantity\":1,\"unit\":\"piece\",\"rate\":10,\"subtotal_amount\":10}]', NULL, NULL),
(34, 'INV-034', 28, '2024-11-28', '2024-11-29', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'dd', 'dsd', 'add', '10', '', '', '10', 20.00, 0, '2024-11-30 05:35:28', '2024-11-30 05:35:28', '[{\"category_id\":6,\"product_id\":1,\"quantity\":1,\"unit\":\"piece\",\"rate\":10,\"subtotal_amount\":10}]', NULL, NULL),
(35, 'INV-035', 20, '2024-11-29', '2024-12-01', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'dsddsd', 'dsdsd', 'add', '1', '', '', '200', 201.00, 2, '2024-11-30 06:30:32', '2024-11-30 06:30:32', '[{\"category_name\":\"Clothing\",\"product_name\":\"T-Shirt\",\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"subtotal_amount\":100},{\"category_name\":\"Furniture\",\"product_name\":\"Chair\",\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"subtotal_amount\":100}]', NULL, NULL),
(36, 'INV-036', 21, '2024-12-03', '2024-12-04', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'd', 'd', 'add', '1', '', '', '90', 91.00, 2, '2024-12-04 09:37:55', '2024-12-04 09:37:55', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":1,\"unit\":\"piece\",\"rate\":100,\"discount\":10,\"subtotal_amount\":90}]', NULL, NULL),
(37, 'INV-037', 25, '2024-12-04', '2024-12-04', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'ds', 'dsd', 'add', '500', '', '', '4950', 5450.00, 2, '2024-12-05 09:32:07', '2024-12-05 09:32:07', '[{\"category_name\":\"Furniture\",\"product_name\":\"Chair\",\"quantity\":1,\"unit\":\"piece\",\"rate\":5000,\"discount\":1,\"subtotal_amount\":4950}]', NULL, NULL),
(38, 'INV-038', 25, '2024-12-05', '2024-12-08', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'dsd', 'dsd', 'subtract', '500', '', '', '50000', 49500.00, 2, '2024-12-05 09:33:26', '2024-12-05 09:33:26', '[{\"category_name\":\"Electronics\",\"product_name\":\"Laptop\",\"quantity\":1,\"unit\":\"piece\",\"rate\":50000,\"discount\":0,\"subtotal_amount\":50000}]', NULL, NULL),
(39, 'INV-039', 23, '2024-12-08', '2024-12-10', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'ds', 'cx', 'add', '1', '', '', '2500', 2501.00, 1, '2024-12-09 08:01:01', '2024-12-09 08:01:01', '[{\"category_name\":\"sample category\",\"product_name\":\"Sample Product\",\"quantity\":1,\"unit\":\"piece\",\"rate\":2500,\"discount\":0,\"subtotal_amount\":2500}]', NULL, NULL),
(40, 'INV-040', 29, '2024-12-08', '2024-12-09', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 's', 's', 'add', '200', '', '', '9900', 10100.00, 2, '2024-12-09 10:06:34', '2024-12-09 10:06:34', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":1,\"unit\":\"box\",\"rate\":10000,\"discount\":1,\"subtotal_amount\":9900}]', NULL, NULL),
(41, 'INV-041', 29, '2024-12-09', '2024-12-10', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'd', 'ds', 'gst', '30', 'ta', '20', '100', 150.00, 2, '2024-12-09 12:07:01', '2024-12-09 12:07:01', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"discount\":0,\"subtotal_amount\":100}]', NULL, NULL),
(42, 'INV-042', 30, '2024-12-10', '2024-12-11', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'dsd', 'dsd', 'GST', '2500', 'TA', '2500', '10000', 15000.00, 2, '2024-12-11 06:02:43', '2024-12-11 06:02:43', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":1,\"unit\":\"piece\",\"rate\":20000,\"discount\":50,\"subtotal_amount\":10000}]', NULL, NULL),
(43, 'INV-043', 30, '2024-12-11', '2024-12-11', NULL, 'partially_paid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'tsd', 'reerw', 'GST', '1500', 'Ta', '1000', '7500', 10000.00, 2, '2024-12-11 06:08:07', '2024-12-11 06:08:07', '[{\"category_name\":\"Furniture\",\"product_name\":\"Chair\",\"quantity\":5,\"unit\":\"piece\",\"rate\":1500,\"discount\":0,\"subtotal_amount\":7500}]', NULL, NULL),
(44, 'INV-044', 30, '2024-12-11', '2024-12-19', NULL, 'partially_paid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'dsd', 'ds', 'GST', '1500', 'TA', '400', '8100', 10000.00, 2, '2024-12-11 06:09:57', '2024-12-11 06:09:57', '[{\"category_name\":\"Clothing\",\"product_name\":\"T-Shirt\",\"quantity\":2,\"unit\":\"piece\",\"rate\":4500,\"discount\":10,\"subtotal_amount\":8100}]', NULL, NULL),
(45, 'INV-045', 30, '2024-12-10', '2024-12-17', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'ds', 'ds', '', '0', '', '0', '40500', 40500.00, 2, '2024-12-11 06:14:29', '2024-12-11 06:14:29', '[{\"category_name\":\"Electronics\",\"product_name\":\"Laptop\",\"quantity\":1,\"unit\":\"piece\",\"rate\":45000,\"discount\":10,\"subtotal_amount\":40500}]', NULL, NULL),
(46, 'INV-046', 30, '2024-12-17', '2024-12-18', NULL, 'partially_paid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'dsd', 'sas', 'GST', '320', 'TA', '180', '1500', 2000.00, 2, '2024-12-11 10:35:41', '2024-12-11 10:35:41', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":1,\"unit\":\"piece\",\"rate\":1500,\"discount\":0,\"subtotal_amount\":1500}]', NULL, NULL),
(47, 'INV-047', 29, '2024-12-10', '2024-12-15', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'dsd', 'dsd', 'GST', '2500', 'Ta', '1300', '16200', 20000.00, 1, '2024-12-11 11:21:50', '2024-12-11 11:21:50', '[{\"category_name\":\"Furniture\",\"product_name\":\"Chair\",\"quantity\":4,\"unit\":\"piece\",\"rate\":4500,\"discount\":10,\"subtotal_amount\":16200}]', NULL, NULL),
(48, 'INV-048', 17, '2024-12-13', '2024-12-13', NULL, 'partially_paid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'hchja', 'jdjs', 'GST', '5', 'GS', '10', '495', 510.00, 2, '2024-12-14 08:00:57', '2024-12-14 08:00:57', '[{\"category_name\":\"booksai\",\"product_name\":\"50.00 MFD 45X120 PP MOTOR RUN-440V\\t\",\"quantity\":2,\"unit\":\"piece\",\"rate\":250,\"discount\":1,\"subtotal_amount\":495}]', NULL, NULL),
(49, 'INV-049', 31, '2024-12-14', '2024-12-16', NULL, 'partially_paid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'sdd', 'SDD', 'GST', '550', 'ta', '450', '9000', 10000.00, 2, '2024-12-14 10:57:21', '2024-12-14 10:57:21', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":1,\"unit\":\"piece\",\"rate\":10000,\"discount\":10,\"subtotal_amount\":9000}]', NULL, NULL),
(50, 'INV-050', 31, '2024-12-10', '2024-12-17', NULL, 'partially_paid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'hello', 'vjifjurhgiu', 'gst', '250', 'ta', '250', '4500', 5000.00, 2, '2024-12-14 12:00:06', '2024-12-14 12:00:06', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":1,\"unit\":\"piece\",\"rate\":5000,\"discount\":10,\"subtotal_amount\":4500}]', '10000', '15000'),
(51, 'INV-051', 31, '2024-12-13', '2024-12-13', NULL, 'partially_paid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'sa', 'sa', 'gst', '250', 'tA', '1550', '4500', 6300.00, 2, '2024-12-14 12:11:49', '2024-12-14 12:11:49', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":1,\"unit\":\"piece\",\"rate\":4500,\"discount\":0,\"subtotal_amount\":4500}]', '15000', '21300'),
(52, 'INV-052', 31, '2024-12-16', '2024-12-17', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'ds', 'ds', 'GST', '25', 'ta', '30', '245', 300.00, 2, '2024-12-17 08:52:56', '2024-12-17 08:52:56', '[{\"category_name\":\"Clothing\",\"product_name\":\"T-Shirt\",\"quantity\":1,\"unit\":\"piece\",\"rate\":250,\"discount\":2,\"subtotal_amount\":245}]', '21300', '21600'),
(53, 'INV-053', 30, '2024-12-16', '2024-12-16', NULL, 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'sds', 'ds', 'gst', '125', 'ta', '25', '350', 500.00, 2, '2024-12-17 08:58:42', '2024-12-17 08:58:42', '[{\"category_name\":\"Clothing\",\"product_name\":\"T-Shirt\",\"quantity\":1,\"unit\":\"piece\",\"rate\":350,\"discount\":0,\"subtotal_amount\":350}]', '43000', '43500'),
(54, 'INV-054', 30, '2024-12-17', '2024-12-16', 'HANDLOP', 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'dsDS', 'ds', 'ta', '150', 'gst', '10', '500', 660.00, 2, '2024-12-17 09:07:11', '2024-12-17 09:07:11', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":2,\"unit\":\"piece\",\"rate\":250,\"discount\":0,\"subtotal_amount\":500}]', '43500', '44160'),
(55, 'INV-055', 31, '2024-12-20', '2024-12-20', 'xyz', 'unpaid', 0, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, '', '', 'GST', '250', 'Ta', '150', '4500', 4900.00, 2, '2024-12-21 07:55:37', '2024-12-21 07:55:37', '[{\"category_name\":\"booksai\",\"product_name\":\"50.00 MFD 45X120 PP MOTOR RUN-440V\\t\",\"quantity\":5,\"unit\":\"piece\",\"rate\":1000,\"discount\":10,\"subtotal_amount\":4500}]', '21600', '26500');

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
  `customer_id` int(11) NOT NULL,
  `receiveAmount` decimal(10,2) NOT NULL,
  `pendingAmount` decimal(10,2) NOT NULL,
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

INSERT INTO `payments` (`payment_id`, `customer_id`, `receiveAmount`, `pendingAmount`, `payment_mode`, `payment_date`, `payment_status`, `description`, `created_at`, `updated_at`) VALUES
(17, 30, 15000.00, 40000.00, 'credit_card', '2024-12-18', 'partially_paid', 'haji ketli var', '2024-12-11 06:13:14', '2024-12-11 06:13:14'),
(20, 30, 4000.00, 78500.00, 'cash', '2024-12-16', 'partially_paid', 'sas', '2024-12-11 10:52:50', '2024-12-11 10:52:50'),
(21, 30, 35500.00, 43000.00, 'debit_card', '2024-12-15', 'partially_paid', 'sasa', '2024-12-11 10:58:27', '2024-12-11 10:58:27'),
(22, 31, 15000.00, 10000.00, 'cash', '2024-12-14', 'partially_paid', 'd', '2024-12-14 11:03:11', '2024-12-14 11:03:11'),
(23, 30, 20160.00, 24000.00, 'debit_card', '2024-12-26', 'partially_paid', 'sa', '2024-12-18 12:34:39', '2024-12-18 12:34:39');

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
(1, 'Product', 'Sample Product', 'SP001', 6, 118, 25.50, 20.00, 'Box', 10, NULL, NULL, NULL, 'This is a sample product description.', NULL, '2024-11-07 09:46:47', '2024-12-14 12:23:57'),
(2, 'Product', 'ewewe1212', 'ewewe', 1, 64, 22.00, 22.00, 'Pieces', 22, NULL, NULL, NULL, 'edsdsd', NULL, '2024-11-07 10:26:14', '2024-12-21 07:17:08'),
(7, '', 'Laptop', 'LAP123', 8, 80, 50000.00, 45000.00, 'pcs', 10, NULL, NULL, NULL, 'High-end laptop', NULL, '2024-11-08 04:37:46', '2024-12-11 06:14:29'),
(8, '', 'Chair', 'CHR456', 9, 40, 1500.00, 1200.00, 'pcs', 20, NULL, NULL, NULL, 'Ergonomic chair', NULL, '2024-11-08 04:37:46', '2024-12-11 11:21:50'),
(9, '', 'T-Shirt', 'TSH789', 10, 429, 300.00, 200.00, 'pcs', 50, NULL, NULL, NULL, 'Cotton T-shirt', NULL, '2024-11-08 04:37:46', '2024-12-17 08:58:42'),
(10, 'Product', 'newe', 'sa2q', 9, 52, 1212.00, 122.00, 'Box', 122, NULL, NULL, NULL, 'dsdsd', '/uploads/product/1731573684314-267880745.png', '2024-11-11 13:35:42', '2024-12-11 06:40:17'),
(11, 'Product', 'home speacker', 'homeKU', 8, 96, 500.00, 250.00, 'piece', 10, NULL, NULL, NULL, 'na', '', '2024-11-19 10:16:33', '2024-12-23 10:09:17'),
(12, 'Product', '50.00 MFD 45X120 PP MOTOR RUN-440V	', '50.00 MFD 45X120 PP MOTOR RUN-440V	', 18, 86, 2000.00, 2000.00, 'box', 10, NULL, NULL, NULL, 'ds', '', '2024-12-14 07:57:10', '2024-12-23 09:57:08'),
(13, 'Product', 'testing', 'tesing', 12, 10, 10.00, 10.00, 'piece', 10, NULL, NULL, NULL, 'ds', '', '2024-12-18 11:55:28', '2024-12-18 11:55:28');

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
  `adjustmentType` varchar(255) NOT NULL,
  `adjustmentValue` varchar(255) NOT NULL,
  `adjustmentType2` varchar(255) NOT NULL,
  `adjustmentValue2` varchar(255) NOT NULL,
  `subtotal_amount` varchar(255) NOT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_id` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `payment_mode` varchar(55) DEFAULT NULL,
  `status` varchar(55) DEFAULT NULL,
  `invoice_details` longtext NOT NULL,
  `opening_balance` varchar(255) DEFAULT NULL,
  `closing_balance` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `vendor_id`, `purchase_date`, `due_date`, `reference_no`, `supplier_invoice_serial_no`, `product_id`, `subproduct_id`, `quantity`, `unit`, `rate`, `notes`, `terms_conditions`, `adjustmentType`, `adjustmentValue`, `adjustmentType2`, `adjustmentValue2`, `subtotal_amount`, `total_amount`, `signature_id`, `created_at`, `updated_at`, `payment_mode`, `status`, `invoice_details`, `opening_balance`, `closing_balance`) VALUES
(2, 4, '0000-00-00', '0000-00-00', 'fdfdfdf', 'dsdsd', 1, NULL, 10, NULL, 10.00, 'DSDSDSDSD', 'DDSSDSD', '', '', '', '', '', 100.00, NULL, '2024-11-09 09:44:52', '2024-11-09 10:02:37', 'cash', 'unpaid', '', NULL, NULL),
(5, 4, '2023-01-01', '2023-02-01', 'REF001', 'S001', 1, NULL, 10, NULL, 100.00, 'Initial Purchase', 'Terms A', '', '', '', '', '', 1000.00, NULL, '2024-11-09 10:14:32', '2024-11-09 10:14:32', 'Cash', 'Pending', '', NULL, NULL),
(6, 5, '2023-01-05', '2023-02-05', 'REF002', 'S002', 2, NULL, 20, NULL, 150.00, 'Bulk Order', 'Terms B', '', '', '', '', '', 3000.00, NULL, '2024-11-09 10:14:32', '2024-11-09 10:14:32', 'Credit', 'Completed', '', NULL, NULL),
(7, 7, '2023-01-10', '2023-02-10', 'REF003', 'S003', 7, NULL, 15, NULL, 200.00, 'Reorder', 'Terms C', '', '', '', '', '', 3000.00, NULL, '2024-11-09 10:14:32', '2024-11-09 10:14:32', 'Bank Transfer', 'Pending', '', NULL, NULL),
(8, 6, '2023-01-15', '2023-02-15', 'REF004', 'S004', 8, NULL, 25, NULL, 120.00, 'Seasonal Stock', 'Terms D', '', '', '', '', '', 3000.00, NULL, '2024-11-09 10:14:32', '2024-11-09 10:14:32', 'Cash', 'Completed', '', NULL, NULL),
(9, 8, '2023-01-19', '2023-02-19', 'REF005', 'S005', 9, NULL, 30, NULL, 130.00, 'Urgent Purchase', 'Terms E', '', '', '', '', '', 3900.00, NULL, '2024-11-09 10:14:32', '2024-11-09 10:16:47', 'Credit', 'paid', '', NULL, NULL),
(10, 9, '2023-01-19', '2023-02-19', 'REF005', 'S006', 8, NULL, 30, NULL, 130.00, 'Urgent Purchase', 'Terms E', '', '', '', '', '', 3900.00, 2, '2024-11-09 10:19:47', '2024-11-14 14:10:17', 'Credit', 'unpaid', '', NULL, NULL),
(11, 15, '0000-00-00', '0000-00-00', '21', '12', 10, NULL, 122, NULL, 212.00, 'dsd', 'sdsd', '', '', '', '', '', 1222.00, NULL, '2024-11-11 13:47:25', '2024-11-11 13:47:25', 'cash', 'paid', '', NULL, NULL),
(12, 14, '0000-00-00', '0000-00-00', 'asas', 'asa', 7, NULL, 212, NULL, 212.00, 'sdsd', 'dsdd', '', '', '', '', '', 212.00, NULL, '2024-11-11 13:48:39', '2024-11-11 13:48:39', 'cash', 'partially_paid', '', NULL, NULL),
(13, 15, '2024-11-12', '2024-11-13', 'sd', 'sdd', 9, 2, 21, NULL, 212.00, 'dds', 'sd', '', '', '', '', '', 212.00, 2, '2024-11-11 13:49:08', '2024-11-15 06:26:22', 'cash', 'paid', '', NULL, NULL),
(14, 5, '2024-11-17', '2024-11-19', 'jkjkk', 'kjjj', NULL, NULL, NULL, NULL, NULL, 'yuhgvh', 'jbhjb;', '', '', '', '', '', 2000.00, 2, '2024-11-19 07:24:37', '2024-11-19 10:23:52', 'credit_card', 'paid', '[{\"product_id\":7,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":100,\"total_amount\":1000},{\"product_id\":8,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":100,\"total_amount\":1000}]', NULL, NULL),
(15, 13, '2024-11-13', '2024-11-27', '00', '32', NULL, NULL, NULL, NULL, NULL, 'fdff', 'fdf', '', '', '', '', '', 150.00, 2, '2024-11-27 10:57:03', '2024-11-27 10:57:03', 'credit_card', 'unpaid', '[{\"category_id\":8,\"product_id\":10,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"total_amount\":100},{\"category_id\":9,\"product_id\":10,\"quantity\":10,\"unit\":\"piece\",\"rate\":5,\"total_amount\":50}]', NULL, NULL),
(16, 5, '2024-12-03', '2024-12-04', '00', 'dsd', NULL, NULL, NULL, NULL, NULL, 'dsdsddsd', 'dsdsdsd', 'add', '10', '', '', '100', 110.00, 2, '2024-12-04 06:34:12', '2024-12-04 06:34:12', 'paypal', 'partially_paid', '[{\"category_name\":\"Clothing\",\"product_name\":\"T-Shirt\",\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"subtotal_amount\":100}]', NULL, NULL),
(17, 8, '2024-12-05', '2024-12-04', '00', '323', NULL, NULL, NULL, NULL, NULL, 'fdf', 'rerer', 'add', '10', '', '', '400', 410.00, 2, '2024-12-04 06:46:08', '2024-12-04 07:52:14', 'credit_card', 'overdue', '[{\"category_name\":\"Furniture\",\"product_name\":\"newe\",\"quantity\":20,\"unit\":\"piece\",\"rate\":20,\"subtotal_amount\":400}]', NULL, NULL),
(18, 16, '2024-12-10', '2024-12-11', '00', '3232', NULL, NULL, NULL, NULL, NULL, 'dsddsd', 'dsds', 'GST', '300', 'Ta', '200', '9500', 10000.00, 2, '2024-12-11 06:35:59', '2024-12-11 06:35:59', 'credit_card', 'unpaid', '[{\"category_name\":\"Electronics product\",\"product_name\":\"ewewe1212\",\"quantity\":10,\"unit\":\"piece\",\"rate\":950,\"subtotal_amount\":9500}]', NULL, NULL),
(19, 16, '2024-12-11', '2024-12-11', '00', '3232', NULL, NULL, NULL, NULL, NULL, 'dsd', 'dsdsd', 'GST', '150', 'Ta', '100', '4250', 4500.00, 2, '2024-12-11 06:37:24', '2024-12-11 06:37:24', 'upi', 'partially_paid', '[{\"category_name\":\"Furniture\",\"product_name\":\"Chair\",\"quantity\":5,\"unit\":\"box\",\"rate\":850,\"subtotal_amount\":4250}]', NULL, NULL),
(20, 16, '2024-12-11', '2024-12-11', '00', '4343', NULL, NULL, NULL, NULL, NULL, 'dsdd', 'dsdsd', 'GST', '350', 'TA', '150', '5000', 5500.00, 2, '2024-12-11 06:38:59', '2024-12-11 06:38:59', 'cash', 'partially_paid', '[{\"category_name\":\"Clothing\",\"product_name\":\"T-Shirt\",\"quantity\":10,\"unit\":\"piece\",\"rate\":500,\"subtotal_amount\":5000}]', NULL, NULL),
(21, 16, '2024-12-15', '2024-12-11', '00', '656`', NULL, NULL, NULL, NULL, NULL, 'ds', 'dsd', 'GST', '1500', 'Ta', '500', '15000', 17000.00, 2, '2024-12-11 06:40:17', '2024-12-11 06:40:17', 'upi', 'unpaid', '[{\"category_name\":\"Furniture\",\"product_name\":\"newe\",\"quantity\":10,\"unit\":\"piece\",\"rate\":1500,\"subtotal_amount\":15000}]', NULL, NULL),
(22, 16, '2024-12-12', '2024-12-11', '00', '89434', NULL, NULL, NULL, NULL, NULL, 'dsdsd', 'dsdsd', 'Gst', '80', 'Ta', '70', '850', 1000.00, 2, '2024-12-11 07:52:40', '2024-12-11 07:52:40', 'credit_card', 'unpaid', '[{\"category_name\":\"Clothing\",\"product_name\":\"T-Shirt\",\"quantity\":1,\"unit\":\"piece\",\"rate\":850,\"subtotal_amount\":850}]', NULL, NULL),
(24, 11, '2024-12-10', '2024-12-11', '00', '434', NULL, NULL, NULL, NULL, NULL, 'bjjn', 'mkmm', 'GST', '750', 'TA', '250', '9000', 10000.00, 2, '2024-12-11 12:33:57', '2024-12-11 12:33:57', 'credit_card', 'partially_paid', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":10,\"unit\":\"piece\",\"rate\":900,\"subtotal_amount\":9000}]', NULL, NULL),
(25, 17, '2024-12-17', '2024-12-11', '00', '342334', NULL, NULL, NULL, NULL, NULL, 'dssddsd', 'dsdsd', 'GST', '1800', 'sasas', '150', '1800', 3750.00, 2, '2024-12-11 12:43:05', '2024-12-11 12:43:05', 'debit_card', 'partially_paid', '[{\"category_name\":\"Electronics product\",\"product_name\":\"ewewe1212\",\"quantity\":12,\"unit\":\"piece\",\"rate\":150,\"subtotal_amount\":1800}]', NULL, NULL),
(26, 17, '2024-12-21', '2024-12-11', '00', '3232', NULL, NULL, NULL, NULL, NULL, 'dsddsd', 'dsdsd', 'GST', '150', 'Ta', '250', '1000', 1400.00, 2, '2024-12-11 12:44:12', '2024-12-11 12:44:12', 'upi', 'partially_paid', '[{\"category_name\":\"sample category\",\"product_name\":\"Sample Product\",\"quantity\":10,\"unit\":\"piece\",\"rate\":100,\"subtotal_amount\":1000}]', NULL, NULL),
(27, 18, '2024-12-14', '2024-12-14', '00', '212', NULL, NULL, NULL, NULL, NULL, 'ds', 'ds', 'GST', '1750', 'Tv', '250', '2500', 4500.00, 2, '2024-12-14 09:20:04', '2024-12-14 09:20:04', 'debit_card', 'partially_paid', '[{\"category_name\":\"booksai\",\"product_name\":\"50.00 MFD 45X120 PP MOTOR RUN-440V\\t\",\"quantity\":1,\"unit\":\"piece\",\"rate\":2500,\"subtotal_amount\":2500}]', NULL, NULL),
(28, 18, '2024-12-13', '2024-12-14', '00', '32', NULL, NULL, NULL, NULL, NULL, 'ds', 'ds', 'GST', '180', 'Ta', '100', '3520', 3800.00, 2, '2024-12-14 09:21:39', '2024-12-14 09:21:39', 'credit_card', 'partially_paid', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":1,\"unit\":\"piece\",\"rate\":3520,\"subtotal_amount\":3520}]', NULL, NULL),
(29, 19, '2024-12-13', '2024-12-14', '00', 'ds', NULL, NULL, NULL, NULL, NULL, 'da', 'ds', 'gst', '100', 'ta', '150', '1000', 1250.00, 2, '2024-12-14 10:46:14', '2024-12-14 10:46:14', 'debit_card', 'unpaid', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":10,\"unit\":\"piece\",\"rate\":100,\"subtotal_amount\":1000}]', NULL, NULL),
(30, 19, '2024-12-14', '2024-12-14', '00', 'ds', NULL, NULL, NULL, NULL, NULL, 'ds', 'ds', 'gst', '275', 'ta', '75', '2400', 2750.00, 2, '2024-12-14 10:47:20', '2024-12-14 10:47:20', 'debit_card', 'partially_paid', '[{\"category_name\":\"Electronics product\",\"product_name\":\"ewewe1212\",\"quantity\":10,\"unit\":\"piece\",\"rate\":240,\"subtotal_amount\":2400}]', NULL, NULL),
(31, 20, '2024-12-13', '2024-12-14', '00', 'ds', NULL, NULL, NULL, NULL, NULL, 'sdsd', 'dsd', 'gst', '350', 'ta', '150', '4500', 5000.00, 2, '2024-12-14 11:01:47', '2024-12-14 11:01:47', 'cash', 'unpaid', '[{\"category_name\":\"Clothing\",\"product_name\":\"T-Shirt\",\"quantity\":1,\"unit\":\"piece\",\"rate\":4500,\"subtotal_amount\":4500}]', NULL, NULL),
(32, 20, '2024-12-13', '2024-12-14', '00', '10', NULL, NULL, NULL, NULL, NULL, 'sa', 'sd', 'gst', '375', 'ta', '125', '1000', 1500.00, 2, '2024-12-14 12:23:57', '2024-12-14 12:23:57', 'upi', 'partially_paid', '[{\"category_name\":\"sample category\",\"product_name\":\"Sample Product\",\"quantity\":10,\"unit\":\"box\",\"rate\":100,\"subtotal_amount\":1000}]', '8000', '9500'),
(33, 20, '2024-12-16', '2024-12-17', '00', 'kask', NULL, NULL, NULL, NULL, NULL, 'jsa', 'ksa', 'gat', '150', 'ta', '50', '1250', 1450.00, 2, '2024-12-17 09:43:16', '2024-12-17 09:43:16', 'credit_card', 'unpaid', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":5,\"unit\":\"piece\",\"rate\":250,\"subtotal_amount\":1250}]', '9500', '10950'),
(34, 20, '2024-12-20', '2024-12-21', '00', '10', NULL, NULL, NULL, NULL, NULL, '', '', 'ds', '10', 'ds', '10', '1010', 1020.00, 2, '2024-12-21 07:17:08', '2024-12-21 07:17:08', 'no', 'unpaid', '[{\"category_name\":\"Electronics product\",\"product_name\":\"ewewe1212\",\"quantity\":10,\"unit\":\"piece\",\"rate\":101,\"subtotal_amount\":1010}]', '10950', '11970'),
(36, 20, '2024-12-20', '2024-12-21', '00', 'cc', NULL, NULL, NULL, NULL, NULL, '', '', 'ds', '500', 'ts', '250', '25000', 25750.00, 2, '2024-12-21 07:57:58', '2024-12-21 07:57:58', 'no', 'unpaid', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":10,\"unit\":\"piece\",\"rate\":2500,\"subtotal_amount\":25000}]', '11970', '37720'),
(37, 20, '2024-12-20', '2024-12-21', '00', 'vbnm,', NULL, NULL, NULL, NULL, NULL, '', '', 'ta', '250', 'gst', '350', '10000', 10600.00, 2, '2024-12-21 11:46:21', '2024-12-21 11:46:21', 'no', 'unpaid', '[{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":10,\"unit\":\"piece\",\"rate\":1000,\"subtotal_amount\":10000}]', '12000', '22600');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_payments`
--

CREATE TABLE `purchase_payments` (
  `payment_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `receiveAmount` decimal(10,2) NOT NULL,
  `pendingAmount` decimal(10,2) NOT NULL,
  `payment_mode` varchar(55) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_status` varchar(55) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_payments`
--

INSERT INTO `purchase_payments` (`payment_id`, `vendor_id`, `receiveAmount`, `pendingAmount`, `payment_mode`, `payment_date`, `payment_status`, `description`, `created_at`, `updated_at`) VALUES
(3, 16, 17000.00, 20000.00, 'credit_card', '2024-12-11', 'partially_paid', 'ds', '2024-12-11 06:58:33', '2024-12-11 06:58:33'),
(9, 11, 4500.00, 5500.00, 'debit_card', '2024-12-18', 'unpaid', 'd', '2024-12-11 12:36:44', '2024-12-11 12:36:44'),
(10, 17, 2150.00, 3000.00, 'debit_card', '2024-12-16', 'partially_paid', 's', '2024-12-11 12:45:56', '2024-12-11 12:45:56'),
(11, 18, 2300.00, 6000.00, 'upi', '2024-12-16', 'partially_paid', 'ds', '2024-12-14 09:22:49', '2024-12-14 09:22:49'),
(12, 19, 2500.00, 1500.00, 'cash', '2024-12-14', 'partially_paid', 's', '2024-12-14 10:48:54', '2024-12-14 10:48:54'),
(13, 20, 4500.00, 8000.00, 'cash', '2024-12-14', 'partially_paid', 'd', '2024-12-14 11:04:28', '2024-12-14 11:04:28'),
(14, 20, 25720.00, 12000.00, 'upi', '2024-12-21', 'partially_paid', '10', '2024-12-21 08:38:15', '2024-12-21 08:38:15');

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
  `adjustmentType` varchar(255) DEFAULT NULL,
  `adjustmentValue` varchar(255) DEFAULT NULL,
  `adjustmentType2` varchar(255) DEFAULT NULL,
  `adjustmentValue2` varchar(255) DEFAULT NULL,
  `subtotal_amount` varchar(255) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `signature_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `invoice_details` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotations`
--

INSERT INTO `quotations` (`id`, `quotation_number`, `customer_id`, `quotation_date`, `due_date`, `status`, `product_id`, `subproduct_id`, `quantity`, `rate`, `notes`, `terms_conditions`, `adjustmentType`, `adjustmentValue`, `adjustmentType2`, `adjustmentValue2`, `subtotal_amount`, `total_amount`, `signature_id`, `created_at`, `updated_at`, `invoice_details`) VALUES
(1, 'QTN-001', 28, '2024-11-13', '2024-11-15', 'paid', 9, 2, 22, 22.00, 'sdcd', 'cddsc', NULL, NULL, NULL, NULL, NULL, 2222.00, 1, '2024-11-16 09:24:01', '2024-11-16 10:08:19', ''),
(2, 'QTN-002', 28, '2024-11-19', '2024-11-12', 'unpaid', NULL, 0, NULL, NULL, 'vfv', 'vfvffv', NULL, NULL, NULL, NULL, NULL, 200.00, 1, '2024-11-19 09:27:58', '2024-11-19 09:27:58', '[{\"product_id\":10,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100},{\"product_id\":7,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100}]'),
(3, 'QTN-003', 13, '2024-11-18', '2024-11-21', 'unpaid', NULL, 0, NULL, NULL, 'fvzfz', 'fvfv', NULL, NULL, NULL, NULL, NULL, 200.00, 2, '2024-11-19 09:28:31', '2024-11-19 09:28:31', '[{\"product_id\":9,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100},{\"product_id\":2,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":10,\"total_amount\":100}]'),
(4, 'QTN-004', 31, '2024-12-16', '2024-12-16', 'unpaid', NULL, 0, NULL, NULL, '', '', 'gst', '15000', 'ta', '25000', '135000', 135000.00, 2, '2024-12-17 12:23:52', '2024-12-23 09:03:57', '[{\"category_name\":\"Clothing\",\"product_name\":\"T-Shirt\",\"quantity\":250,\"unit\":\"piece\",\"rate\":450,\"discount\":0,\"subtotal_amount\":112500},{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":5,\"unit\":\"piece\",\"rate\":4500,\"discount\":0,\"subtotal_amount\":22500}]'),
(5, 'QTN-005', 20, '2024-12-21', '2024-12-22', 'no', NULL, 0, NULL, NULL, '', '', 'GST', '4500', 'TA', '500', '50000', 55000.00, 2, '2024-12-23 09:21:27', '2024-12-23 09:36:05', '[{\"category_name\":\"booksai\",\"product_name\":\"50.00 MFD 45X120 PP MOTOR RUN-440V\\t\",\"quantity\":10,\"unit\":\"piece\",\"rate\":4500,\"discount\":0,\"subtotal_amount\":45000},{\"category_name\":\"Furniture\",\"product_name\":\"Chair\",\"quantity\":10,\"unit\":\"piece\",\"rate\":500,\"discount\":0,\"subtotal_amount\":5000}]');

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
  `adjustmentType` varchar(255) DEFAULT NULL,
  `adjustmentValue` varchar(255) DEFAULT NULL,
  `adjustmentType2` varchar(255) DEFAULT NULL,
  `adjustmentValue2` varchar(255) DEFAULT NULL,
  `subtotal_amount` varchar(255) DEFAULT NULL,
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

INSERT INTO `return_debit_notes_purchases` (`id`, `vendor_id`, `purchase_order_date`, `due_date`, `reference_no`, `product_id`, `subproduct_id`, `quantity`, `rate`, `notes`, `terms_conditions`, `adjustmentType`, `adjustmentValue`, `adjustmentType2`, `adjustmentValue2`, `subtotal_amount`, `total_amount`, `signature_id`, `created_at`, `updated_at`, `payment_mode`, `status`, `invoice_details`) VALUES
(1, 10, NULL, '0000-00-00', 'dsdsd', 7, NULL, 10, 10.00, 'dsdsdsd', 'dsdsd', NULL, NULL, NULL, NULL, NULL, 500.00, NULL, '2024-11-09 11:41:58', '2024-11-09 11:55:23', 'cash', 'cancelled', ''),
(2, 4, '2024-11-12', '2023-01-26', 'REF001', 1, 1, 10, 100.00, 'Initial Purchase', 'Terms A', NULL, NULL, NULL, NULL, NULL, 1000.00, 2, '2024-11-09 11:47:25', '2024-11-15 07:22:45', 'Cash', 'paid', ''),
(3, 5, '2024-11-14', '2024-12-31', 'REF002', 2, NULL, 20, 150.00, 'Bulk Order', 'Terms B', NULL, NULL, NULL, NULL, NULL, 3000.00, 1, '2024-11-09 11:47:25', '2024-11-14 14:18:03', 'Credit', 'paid', ''),
(4, 7, NULL, '2023-02-10', 'REF003', 7, NULL, 15, 200.00, 'Reorder', 'Terms C', NULL, NULL, NULL, NULL, NULL, 3000.00, NULL, '2024-11-09 11:47:25', '2024-11-09 11:47:25', 'Bank Transfer', 'Pending', ''),
(5, 6, NULL, '2023-02-15', 'REF004', 8, NULL, 25, 120.00, 'Seasonal Stock', 'Terms D', NULL, NULL, NULL, NULL, NULL, 3000.00, NULL, '2024-11-09 11:47:25', '2024-11-09 11:47:25', 'Cash', 'Completed', ''),
(6, 8, NULL, '2023-02-20', 'REF005', 9, NULL, 30, 130.00, 'Urgent Purchase', 'Terms E', NULL, NULL, NULL, NULL, NULL, 3900.00, NULL, '2024-11-09 11:47:25', '2024-11-09 11:47:25', 'Credit', 'Pending', ''),
(7, 9, '2023-02-19', '2023-02-19', 'REF005', 8, NULL, 30, 130.00, 'Urgent Purchase', 'Terms E', NULL, NULL, NULL, NULL, NULL, 3900.00, NULL, '2024-11-09 11:47:25', '2024-11-12 12:31:08', 'Credit', 'paid', ''),
(8, 5, '2024-11-18', '2024-11-20', 'klknlk', NULL, NULL, NULL, NULL, 'vdfv', 'vfvdfv', NULL, NULL, NULL, NULL, NULL, 500.00, 1, '2024-11-19 07:44:58', '2024-11-19 07:46:44', 'Cash', 'unpaid', '[{\"product_id\":9,\"subproduct_id\":null,\"quantity\":10,\"unit\":\"box\",\"rate\":50,\"total_amount\":500}]'),
(9, 11, '2024-11-20', '2024-11-27', '00', NULL, NULL, NULL, NULL, 'ewewe', 'ewewe', NULL, NULL, NULL, NULL, NULL, 200.00, 2, '2024-11-27 11:06:18', '2024-11-27 11:06:18', 'credit_card', 'partially_paid', '[{\"category_id\":18,\"product_id\":11,\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"total_amount\":100},{\"category_id\":9,\"product_id\":8,\"quantity\":10,\"unit\":\"cartoon\",\"rate\":10,\"total_amount\":100}]'),
(10, 20, '2024-12-17', '2024-12-17', '00', NULL, NULL, NULL, NULL, '', '', 'GST', '150', 'Ta', '75', '100', 325.00, 2, '2024-12-18 07:01:01', '2024-12-18 07:01:01', 'credit_card', 'unpaid', '[{\"category_name\":\"Clothing\",\"product_name\":\"T-Shirt\",\"quantity\":10,\"unit\":\"piece\",\"rate\":10,\"subtotal_amount\":100}]'),
(11, 19, '2024-12-17', '2024-12-18', '00', NULL, NULL, NULL, NULL, '', '', 'gst', '12', 'ta', '200', '1904', 2116.00, 2, '2024-12-21 10:32:15', '2024-12-23 10:09:17', 'no', 'cancelled', '[{\"category_name\":\"booksai\",\"product_name\":\"50.00 MFD 45X120 PP MOTOR RUN-440V\\t\",\"quantity\":4,\"unit\":\"piece\",\"rate\":250,\"discount\":null,\"subtotal_amount\":1000},{\"category_name\":\"Electronics\",\"product_name\":\"home speacker\",\"quantity\":2,\"unit\":\"piece\",\"rate\":452,\"discount\":null,\"subtotal_amount\":904}]');

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
-- Table structure for table `transaction_logs`
--

CREATE TABLE `transaction_logs` (
  `log_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `balance_after` decimal(10,2) NOT NULL,
  `payment_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaction_logs`
--

INSERT INTO `transaction_logs` (`log_id`, `customer_id`, `transaction_type`, `amount`, `balance_after`, `payment_date`, `created_at`) VALUES
(1, 30, 'sales', 2000.00, 82500.00, NULL, '2024-12-11 10:35:41'),
(2, 30, 'payment-in', 4000.00, 78500.00, NULL, '2024-12-11 10:52:50'),
(3, 30, 'payment-in', 35500.00, 43000.00, NULL, '2024-12-11 10:58:27'),
(4, 29, 'sales', 20000.00, 20000.00, NULL, '2024-12-11 11:21:50'),
(5, 17, 'sales', 510.00, 510.00, NULL, '2024-12-14 08:00:57'),
(6, 31, 'sales', 10000.00, 25000.00, NULL, '2024-12-14 10:57:21'),
(7, 31, 'payment-in', 15000.00, 10000.00, NULL, '2024-12-14 11:03:11'),
(8, 31, 'sales', 5000.00, 15000.00, NULL, '2024-12-14 12:00:06'),
(9, 31, 'sales', 6300.00, 21300.00, NULL, '2024-12-14 12:11:49'),
(10, 31, 'sales', 300.00, 21600.00, NULL, '2024-12-17 08:52:56'),
(11, 30, 'sales', 500.00, 43500.00, NULL, '2024-12-17 08:58:42'),
(12, 30, 'sales', 660.00, 44160.00, NULL, '2024-12-17 09:07:11'),
(13, 30, 'payment-in', 20160.00, 24000.00, '2024-12-26', '2024-12-18 12:34:39'),
(14, 31, 'sales', 4900.00, 26500.00, NULL, '2024-12-21 07:55:37');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `vendor_id` int(11) NOT NULL,
  `vendor_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `opening_balance` decimal(10,2) NOT NULL,
  `closing_balance` decimal(10,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`vendor_id`, `vendor_name`, `email`, `phone_number`, `opening_balance`, `closing_balance`, `created_at`, `updated_at`) VALUES
(4, 'ABC Supplies', 'contact@abcsupplies.com', '1234567890', 0.00, 100.50, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(5, 'XYZ Wholesalers', 'sales@xyzwholesalers.com', '9876543210', 0.00, 200.75, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(6, 'Global Goods', 'info@globalgoods.com', '1234509876', 0.00, 300.00, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(7, 'QuickMart', 'support@quickmart.com', '8765432109', 0.00, 150.25, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(8, 'Prime Distributors', 'service@primedis.com', '2345678901', 0.00, 275.00, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(9, 'Central Supplies', 'info@centralsupplies.com', '3456789012', 0.00, 125.50, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(10, 'National Wholesale', 'contact@nationalws.com', '4567890123', 0.00, 450.30, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(11, 'Direct Markets', 'support@directmarkets.com', '5678901234', -4500.00, 5500.00, '2024-11-08 09:12:13', '2024-12-11 12:36:44'),
(12, 'WorldWide Products', 'sales@worldwide.com', '6789012345', 0.00, 210.45, '2024-11-08 09:12:13', '2024-11-08 09:12:13'),
(13, 'SuperMart Suppliers', 'service@supermart.com', '7890123456', 0.00, 180.00, '2024-11-08 09:12:13', '2024-11-08 09:12:28'),
(14, 'new testdsd', 'vp212@gmail.com', '212121212', 0.00, 32323.00, '2024-11-11 13:34:34', '2024-11-11 13:34:57'),
(15, '212jjewe', 'vp43434@gmail.com', '323323233', 0.00, 232323.00, '2024-11-11 13:35:14', '2024-11-11 13:35:14'),
(16, 'Dmart', 'dmart@info.com', '7845127542', 20000.00, 21000.00, '2024-12-11 06:30:28', '2024-12-11 07:52:40'),
(17, 'pagarkha', 'pagarkha@gmail.com', '22', 1600.00, 3000.00, '2024-12-11 12:41:09', '2024-12-11 12:45:56'),
(18, 'nowhere', 'nowhere@gmail.com', '7878451274', 2200.00, 6000.00, '2024-12-14 09:18:52', '2024-12-14 09:22:49'),
(19, 'naHoyLya', 'naHoyLya@gmail.com', '785421747', -1250.00, 1500.00, '2024-12-14 10:45:25', '2024-12-14 10:48:54'),
(20, 'jayeshbhau', 'bhau@gmail.com', '875421854', 12000.00, 22600.00, '2024-12-14 10:59:47', '2024-12-21 11:46:21');

-- --------------------------------------------------------

--
-- Table structure for table `vendor_transaction_logs`
--

CREATE TABLE `vendor_transaction_logs` (
  `log_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `transaction_type` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `balance_after` decimal(10,2) NOT NULL,
  `payment_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendor_transaction_logs`
--

INSERT INTO `vendor_transaction_logs` (`log_id`, `vendor_id`, `transaction_type`, `amount`, `balance_after`, `payment_date`, `created_at`) VALUES
(1, 11, 'purchase', 10000.00, 10000.00, NULL, '2024-12-11 12:33:57'),
(2, 11, 'payment-in', 4500.00, 1000.00, NULL, '2024-12-11 12:36:44'),
(3, 17, 'purchase', 3750.00, 3750.00, NULL, '2024-12-11 12:43:05'),
(4, 17, 'purchase', 1400.00, 5150.00, NULL, '2024-12-11 12:44:12'),
(5, 17, 'payment-in', 2150.00, 850.00, NULL, '2024-12-11 12:45:56'),
(6, 18, 'purchase', 4500.00, 4500.00, NULL, '2024-12-14 09:20:04'),
(7, 18, 'purchase', 3800.00, 8300.00, NULL, '2024-12-14 09:21:39'),
(8, 18, 'payment-in', 2300.00, 3700.00, NULL, '2024-12-14 09:22:49'),
(9, 19, 'purchase', 1250.00, 1250.00, NULL, '2024-12-14 10:46:14'),
(10, 19, 'purchase', 2750.00, 4000.00, NULL, '2024-12-14 10:47:20'),
(11, 19, 'payment-in', 2500.00, 1500.00, NULL, '2024-12-14 10:48:54'),
(12, 20, 'purchase', 5000.00, 12500.00, NULL, '2024-12-14 11:01:48'),
(13, 20, 'payment-in', 4500.00, 8000.00, NULL, '2024-12-14 11:04:28'),
(14, 20, 'purchase', 1500.00, 9500.00, NULL, '2024-12-14 12:23:57'),
(15, 20, 'purchase', 1450.00, 10950.00, NULL, '2024-12-17 09:43:16'),
(16, 20, 'purchase', 1020.00, 11970.00, NULL, '2024-12-21 07:17:08'),
(17, 20, 'purchase', 0.00, 11970.00, NULL, '2024-12-21 07:56:08'),
(18, 20, 'purchase', 25750.00, 37720.00, NULL, '2024-12-21 07:57:58'),
(19, 20, 'payment-in', 25720.00, 12000.00, '2024-12-21', '2024-12-21 08:38:15'),
(20, 20, 'purchase', 10600.00, 22600.00, '2024-12-20', '2024-12-21 11:46:21');

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
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`);

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
-- Indexes for table `purchase_payments`
--
ALTER TABLE `purchase_payments`
  ADD PRIMARY KEY (`payment_id`);

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
-- Indexes for table `transaction_logs`
--
ALTER TABLE `transaction_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`vendor_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vendor_transaction_logs`
--
ALTER TABLE `vendor_transaction_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `creditnoteinvoices`
--
ALTER TABLE `creditnoteinvoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `delivery_challans`
--
ALTER TABLE `delivery_challans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

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
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `purchase_payments`
--
ALTER TABLE `purchase_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `quotations`
--
ALTER TABLE `quotations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `return_debit_notes_purchases`
--
ALTER TABLE `return_debit_notes_purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
-- AUTO_INCREMENT for table `transaction_logs`
--
ALTER TABLE `transaction_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `vendor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `vendor_transaction_logs`
--
ALTER TABLE `vendor_transaction_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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

--
-- Constraints for table `transaction_logs`
--
ALTER TABLE `transaction_logs`
  ADD CONSTRAINT `transaction_logs_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE;

--
-- Constraints for table `vendor_transaction_logs`
--
ALTER TABLE `vendor_transaction_logs`
  ADD CONSTRAINT `vendor_transaction_logs_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 29, 2024 at 07:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `soap`
--

-- --------------------------------------------------------

--
-- Table structure for table `exchange_rates`
--

CREATE TABLE `exchange_rates` (
  `from_currency` varchar(3) NOT NULL,
  `to_currency` varchar(3) NOT NULL,
  `rate` decimal(20,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exchange_rates`
--

INSERT INTO `exchange_rates` (`from_currency`, `to_currency`, `rate`) VALUES
('AUD', 'EUR', 0.63000),
('AUD', 'GBP', 0.55000),
('AUD', 'JPY', 110.00000),
('AUD', 'USD', 0.74000),
('EUR', 'AUD', 1.59000),
('EUR', 'GBP', 0.87000),
('EUR', 'JPY', 176.00000),
('EUR', 'USD', 1.18000),
('GBP', 'AUD', 1.83000),
('GBP', 'EUR', 1.15000),
('GBP', 'JPY', 202.00000),
('GBP', 'USD', 1.35000),
('JPY', 'AUD', 0.00910),
('JPY', 'EUR', 0.00570),
('JPY', 'GBP', 0.00490),
('JPY', 'USD', 0.00670),
('USD', 'AUD', 1.35000),
('USD', 'EUR', 0.85000),
('USD', 'GBP', 0.74000),
('USD', 'JPY', 150.00000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exchange_rates`
--
ALTER TABLE `exchange_rates`
  ADD PRIMARY KEY (`from_currency`,`to_currency`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

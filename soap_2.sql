-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 29, 2024 at 07:56 AM
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
  `rate` decimal(30,10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exchange_rates`
--

INSERT INTO `exchange_rates` (`from_currency`, `to_currency`, `rate`) VALUES
('AUD', 'BTC', 1212.0000000000),
('AUD', 'EUR', 0.6300000000),
('AUD', 'GBP', 0.5500000000),
('AUD', 'JPY', 110.0000000000),
('AUD', 'USD', 0.7400000000),
('BTC', 'AUD', 0.0008300000),
('BTC', 'EUR', 0.0002900000),
('BTC', 'GBP', 0.0002200000),
('BTC', 'JPY', 0.0001800000),
('BTC', 'USD', 0.0001500000),
('EUR', 'AUD', 1.5900000000),
('EUR', 'BTC', 3434.0000000000),
('EUR', 'GBP', 0.8700000000),
('EUR', 'JPY', 176.0000000000),
('EUR', 'USD', 1.1800000000),
('GBP', 'AUD', 1.8300000000),
('GBP', 'BTC', 4545.0000000000),
('GBP', 'EUR', 1.1500000000),
('GBP', 'JPY', 202.0000000000),
('GBP', 'USD', 1.3500000000),
('JPY', 'AUD', 0.0091000000),
('JPY', 'BTC', 5656.0000000000),
('JPY', 'EUR', 0.0057000000),
('JPY', 'GBP', 0.0049000000),
('JPY', 'USD', 0.0067000000),
('USD', 'AUD', 1.3500000000),
('USD', 'BTC', 6767.0000000000),
('USD', 'EUR', 0.8500000000),
('USD', 'GBP', 0.7400000000),
('USD', 'JPY', 150.0000000000);

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

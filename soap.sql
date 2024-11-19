-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 19, 2024 lúc 06:55 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `soap`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `exchange_rates`
--

CREATE TABLE `exchange_rates` (
  `from_currency` varchar(3) NOT NULL,
  `to_currency` varchar(3) NOT NULL,
  `rate` decimal(10,4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `exchange_rates`
--

INSERT INTO `exchange_rates` (`from_currency`, `to_currency`, `rate`) VALUES
('AUD', 'EUR', 0.6300),
('AUD', 'GBP', 0.5500),
('AUD', 'JPY', 110.0000),
('AUD', 'USD', 0.7400),
('EUR', 'AUD', 1.5900),
('EUR', 'GBP', 0.8700),
('EUR', 'JPY', 176.0000),
('EUR', 'USD', 1.1800),
('GBP', 'AUD', 1.8300),
('GBP', 'EUR', 1.1500),
('GBP', 'JPY', 202.0000),
('GBP', 'USD', 1.3500),
('JPY', 'AUD', 0.0091),
('JPY', 'EUR', 0.0057),
('JPY', 'GBP', 0.0049),
('JPY', 'USD', 0.0067),
('USD', 'AUD', 1.3500),
('USD', 'EUR', 0.8500),
('USD', 'GBP', 0.7400),
('USD', 'JPY', 150.0000);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `exchange_rates`
--
ALTER TABLE `exchange_rates`
  ADD PRIMARY KEY (`from_currency`,`to_currency`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

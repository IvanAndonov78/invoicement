-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2020 at 10:58 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `andonovs_inv`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_client`
--

CREATE TABLE `t_client` (
  `client_id` int(60) NOT NULL,
  `eic` int(40) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `t_client`
--

INSERT INTO `t_client` (`client_id`, `eic`, `name`, `address`) VALUES
(1, 201362001, 'Gargamel Ltd', 'Sofia'),
(2, 201362002, 'Donald Duck Inc', 'Vratza'),
(3, 201362003, 'Micky Mouse JSC', 'Pernik'),
(4, 201362004, 'Wolfs United Ltd', 'The Dark Forest');

-- --------------------------------------------------------

--
-- Table structure for table `t_invoice`
--

CREATE TABLE `t_invoice` (
  `rec_id` int(60) NOT NULL,
  `invoice_num` int(60) NOT NULL,
  `issuing_date` date NOT NULL,
  `client_id` int(60) NOT NULL,
  `issuer` varchar(100) NOT NULL,
  `language` varchar(100) NOT NULL,
  `matter` text NOT NULL,
  `currency` varchar(40) NOT NULL,
  `amount` float NOT NULL,
  `discount` float NOT NULL,
  `vat` float NOT NULL,
  `total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `t_invoice`
--

INSERT INTO `t_invoice` (`rec_id`, `invoice_num`, `issuing_date`, `client_id`, `issuer`, `language`, `matter`, `currency`, `amount`, `discount`, `vat`, `total`) VALUES
(1, 1, '2020-04-29', 2, 'Ivan Andonov', 'Bulgarian', 'dd', 'EUR', 200, 0, 40, 220),
(2, 2, '2020-04-29', 3, 'Ivan Andonov', 'Bulgarian', 'test', 'EUR', 60, 5, 11, 75);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_client`
--
ALTER TABLE `t_client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `t_invoice`
--
ALTER TABLE `t_invoice`
  ADD PRIMARY KEY (`rec_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_client`
--
ALTER TABLE `t_client`
  MODIFY `client_id` int(60) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `t_invoice`
--
ALTER TABLE `t_invoice`
  MODIFY `rec_id` int(60) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

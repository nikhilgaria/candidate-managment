-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2022 at 07:28 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` int(11) DEFAULT NULL,
  `pass` varchar(400) NOT NULL,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id`, `name`, `last_name`, `email`, `contact`, `pass`, `address1`, `address2`, `city`, `state`, `pincode`, `added_date`) VALUES
(1, 'candidate1', '', 'test@gmail.com', 345345345, '', '', '', '', '', '', '2022-10-07 00:37:30'),
(5, 'test2', '', 'asdf@gmail.com', 0, '', '', '', '', 'mumbai', '555555', '2022-10-10 08:32:15');

-- --------------------------------------------------------

--
-- Table structure for table `candidate_project`
--

CREATE TABLE `candidate_project` (
  `id` int(11) NOT NULL,
  `cand_id` int(11) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `website` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `still_work` enum('0','1') NOT NULL,
  `resume` varchar(200) NOT NULL,
  `project_desc` varchar(300) NOT NULL,
  `add_teammate` varchar(100) NOT NULL,
  `skill` varchar(200) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidate_project`
--

INSERT INTO `candidate_project` (`id`, `cand_id`, `project_name`, `website`, `role`, `start_date`, `end_date`, `still_work`, `resume`, `project_desc`, `add_teammate`, `skill`, `added_date`) VALUES
(22, 0, 'test', '', '', '0000-00-00', '0000-00-00', '', '', '<p>test</p>\n', '', '', '2022-10-11 04:48:57'),
(23, 1, 'test', '', '', '0000-00-00', '0000-00-00', '', '', '<p>test</p>\n', '', '', '2022-10-11 04:57:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `candidate_project`
--
ALTER TABLE `candidate_project`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `candidate_project`
--
ALTER TABLE `candidate_project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

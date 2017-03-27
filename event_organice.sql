-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2017 at 12:08 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event_organice`
--

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `EVENT_ID` int(10) NOT NULL,
  `OWNER_ID` int(10) NOT NULL,
  `EVENT_NAME` varchar(100) NOT NULL,
  `CATEGORY` varchar(20) DEFAULT NULL,
  `DETAIL` text,
  `PICTURE` text,
  `VIDEO` text,
  `TIME_START_E` datetime(6) DEFAULT NULL,
  `TIME_END_E` datetime(6) DEFAULT NULL,
  `CONDITION_MIN_AGE` int(3) DEFAULT NULL,
  `CONDITION_MAX_AGE` int(3) DEFAULT NULL,
  `CONDITION_SEX` varchar(5) DEFAULT NULL,
  `SOLD_OUT_SEAT` varchar(5) DEFAULT NULL,
  `MAX_SEAT` int(5) DEFAULT NULL,
  `PRICE` int(10) DEFAULT NULL,
  `PROMOTE_E_ID` int(5) DEFAULT NULL,
  `LOCATION_lat` varchar(20) DEFAULT NULL,
  `LOCATION_lng` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `following`
--

CREATE TABLE `following` (
  `MEMBER_ID` int(10) NOT NULL,
  `FOLLOWING_ID` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `join_event`
--

CREATE TABLE `join_event` (
  `EVENT_ID` int(10) NOT NULL,
  `MEMBER_ID` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `MEMBER_ID` int(10) NOT NULL,
  `NATIONAL_ID` varchar(13) NOT NULL,
  `USERNAME` varchar(20) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  `FNAME` varchar(30) DEFAULT NULL,
  `LNAME` varchar(30) DEFAULT NULL,
  `SEX` varchar(6) DEFAULT NULL,
  `BIRTH_DATE` date DEFAULT NULL,
  `ADDRESS` text,
  `E-MAIL` varchar(50) DEFAULT NULL,
  `PHONE` varchar(10) DEFAULT NULL,
  `CREDIT_CARD` varchar(20) DEFAULT NULL,
  `URL_IMG` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`MEMBER_ID`, `NATIONAL_ID`, `USERNAME`, `PASSWORD`, `FNAME`, `LNAME`, `SEX`, `BIRTH_DATE`, `ADDRESS`, `E-MAIL`, `PHONE`, `CREDIT_CARD`, `URL_IMG`) VALUES
(1, '1529900805848', 'Thomas', 'gik', 'Apinun', 'Uppanun', 'male', '1996-01-12', '315/1 หมู่ 7 ซอย 9 ถนน ลำปาง-แม่ทะ ต.ชมพู อ.เมือง จ.ลำปาง 52100', 'lekapinun@gmail.com', '0801239340', '527069xxxxxx5772', 'http://orig10.deviantart.net/ec38/f/2011/268/2/a/profile_picture_by_circle_glasses-d4axbdn.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `promote_e`
--

CREATE TABLE `promote_e` (
  `PROMOTE_ID` int(10) NOT NULL,
  `BUDGETS` int(10) DEFAULT NULL,
  `END_DATE` date DEFAULT NULL,
  `MEMBER_ID` int(10) NOT NULL,
  `TARGET_GENDER` varchar(6) DEFAULT NULL,
  `TARGET_MIN_AGE` int(3) DEFAULT NULL,
  `TARGET_MAX_AGE` int(3) DEFAULT NULL,
  `TARGET_INTEREST` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `support`
--

CREATE TABLE `support` (
  `SUPPORT_ID` int(10) NOT NULL,
  `LOCATION_NAME` varchar(100) NOT NULL,
  `CATEGORY` varchar(15) NOT NULL,
  `DETAIL` text,
  `PICTURE` text,
  `ADDRESS_lat` varchar(20) DEFAULT NULL,
  `ADDRESS_lng` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `ID_TICKET` int(10) NOT NULL,
  `AMOUNT` int(10) DEFAULT NULL,
  `MEMBER_ID` int(10) NOT NULL,
  `EVENT_ID` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`EVENT_ID`);

--
-- Indexes for table `join_event`
--
ALTER TABLE `join_event`
  ADD PRIMARY KEY (`EVENT_ID`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`MEMBER_ID`);

--
-- Indexes for table `promote_e`
--
ALTER TABLE `promote_e`
  ADD PRIMARY KEY (`PROMOTE_ID`);

--
-- Indexes for table `support`
--
ALTER TABLE `support`
  ADD PRIMARY KEY (`SUPPORT_ID`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ID_TICKET`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `EVENT_ID` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `join_event`
--
ALTER TABLE `join_event`
  MODIFY `EVENT_ID` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `MEMBER_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `promote_e`
--
ALTER TABLE `promote_e`
  MODIFY `PROMOTE_ID` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `support`
--
ALTER TABLE `support`
  MODIFY `SUPPORT_ID` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `ID_TICKET` int(10) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

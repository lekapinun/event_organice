-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 01, 2017 at 12:10 PM
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
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CATEGORY` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CATEGORY`) VALUES
('Business'),
('Charity&Causes'),
('Community'),
('Education'),
('Fashion'),
('Film&Media'),
('Food&Drink'),
('LifeStyle'),
('Music'),
('Science&Technology'),
('Sport&Fitness');

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
  `TIME_START_E` text,
  `TIME_END_E` text,
  `CONDITION_MIN_AGE` int(3) DEFAULT NULL,
  `CONDITION_MAX_AGE` int(3) DEFAULT NULL,
  `CONDITION_SEX` varchar(15) DEFAULT NULL,
  `SOLD_OUT_SEAT` varchar(5) DEFAULT NULL,
  `MAX_SEAT` int(5) DEFAULT NULL,
  `PRICE` int(10) DEFAULT NULL,
  `PROMOTE_E_ID` int(5) DEFAULT NULL,
  `LOCATION_lat` varchar(20) DEFAULT NULL,
  `LOCATION_lng` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`EVENT_ID`, `OWNER_ID`, `EVENT_NAME`, `CATEGORY`, `DETAIL`, `PICTURE`, `VIDEO`, `TIME_START_E`, `TIME_END_E`, `CONDITION_MIN_AGE`, `CONDITION_MAX_AGE`, `CONDITION_SEX`, `SOLD_OUT_SEAT`, `MAX_SEAT`, `PRICE`, `PROMOTE_E_ID`, `LOCATION_lat`, `LOCATION_lng`) VALUES
(1, 1, 'Dead by Daylight Tournament!', 'Sport&Fitness', 'Deathly is not the end.', 'https://www.goonvpn.com/uploads/DBD-5.jpg', 'https://www.youtube.com/embed/CmTmyd4CPQ0', '1492714800000', '1492725600000', 17, 60, 'Male&Female', '0', 40, 200, 1, '18.791478456337572', ' 98.95407736301422'),
(2, 1, 'Winning PES 2017', 'Sport&Fitness', 'PES 2017 Tournament', 'https://www.konami.com/kde_cms/eu_publish/uploads/pes2017andy-1024x576.jpg', 'https://www.youtube.com/embed/noCFYWBF6vE', '1486720800000', '1486749600000', 0, 100, 'Male & Female', '0', 100, 200, NULL, '18.787357219859043', '98.98306024035264'),
(3, 1, 'Pool Party', 'Community', 'สนุกสนานและหรรษาไปกับหนุ่มๆกับชุดว่ายน้ำกระจิ๊วหลิ่ว ในคืนส่งท้ายปีเก่า ต้อนรับปีใหม่', 'http://friendsoffredco.org/wp-content/uploads/2016/08/pool-party.jpg', 'https://www.youtube.com/embed/gwFC7HNpQ9M', '1490983200000', '1491022800000', 18, 40, 'Female', '0', 50, 5000, NULL, '18.787357219859043', '98.98306024035264'),
(19, 1, 'xxxxxxxxxxxxxxxxxx', 'Community', 'xxx', 'http://media.kids-myshot.nationalgeographic.com/2012/09/50633ec87f60bIMG_0329_large_medium.JPG', 'https://www.youtube.com/watch?v=Kl5B6MBAntI', '1490868600000', '1490991600000', 50, 60, 'Male&Female', '0', 50, 100, NULL, '18.787357219859043', '98.98306024035264'),
(20, 1, 'xxdddd', 'Community', 'xxxx', 'http://image.priceprice.k-img.com/th/images/article/1145_TH_F_1/7.jpg', 'https://www.youtube.com/watch?v=Kl5B6MBAntI', '1490905200000', '1490991600000', 50, 60, 'Male&Female', '0', 60, 500, NULL, '18.784862591495227', '98.97416818115744'),
(21, 1, 'asdfdsfddsfsdf', 'Education', 'wdwgatehtrhyehytrgberngfbeb', 'http://www.autreplanete.com/ap-social-media-image-maker/ressources/img/img_format/google_img_fond_940x180.png', 'https://www.youtube.com/watch?v=lNT31qyWQa4', '1490905200000\r\n', '1490991600000', 10, 48, 'Male&Female', '0', 20, 500, NULL, 'undefined', 'undefined'),
(22, 1, 'test', 'art', 'test', 'https://img.purch.com/rc/360x240/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA1OS81Njkvb3JpZ2luYWwvbW9vbi1wbGFuZS1wZXJmZWN0LXRpbWluZy1icmlhbi1vdHR1bS05eDkuanBn', 'undefined', '1490905200000', '1490991600000', 50, 50, 'Male&Female', '0', 47, 50, NULL, 'undefined', 'undefined'),
(23, 1, 'Test Sport', 'Sport&Fitness', 'TestSport', 'https://a.fastcompany.net/multisite_files/fastcompany/poster/2016/11/3065452-poster-3065452-p-1-nine-steps-to-glory.jpg', 'https://www.youtube.com/watch?v=FM7MFYoylVs', '1490905200000', '1490991600000', 20, 60, 'Male', '0', 50, 500, NULL, 'undefined', 'undefined'),
(24, 1, 'TestSSSPORT', 'Sport&Fitness', 'TESTTESTTEST', 'http://www.bodycap-medical.com/images/32/usage-sport.jpg', 'https://www.youtube.com/watch?v=FM7MFYoylVs', '1490868600000', '1490905200000', 20, 60, 'None', '0', 20, 5000, NULL, 'undefined', 'undefined');

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

--
-- Dumping data for table `join_event`
--

INSERT INTO `join_event` (`EVENT_ID`, `MEMBER_ID`) VALUES
(1, 1),
(2, 1);

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

--
-- Dumping data for table `support`
--

INSERT INTO `support` (`SUPPORT_ID`, `LOCATION_NAME`, `CATEGORY`, `DETAIL`, `PICTURE`, `ADDRESS_lat`, `ADDRESS_lng`) VALUES
(1, 'test1', 'test', NULL, NULL, '18.795645297142208', '98.95281136035919'),
(2, 'test2', 'test', NULL, NULL, '18.795645297142208', '98.95281136035919');

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
  ADD PRIMARY KEY (`EVENT_ID`),
  ADD UNIQUE KEY `EVENT_NAME` (`EVENT_NAME`);

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
  MODIFY `EVENT_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `join_event`
--
ALTER TABLE `join_event`
  MODIFY `EVENT_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
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
  MODIFY `SUPPORT_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `ID_TICKET` int(10) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

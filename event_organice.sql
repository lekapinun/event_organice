-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2017 at 09:27 PM
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
('ART'),
('BUSINESS'),
('CHARITY&CAUSES'),
('COMMUNITY'),
('EDUCATION'),
('FASHION'),
('FILM&MEDIA'),
('FOOD&DRINK'),
('LIFESTYLE'),
('MUSIC'),
('SCIENCE&TECHNOLOGY'),
('SPORT&FITNESS');

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
  `LOCATION_lng` varchar(20) DEFAULT NULL,
  `TIME` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`EVENT_ID`, `OWNER_ID`, `EVENT_NAME`, `CATEGORY`, `DETAIL`, `PICTURE`, `VIDEO`, `TIME_START_E`, `TIME_END_E`, `CONDITION_MIN_AGE`, `CONDITION_MAX_AGE`, `CONDITION_SEX`, `SOLD_OUT_SEAT`, `MAX_SEAT`, `PRICE`, `PROMOTE_E_ID`, `LOCATION_lat`, `LOCATION_lng`, `TIME`) VALUES
(1, 1, 'Dead by Daylight Tournament!', 'Sport&Fitness', 'Deathly is not the end.', 'https://www.goonvpn.com/uploads/DBD-5.jpg', 'https://www.youtube.com/embed/CmTmyd4CPQ0', '1493730000420', '1493737200420', 17, 60, 'None', '0', 40, 200, 1, '18.791478456337572', ' 98.95407736301422', '1491017994000'),
(2, 1, 'Winning PES 2017', 'Sport&Fitness', 'PES 2017 Tournament', 'https://www.konami.com/kde_cms/eu_publish/uploads/pes2017andy-1024x576.jpg', 'https://www.youtube.com/embed/noCFYWBF6vE', '1493712000420', '1493722800420', 0, 100, 'Male & Female', '0', 100, 200, NULL, '18.787357219859043', '98.98306024035264', '1491017994000'),
(3, 1, 'Pool Party', 'Community', 'สนุกสนานและหรรษาไปกับหนุ่มๆกับชุดว่ายน้ำกระจิ๊วหลิ่ว ในคืนส่งท้ายปีเก่า ต้อนรับปีใหม่', 'http://friendsoffredco.org/wp-content/uploads/2016/08/pool-party.jpg', 'https://www.youtube.com/embed/gwFC7HNpQ9M', '1493722800420', '1493722800420', 18, 40, 'Female', '0', 50, 5000, NULL, '18.787357219859043', '98.98306024035264', '1591017994000'),
(19, 1, 'xxxxxxxxxxxxxxxxxx', 'Community', 'xxx', 'http://media.kids-myshot.nationalgeographic.com/2012/09/50633ec87f60bIMG_0329_large_medium.JPG', 'https://www.youtube.com/embed/gwFC7HNpQ9M', '1496790000420', '1496826000420', 50, 60, 'Male&Female', '0', 50, 100, NULL, '18.787357219859043', '98.98306024035264', '1491017994000'),
(20, 1, 'xxdddd', 'Community', 'xxxx', 'http://image.priceprice.k-img.com/th/images/article/1145_TH_F_1/7.jpg', 'https://www.youtube.com/embed/gwFC7HNpQ9M', '1496790000420', '1496826000420', 50, 60, 'Male&Female', '0', 60, 500, NULL, '18.784862591495227', '98.97416818115744', '1491017994000'),
(21, 1, 'asdfdsfddsfsdf', 'Education', 'wdwgatehtrhyehytrgberngfbeb', 'http://www.autreplanete.com/ap-social-media-image-maker/ressources/img/img_format/google_img_fond_940x180.png', 'https://www.youtube.com/embed/gwFC7HNpQ9M', '1496790000420', '1496826000420', 10, 48, 'Male&Female', '0', 20, 500, NULL, 'undefined', 'undefined', '1491017994000'),
(22, 1, 'test', 'Art', 'test', 'https://img.purch.com/rc/360x240/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzA1OS81Njkvb3JpZ2luYWwvbW9vbi1wbGFuZS1wZXJmZWN0LXRpbWluZy1icmlhbi1vdHR1bS05eDkuanBn', 'https://www.youtube.com/embed/gwFC7HNpQ9M', '1490905200000', '1490991600000', 50, 50, 'Male&Female', '0', 47, 50, NULL, 'undefined', 'undefined', '1491017994000'),
(23, 1, 'Test Sport', 'Sport&Fitness', 'TestSport', 'https://a.fastcompany.net/multisite_files/fastcompany/poster/2016/11/3065452-poster-3065452-p-1-nine-steps-to-glory.jpg', 'https://www.youtube.com/embed/gwFC7HNpQ9M', '1490905200000', '1490991600000', 20, 60, 'Male', '0', 50, 500, NULL, 'undefined', 'undefined', '1491017994000'),
(24, 1, 'TestSSSPORT', 'Sport&Fitness', 'TESTTESTTEST', 'http://www.bodycap-medical.com/images/32/usage-sport.jpg', 'https://www.youtube.com/embed/gwFC7HNpQ9M', '1490868600000', '1490905200000', 20, 60, 'None', '0', 20, 5000, NULL, 'undefined', 'undefined', '1491017994000'),
(25, 5, 'Rose is you!', 'Food&drink', 'undefined', 'https://upload.wikimedia.org/wikipedia/commons/5/51/Small_Red_Rose.JPG', 'https://www.youtube.com/embed/FyASdjZE0R0', '1496826000420', '1496826000420', 18, 60, 'Female', '0', 15, 500, NULL, '18.791478456337572', '98.95407736301422', '1491017994000'),
(26, 7, 'got7', 'Art', 'งานศิลปะกับผู้ชาย', 'https://static.isamare.net/uploads/sites/11/2016/08/Got7-cover-1068x501.jpg', 'https://www.youtube.com/embed/IZ1t7CwfvEc', '1525111200420', '1525111260420', 5, 80, 'None', '0', 1000, 6500, NULL, '18.795645297142208', '98.95280599594116', '1491277194000'),
(27, 8, 'Party', 'Art', 'party', 'http://demos.techbeeo.com/construction-plus/images/profile3.jpg', 'https://www.youtube.com/embed/IZ1t7CwfvEc', '1491980400420', '1492102740420', 18, 22, 'None', '0', 50, 200, NULL, 'undefined', 'undefined', '1491277194000'),
(28, 10, 'Cry With ME (CWM)', 'Art', 'Museums are believed to house art\'s best masterpieces thoughtfully composed by the most talented of people. That\'s why a Massachusetts gallery that specializes in bad art is gaining traction. Bill Geist visited the Museum of Bad Art in Somerville, Mass., and took a look at their priceless collection.', 'https://art.lallabi.com/images/5.jpg', 'https://www.youtube.com/embed/p6ATZYv61IY', '1498809600420', '1498831200420', 20, 99, 'None', '0', 50, 5000, NULL, '18.79025199909113', '98.98733139038086', '1493292094649'),
(29, 10, 'STREET ART', 'Art', 'Street art is visual art created in public locations, usually unsanctioned artwork executed outside of the context of traditional art venues. The term gained popularity during the graffiti art boom of the early 1980s and continues to be applied to subsequent incarnations. Stencil graffiti, wheatpasted poster art or sticker art, and street installation or sculpture are common forms of modern street art. Video projection, yarn bombing and Lock On sculpture became popularized at the turn of the 21st century.', 'https://static.pexels.com/photos/38981/pexels-photo-38981.jpeg', 'https://www.youtube.com/embed/MAChlYYeGfo', '1502967600420', '1502985600420', 25, 60, 'None', '0', 40, 500, NULL, '18.787357219859043', '98.98306024035264', '1493316781866'),
(30, 10, 'GWA (Girl With Art)', 'Art', 'Girl with a Pearl Earring is an oil painting by 17th-century Dutch painter Johannes Vermeer. ... has recreated the painting as a mural in Bristol, replacing the pearl earring with an alarm box and calling the artwork Girl with a Pierced Eardrum.', 'http://www.wacom.com/-/media/wacomdotcom/images/products/pen-tablets/intuos-art/intuos-art-02.jpg?h=964&la=th&w=1440&hash=667787BFDF31EA6F086FB0E0F25DC1DFE862712C', 'https://www.youtube.com/embed/INmtDnEUxcA', '1495087200420', '1495094400420', 10, 70, 'Female', '0', 50, 469, NULL, '18.787357219859043', '98.98306024035264', '1493317192954'),
(31, 10, 'ARTRIC', 'Art', 'We exist to inspire the world through Play. Electronic Arts is a leading publisher of games on Console, PC and Mobile.', 'http://images.gawker.com/rtnd7higzb4ripnoomd7/c_scale,fl_progressive,q_80,w_800.png', 'https://www.youtube.com/embed/H2lODEn_5HE', '1496199600420', '1496221200420', 20, 77, 'None', '0', 30, 200, NULL, '18.787357219859043', '98.98306024035264', '1493317417117'),
(32, 10, 'SWIM IN HEART', 'Sport&Fitness', 'Swimming is an individual or team sport that involves using arms and legs to move the body through water. Typically, the sport takes place in pools', 'https://lh3.googleusercontent.com/LIGIVlW2KeFS6RdHPLYEg88NHTGznIjsZvQyNV7xLgnUFP7biAd8dHz7s72bQJt1qA=h900', 'https://www.youtube.com/embed/H1NFGz_7M_s', '1493521200420', '1493550000420', 1, 120, 'None', '0', 50, 0, NULL, '18.98306024035264', '98.98306024035264', '1493317663443'),
(33, 10, 'We are extreamer', 'Sport&Fitness', 'Extreme sports is a popular term for certain activities perceived as involving a high degree of risk. These activities', 'http://wallpapercave.com/wp/tChZlNB.jpg', 'https://www.youtube.com/embed/uAz9hZmcr58', '1495072800420', '1495267200420', 25, 60, 'None', '0', 10, 1000, NULL, '18.787357219859043', '98.98306024035264', '1493317890569'),
(34, 10, 'Wake sport in your heart up', 'Sport&Fitness', 'Sport (British English) or sports (American English), are all usually forms of competitive physical activity or games which, through casual or organised ...', 'http://wallpapercave.com/wp/8XxOZzE.jpg', 'https://www.youtube.com/embed/yeiXrvqeyFU', '1496880000420', '1496916000420', 10, 99, 'None', '0', 30, 0, NULL, '18.787357219859043', '98.98306024035264', '1493318442170'),
(35, 10, 'LET START MUSIC with OUR SPORT', 'Sport&Fitness', 'undefined', 'http://img11.nnm.me/1/f/b/d/8/aebfb820c55ebac48b211761cfa.jpg', 'https://www.youtube.com/embed/flS8P4RL2IU', '1496790000420', '1496826000420', 25, 50, 'None', '0', 50, 269, NULL, '18.787357219859043', '98.98306024035264', '1493318647246'),
(36, 7, 'Grow together by TARIKA', 'Business', 'A business is an organization or enterprising entity engaged in commercial, industrial or professional activities. A company transacts business activities through the production of a good, offering of a service or retailing of already manufactured products. A business can be a for-profit entity or a nonprofit organization that operates to fulfill a charitable mission.  Read more: Business http://www.investopedia.com/terms/b/business.asp#ixzz4fThTDopL  Follow us: Investopedia on Facebook', 'http://www.businessnewsdaily.com/images/i/000/007/874/original/free-business-plan-templates.jpg?1421856207', 'https://www.youtube.com/embed/Pd5MZIpEg4s', '1493503200420', '1493557200420', 30, 60, 'None', '0', 10, 5000, NULL, '18.787357219859043', '98.98306024035264', '1493319710138'),
(37, 7, 'B Tari', 'Business', 'A great Seminar on how to get a business going without having to spend a lot of money. Justis talks about how its possible to use what he calls the three "S\'s" to create successful small businesses that do what you want them to do...in other words make you money and give you freedom rather than taking money and time away from you.', 'http://www.advantagebusinessvaluations.com/wp-content/uploads/2015/08/slide3.jpg', 'https://www.youtube.com/embed/aMIESSL6W60', '1503043200420', '1503064800420', 25, 69, 'None', '0', 20, 699, NULL, '18.787357219859043', '98.98306024035264', '1493320191123'),
(38, 7, 'Forex Girl', 'Business', 'Whether you are new or experienced trader the amount of knowledge and tips you can gain through video tutorials has no match. Subscribe to my channel to get updates on forex tutorial video,currency trading video,forex trading video,forex trading for beginners video tutorial,forex trading tutorial video,excellent beginners video forex course,trading video,day trading video,day trading strategies video,forex video tutorial,forex trading video tutorial,options trading tutorial video,forex video course,options trading video,currency trading video tutorial,forex training video,options trading video tutorial,learn options trading video,video trading block,forex video training,option trading video,forex video tutorials,forex video,stock trading tutorial video,trading video tutorials,forex trading video tutorials,stock trading video', 'http://study.com/cimages/course-image/praxis-ii-business-education-test_118084_large.jpg', 'https://www.youtube.com/embed/np0u1q7nOro', '1494612000420', '1494691200420', 1, 120, 'Female', '0', 3, 6969, NULL, '18.787357219859043', '98.98306024035264', '1493320569446'),
(39, 7, 'Forex Male', 'Business', 'Astrofx help answer one of the most popular questions within the forex and trading market "How much can i make" . We breakdown the perspective of the average trader and compare it with a real investing psychology and mind frame. This methodology has so far only been for Astrofx Students... but now its out there for you for FREE.', 'https://image.jimcdn.com/app/cms/image/transf/none/path/s642d245f213c1fd7/image/ia7a522ed31309a7c/version/1485226395/image.jpg', 'https://www.youtube.com/embed/TB1GkjoAp2k', '1495562400420', '1495641600420', 20, 30, 'Male', '0', 69, 6969, NULL, '18.7902742', '99.00055229999998', '1493320886548'),
(40, 1, 'I JUST SUED THE SCHOOL SYSTEM !!!', 'Education', 'How do YOU think we can create a better future of learning. Go here and share your thoughts on the topic! http://www.bit.ly/2ciqj4z', 'https://i.ytimg.com/vi/dqTTojTija8/maxresdefault.jpg', 'https://www.youtube.com/embed/dqTTojTija8', '1493521200420', '1493535600420', 1, 120, 'None', '0', 100, 0, NULL, '18.80828739999999', '98.95467580000002', '1493321096775'),
(41, 1, 'EDUCATION WEAPON', 'Education', 'Education is the most powerful weapon which you can use to change the world." - Nelson Mandela quotes from BrainyQuote.com', 'http://www.lifevestinside.com/wp-content/uploads/2014/02/powerful-education.jpg', 'https://www.youtube.com/embed/x9I8DsFTa1s', '1507708800420', '1507719600420', 10, 58, 'None', '0', 24, 0, NULL, '16.8090601', '100.27140140000006', '1493321492636'),
(42, 2, 'The way we think about charity is dead wrong', 'Charity&Causes', 'Activist and fundraiser Dan Pallotta calls out the double standard that drives our broken relationship to charities. Too many nonprofits, he says, are rewarded for how little they spend', 'http://www.chris-cancercommunity.com/wp-content/uploads/Things-to-Consider-before-Deciding-Where-to-Donate.jpg', 'https://www.youtube.com/embed/bfAzi6D5FpM', '1497499200420', '1497506400420', 1, 120, 'None', '0', 20, 0, NULL, '18.7885981', '98.98132420000002', '1493322163964'),
(43, 2, 'Giving Unchained', 'Charity&Causes', 'The blockchain is the decentralised, shared public ledger at the heart of Bitcoin and other cryptocurrencies, but it also has far wider applications. This video looks at the role blockchain technology could play in boosting transparency and trust in charities', 'https://ice3x.co.za/wp-content/uploads/2016/08/blockchain-charity-1.jpg', 'https://www.youtube.com/embed/P-V7PCgyJBY', '1494651600420', '1494662400420', 5, 50, 'None', '0', 50, 0, NULL, '14.0666954', '100.64723449999997', '1493322338830'),
(44, 2, 'The charity water story', 'Charity&Causes', 'Ten years ago, former nightclub promoter Scott Harrison set out to solve the water crisis in his lifetime.  Today, more than one million people have made it their mission too. This is all of our story.', 'http://www.dutiee.com/wp-content/uploads/charitywater.png', 'https://www.youtube.com/embed/UE9UvT5ujyg', '1493542800420', '1493553600420', 10, 100, 'None', '0', 100, 0, NULL, '13.7854', '100.53909040000008', '1493322471213'),
(45, 2, 'The future of education', 'Education', 'Sajan is the Founder & CEO of Matchbook Learning, a national non-profit school turnaround management organization that has designed and implemented a unique blended model of school', 'http://res.cloudinary.com/www-virgin-com/virgin-com-prod/sites/virgin.com/files/Articles/Getty/finland_education_getty_0.jpg', 'https://www.youtube.com/embed/Ah-SmLEMgis', '1494576000420', '1494586800420', 10, 100, 'None', '0', 200, 200, NULL, '17.4906563', '101.7160285', '1493323165837'),
(46, 3, 'Victoria secret fashion show', 'Fashion', 'LADY GAGA Coming', 'http://www.bravotv.com/sites/nbcubravotv/files/field_blog_image/2016/12/dish-120616-gaga-gigi.jpg', 'https://www.youtube.com/embed/6Ooj2W68_m8', '1493521200420', '1493550000420', 25, 100, 'None', '0', 150, 5000, NULL, '18.80828739999999', '98.95467580000002', '1493323978469'),
(47, 3, 'Dolce&Gabbana Summer', 'Fashion', 'The Dolce&Gabbana Women Summer 2015 collection is inspired by the heritage of the Spanish culture on Sicily’s history', 'https://i.ytimg.com/vi/CqiT2zEFiNU/maxresdefault.jpg', 'https://www.youtube.com/embed/CqiT2zEFiNU', '1494576000420', '1494586800420', 10, 100, 'None', '0', 100, 500, NULL, '18.80828739999999', '98.95467580000002', '1493324212628'),
(48, 3, 'THE BEST OF NEW YORK FASHION WEEK', 'Fashion', '"THE BEST OF NEW YORK FASHION WEEK" Day 8 by Fashion Channel', 'http://assets.nydailynews.com/polopoly_fs/1.1936913.1410475496!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/new-york-fashion-week-day-8.jpg', 'https://www.youtube.com/embed/voKbfmoiN_Q', '1493712000420', '1493722800420', 20, 70, 'None', '0', 250, 509, NULL, '18.80828739999999', '98.95467580000002', '1493324349519'),
(49, 10, 'เทศกาลอาหาร 4 ภาค', 'Food&drink', 'ของสดใหม่ อร่อยทุกวัน', 'http://www.asawannhotel.com/image/mypic_customize/4%20%C0%D2%A410x1.jpg', 'undefined', '1493499600420', '1493827200420', 0, 120, 'None', '0', 1000, 0, NULL, '17.872837', '102.74293599999999', '1493325524426'),
(50, 10, 'EST with GOT7', 'Food&drink', 'est เพิ่มดีกรีความซ่าสุดขั้ว เปิดตัวโฆษณาใหม่ล่าสุด est ซ่าซี้ดสุดขั้ว กับ GOT7 พา GOT7 ไปเติมความซ่าพร้อมเครื่องดื่มใหม่สุดซี้ด est Korean Orange Cola เครื่องดื่มโคล่าผสมกลิ่นส้ม รับรองว่างานนี้ซ่าซี้ดสุดขั้วถึงใจแน่นอน!!', 'https://i.ytimg.com/vi/_yeCa2b2kbM/maxresdefault.jpg', 'https://www.youtube.com/embed/ZY1tFmhpUck', '1493938800420', '1493978400420', 18, 25, 'None', '0', 69, 6969, NULL, '13.7468189', '100.53492440000002', '1493325684375'),
(51, 1, 'ENTANEER CITY', 'Music', 'MUSIC FUN', 'https://i.ytimg.com/vi/YEEHCcijCQ8/maxresdefault.jpg', 'https://www.youtube.com/embed/N0bLsaRNsM4', '1493809200420', '1493830500420', 15, 75, 'None', '0', 2500, 0, NULL, '18.795645', '98.952812', '1493325917967'),
(52, 1, 'Big mountain music festival 2018', 'Music', 'มันใหญ่มาก', 'http://www.amazingthaitour.com/wp-content/uploads/2016/08/14224845_10153330222399364_5849309872491863275_n.jpg', 'https://www.youtube.com/embed/CyX485Z1lkw', '1512878400420', '1512997200420', 18, 90, 'None', '0', 1000, 1500, NULL, '14.4232193', '101.38718629999994', '1493326105205'),
(53, 1, 'Good For You', 'Music', 'Good For You by THBD (Royalty Free Music)', 'http://www.aspersnorthampton.co.uk/imgmin/backgrounds/Live-Music.jpg', 'https://www.youtube.com/embed/-K_YSjqKgvQ', '1495008000420', '1495026000420', 10, 70, 'None', '0', 50, 500, NULL, '18.80828739999999', '98.95467580000002', '1493326253588'),
(54, 10, 'ถ่ายหนังสั้น by TT', 'Film&Media', 'undefined', 'http://www.dbs.ie/images/default-source/website-2016/film.jpg?sfvrsn=3&MaxWidth=680&MaxHeight=&ScaleUp=false&Quality=High&Method=ResizeFitToAreaArguments&Signature=61246AA5A63C46874BC534EC56A7E6A2CD16E29F', 'https://www.youtube.com/embed/S2aEH6ND5_Y', '1495094400420', '1500364800420', 20, 50, 'None', '0', 10, 0, NULL, '13.8418952', '100.49615270000004', '1493326615920'),
(55, 5, 'CGI Animated Short Film HD', 'Film&Media', 'CGI Animated Dust Buddies Short Film by Beth Tomashek & Sam Wade from Ringling college of art and design.', 'https://s-media-cache-ak0.pinimg.com/originals/84/77/19/847719387d5bfb70a5863e0f07732337.jpg', 'https://www.youtube.com/embed/mZ6eeAjgSZI', '1493971200420', '1493982000420', 30, 40, 'None', '0', 25, 500, NULL, '32.9567043', '-94.99744609999999', '1493326816627'),
(56, 5, 'CGI Animated Spot HD', 'Film&Media', 'CGI Animated Spot Audi – The Doll that Chose to Drive by Post23.', 'https://i.ytimg.com/vi/pWvu7PARJog/maxresdefault.jpg', 'https://www.youtube.com/embed/H_7G4hPQpe8', '1495612800420', '1495627200420', 10, 30, 'None', '0', 50, 500, NULL, '18.792658', '98.95305899999994', '1493326934752'),
(57, 6, 'Renewable Energy - BBC', 'Science&Technology', 'Renewable Energy - BBC Technology Documentary NEW+ Science Documentary', 'https://ichef-1.bbci.co.uk/news/660/cpsprodpb/8827/production/_95455843_solarfarm_pa.jpg', 'https://www.youtube.com/embed/UgZmsphn510', '1493694000420', '1493726400420', 20, 70, 'None', '0', 50, 4000, NULL, '34.0984682', '-118.32585', '1493327173475'),
(58, 6, 'Amazing Technologies', 'Science&Technology', 'Top 10 most Amazing Technologies', 'http://4.bp.blogspot.com/-KBzM1JN2G90/VikbfE8bolI/AAAAAAAAAdQ/MpbZAqxxUAw/s1600/Top%2B10%2Bmost%2BAmazing%2BTechnologies%2BTechnology%2BWorld%2B2015.jpg', 'https://www.youtube.com/embed/tqKpk1wABuI', '1493427600420', '1493463600420', 18, 98, 'None', '0', 75, 500, NULL, '29.5528391', '-95.09318630000001', '1493327408543'),
(59, 6, 'Science & Technology - Expected Questions - UPSC/IAS', 'Science&Technology', 'Beat the competition with Study-IQ PEN DRIVE & TABLET courses, watch a Demo in HINDI and English, Call 95-8004-8004 or 7291059476 or visit - www.studyiq.in', 'https://i.ytimg.com/vi/RHQ1BcI2yKI/mqdefault.jpg', 'https://www.youtube.com/embed/RHQ1BcI2yKI', '1498014000420', '1498222800420', 20, 60, 'None', '0', 140, 4000, NULL, '18.7902742', '99.00055229999998', '1493327610080'),
(60, 8, 'Tips for Starting a Healthy Lifestyle!', 'Liftstyle', 'YAY! Thumbs up for more health style videos! :) let start off this new year healthy & happy! CLICK HERE FOR MORE HEALTH TIPS!', 'https://i.ytimg.com/vi/WyHWmZk-bk8/maxresdefault.jpg', 'https://www.youtube.com/embed/0aNNYEUARAk', '1494730800420', '1494738000420', 10, 50, 'None', '0', 50, 0, NULL, '13.797722', '100.04995229999997', '1493327858955'),
(61, 8, 'แต่งหน้าเอามันส์ #Feeling blue', 'Liftstyle', 'สวัสดีค่าาา สวัสดีคุณผู้ชมโมเมพาเพลินนะคะ ในซีรีย์ ‘แต่งหน้าเอามันส์’ ต้องไปให้สุดค่ะคุณผู้ชม วันนี้โมเมจะมาแต่งในลุคแบบฝรั่งที่จัดว่าแน่นเลยทีเดียวนะคะ ไปเริ่มกันเลยดีกว่านะคะ', 'https://i.ytimg.com/vi/uisgjU7PUg8/maxresdefault.jpg', 'https://www.youtube.com/embed/XrJT8m9csX0', '1493542800420', '1493557200420', 18, 60, 'Female', '0', 10, 0, NULL, '13.7610283', '100.62152719999995', '1493328071532'),
(62, 8, 'มาว่ายน้ำด้วยกันนะ', 'Liftstyle', 'undefined', 'https://i.ytimg.com/vi/yDas5SKCXB8/maxresdefault.jpg', 'https://www.youtube.com/embed/PDwdm7EWFmU', '1497582000420', '1497589200420', 9, 29, 'None', '0', 12, 0, NULL, '12.684102', '101.27257099999997', '1493328236586');

-- --------------------------------------------------------

--
-- Table structure for table `following`
--

CREATE TABLE `following` (
  `MEMBER_ID` int(10) NOT NULL,
  `FOLLOWING_ID` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `following`
--

INSERT INTO `following` (`MEMBER_ID`, `FOLLOWING_ID`) VALUES
(2, 1),
(1, 2),
(1, 7),
(1, 10),
(10, 1),
(7, 10),
(2, 10),
(6, 3),
(6, 7);

-- --------------------------------------------------------

--
-- Table structure for table `join_event`
--

CREATE TABLE `join_event` (
  `EVENT_ID` int(10) NOT NULL,
  `MEMBER_ID` int(10) NOT NULL,
  `TIME` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `join_event`
--

INSERT INTO `join_event` (`EVENT_ID`, `MEMBER_ID`, `TIME`) VALUES
(2, 2, '1491017994000'),
(1, 2, '1491017994000'),
(37, 1, '1493321262821'),
(1, 10, '1493314044867'),
(28, 1, '1493293296823'),
(31, 1, '1493321283321'),
(33, 1, '1493321651545'),
(32, 1, '1493321678576'),
(36, 10, '1493321832449'),
(33, 2, '1493321863959'),
(35, 2, '1493323253616'),
(46, 7, '1493324372473');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `MEMBER_ID` int(10) NOT NULL,
  `USERNAME` varchar(20) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  `FNAME` varchar(30) DEFAULT NULL,
  `LNAME` varchar(30) DEFAULT NULL,
  `SEX` varchar(6) DEFAULT NULL,
  `BIRTH_DATE` date DEFAULT NULL,
  `E-MAIL` varchar(50) DEFAULT NULL,
  `PHONE` varchar(10) DEFAULT NULL,
  `CREDIT_CARD` varchar(20) DEFAULT NULL,
  `URL_IMG` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`MEMBER_ID`, `USERNAME`, `PASSWORD`, `FNAME`, `LNAME`, `SEX`, `BIRTH_DATE`, `E-MAIL`, `PHONE`, `CREDIT_CARD`, `URL_IMG`) VALUES
(1, 'Thomas', 'gik', 'Thomas', 'Json', 'Male', '1996-01-20', 'lekapinun@gmail.com', '0801239340', '123', 'http://i.amz.mshcdn.com/-pZBHfmrxzlxGF_5zMEs82QoJzg=/fit-in/850x850/http%3A%2F%2Fmashable.com%2Fwp-content%2Fgallery%2Fcauses-people-changed-their-profile-pictures-for%2F9591711465_880c55c0b6_o.jpg'),
(2, 'admin', '1234', 'test', 'test', 'male', '1990-01-19', 'test@test.com', '123456789', '1234', 'https://s-media-cache-ak0.pinimg.com/736x/90/bc/51/90bc511f48b2793100f280d4f87e17c0.jpg'),
(3, 'testLek', 'gvv', 'Lek', 'Kel', 'Male', '1990-02-20', 'testLek@test.com', '0801234567', '1234', 'https://res.cloudinary.com/skiomusic-com-prod/image/upload/c_fill,d_profile_default_v2.jpg/v1461184673/profiles/7226/profile_image'),
(4, 't', 't', 't', 't', 'Female', '1950-01-01', 't@t.com', '1', '1', 'https://scontent-fbkk5-7.us-fbcdn.net/v1/t.1-48/1426l78O9684I4108ZPH0J4S8_842023153_K1DlXQOI5DHP/dskvvc.qpjhg.xmwo/w/data/1018/1018669-img.scjpoi.2p.jpg'),
(5, 'Nek', '0', 'Nekrose', 'marry', 'Female', '1989-12-15', 'Nek@mail.com', '0801446969', 'undefined', 'https://s-media-cache-ak0.pinimg.com/736x/d2/07/f3/d207f3cf7b2d9668f5265da3b666e138.jpg'),
(6, 'coco', '1234', 'nono', 'lolo', 'Male', '1995-04-07', 'momo@event.com', '089456789', '55215564888888', 'http://demos.techbeeo.com/construction-plus/images/profile3.jpg'),
(7, 'tarika', '123', 'tarika', 'rang', 'Female', '1996-01-01', 'tarika@event.com', '099', '000', 'https://s-media-cache-ak0.pinimg.com/736x/aa/3c/d3/aa3cd30bc11dc661444f1978349d0ccf.jpg'),
(8, 'jennb', '1234', 'plaifah', 'atthapaibul', 'Female', '1996-01-11', 'jennb@gmail.com', '0888888888', '123456789', 'https://68.media.tumblr.com/avatar_0cd512e99a47_128.png'),
(10, 'TT_TT', 'T', 'undefined', 'undefined', 'Male', '2000-04-26', 'TT@event.com', 'undefined', 'undefined', 'http://www.src.gov.jm/wp-content/uploads/2013/07/Unknown_male.jpg');

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
  MODIFY `EVENT_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `MEMBER_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
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

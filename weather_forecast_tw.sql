-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020-07-21 21:13:58
-- 伺服器版本： 8.0.20
-- PHP 版本： 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `weather_forecast_tw`
--
CREATE DATABASE IF NOT EXISTS `weather_forecast_tw` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `weather_forecast_tw`;

-- --------------------------------------------------------

--
-- 資料表結構 `counties48`
--

DROP TABLE IF EXISTS `counties48`;
CREATE TABLE `counties48` (
  `ID` smallint NOT NULL,
  `countyCode` char(5) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `Wx` varchar(15) NOT NULL,
  `AT` tinyint NOT NULL,
  `T` tinyint NOT NULL,
  `RH` tinyint NOT NULL,
  `CI` varchar(15) NOT NULL,
  `WeatherDescription` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `counties48pop6h`
--

DROP TABLE IF EXISTS `counties48pop6h`;
CREATE TABLE `counties48pop6h` (
  `ID` smallint NOT NULL,
  `countyCode` char(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `PoP6h` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `counties168`
--

DROP TABLE IF EXISTS `counties168`;
CREATE TABLE `counties168` (
  `ID` smallint NOT NULL,
  `countyCode` char(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `T` tinyint NOT NULL,
  `RH` tinyint NOT NULL,
  `MinCI` tinyint NOT NULL,
  `MaxAT` tinyint NOT NULL,
  `Wx` varchar(15) NOT NULL,
  `MaxCI` tinyint NOT NULL,
  `MinT` tinyint NOT NULL,
  `WeatherDescription` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `MinAT` tinyint NOT NULL,
  `MaxT` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 替換檢視表以便查看 `counties168countyname`
-- (請參考以下實際畫面)
--
-- DROP VIEW IF EXISTS `counties168countyname`;
-- CREATE TABLE `counties168countyname` (
-- `ID` smallint
-- ,`countyCode` char(7)
-- ,`startTime` datetime
-- ,`endTime` datetime
-- ,`T` tinyint
-- ,`RH` tinyint
-- ,`MinCI` tinyint
-- ,`MaxAT` tinyint
-- ,`Wx` varchar(15)
-- ,`MaxCI` tinyint
-- ,`MinT` tinyint
-- ,`WeatherDescription` varchar(127)
-- ,`MinAT` tinyint
-- ,`MaxT` tinyint
-- ,`countyName` varchar(7)
-- );

-- --------------------------------------------------------

--
-- 資料表結構 `counties168pop12h`
--

DROP TABLE IF EXISTS `counties168pop12h`;
CREATE TABLE `counties168pop12h` (
  `ID` smallint NOT NULL,
  `countyCode` char(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `PoP12h` tinyint
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `countycode2countyname`
--

DROP TABLE IF EXISTS `countycode2countyname`;
CREATE TABLE `countycode2countyname` (
  `countyCode` char(5) NOT NULL,
  `countyName` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `countycode2countyname`
--

INSERT INTO `countycode2countyname` (`countyCode`, `countyName`) VALUES
('09007', '連江縣'),
('09020', '金門縣'),
('10002', '宜蘭縣'),
('10004', '新竹縣'),
('10005', '苗栗縣'),
('10007', '彰化縣'),
('10008', '南投縣'),
('10009', '雲林縣'),
('10010', '嘉義縣'),
('10013', '屏東縣'),
('10014', '臺東縣'),
('10015', '花蓮縣'),
('10016', '澎湖縣'),
('10017', '基隆市'),
('10018', '新竹市'),
('10020', '嘉義市'),
('63', '臺北市'),
('64', '高雄市'),
('65', '新北市'),
('66', '臺中市'),
('67', '臺南市'),
('68', '桃園市');

-- --------------------------------------------------------

--
-- 資料表結構 `towncode2townname`
--

DROP TABLE IF EXISTS `towncode2townname`;
CREATE TABLE `towncode2townname` (
  `townCode` char(7) NOT NULL,
  `townName` varchar(7) NOT NULL,
  `countyCode` char(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 傾印資料表的資料 `towncode2townname`
--

INSERT INTO `towncode2townname` (`townCode`, `townName`, `countyCode`) VALUES
('0900701', '南竿鄉', '09007'),
('0900702', '北竿鄉', '09007'),
('0900703', '莒光鄉', '09007'),
('0900704', '東引鄉', '09007'),
('0902001', '金城鎮', '09020'),
('0902002', '金沙鎮', '09020'),
('0902003', '金湖鎮', '09020'),
('0902004', '金寧鄉', '09020'),
('0902005', '烈嶼鄉', '09020'),
('0902006', '烏坵鄉', '09020'),
('1000201', '宜蘭市', '10002'),
('1000202', '羅東鎮', '10002'),
('1000203', '蘇澳鎮', '10002'),
('1000204', '頭城鎮', '10002'),
('1000205', '礁溪鄉', '10002'),
('1000206', '壯圍鄉', '10002'),
('1000207', '員山鄉', '10002'),
('1000208', '冬山鄉', '10002'),
('1000209', '五結鄉', '10002'),
('1000210', '三星鄉', '10002'),
('1000211', '大同鄉', '10002'),
('1000212', '南澳鄉', '10002'),
('1000401', '竹北市', '10004'),
('1000402', '竹東鎮', '10004'),
('1000403', '新埔鎮', '10004'),
('1000404', '關西鎮', '10004'),
('1000405', '湖口鄉', '10004'),
('1000406', '新豐鄉', '10004'),
('1000407', '芎林鄉', '10004'),
('1000408', '橫山鄉', '10004'),
('1000409', '北埔鄉', '10004'),
('1000410', '寶山鄉', '10004'),
('1000411', '峨眉鄉', '10004'),
('1000412', '尖石鄉', '10004'),
('1000413', '五峰鄉', '10004'),
('1000501', '苗栗市', '10005'),
('1000502', '苑裡鎮', '10005'),
('1000503', '通霄鎮', '10005'),
('1000504', '竹南鎮', '10005'),
('1000505', '頭份市', '10005'),
('1000506', '後龍鎮', '10005'),
('1000507', '卓蘭鎮', '10005'),
('1000508', '大湖鄉', '10005'),
('1000509', '公館鄉', '10005'),
('1000510', '銅鑼鄉', '10005'),
('1000511', '南庄鄉', '10005'),
('1000512', '頭屋鄉', '10005'),
('1000513', '三義鄉', '10005'),
('1000514', '西湖鄉', '10005'),
('1000515', '造橋鄉', '10005'),
('1000516', '三灣鄉', '10005'),
('1000517', '獅潭鄉', '10005'),
('1000518', '泰安鄉', '10005'),
('1000701', '彰化市', '10007'),
('1000702', '鹿港鎮', '10007'),
('1000703', '和美鎮', '10007'),
('1000704', '線西鄉', '10007'),
('1000705', '伸港鄉', '10007'),
('1000706', '福興鄉', '10007'),
('1000707', '秀水鄉', '10007'),
('1000708', '花壇鄉', '10007'),
('1000709', '芬園鄉', '10007'),
('1000710', '員林市', '10007'),
('1000711', '溪湖鎮', '10007'),
('1000712', '田中鎮', '10007'),
('1000713', '大村鄉', '10007'),
('1000714', '埔鹽鄉', '10007'),
('1000715', '埔心鄉', '10007'),
('1000716', '永靖鄉', '10007'),
('1000717', '社頭鄉', '10007'),
('1000718', '二水鄉', '10007'),
('1000719', '北斗鎮', '10007'),
('1000720', '二林鎮', '10007'),
('1000721', '田尾鄉', '10007'),
('1000722', '埤頭鄉', '10007'),
('1000723', '芳苑鄉', '10007'),
('1000724', '大城鄉', '10007'),
('1000725', '竹塘鄉', '10007'),
('1000726', '溪州鄉', '10007'),
('1000801', '南投市', '10008'),
('1000802', '埔里鎮', '10008'),
('1000803', '草屯鎮', '10008'),
('1000804', '竹山鎮', '10008'),
('1000805', '集集鎮', '10008'),
('1000806', '名間鄉', '10008'),
('1000807', '鹿谷鄉', '10008'),
('1000808', '中寮鄉', '10008'),
('1000809', '魚池鄉', '10008'),
('1000810', '國姓鄉', '10008'),
('1000811', '水里鄉', '10008'),
('1000812', '信義鄉', '10008'),
('1000813', '仁愛鄉', '10008'),
('1000901', '斗六市', '10009'),
('1000902', '斗南鎮', '10009'),
('1000903', '虎尾鎮', '10009'),
('1000904', '西螺鎮', '10009'),
('1000905', '土庫鎮', '10009'),
('1000906', '北港鎮', '10009'),
('1000907', '古坑鄉', '10009'),
('1000908', '大埤鄉', '10009'),
('1000909', '莿桐鄉', '10009'),
('1000910', '林內鄉', '10009'),
('1000911', '二崙鄉', '10009'),
('1000912', '崙背鄉', '10009'),
('1000913', '麥寮鄉', '10009'),
('1000914', '東勢鄉', '10009'),
('1000915', '褒忠鄉', '10009'),
('1000916', '臺西鄉', '10009'),
('1000917', '元長鄉', '10009'),
('1000918', '四湖鄉', '10009'),
('1000919', '口湖鄉', '10009'),
('1000920', '水林鄉', '10009'),
('1001001', '太保市', '10010'),
('1001002', '朴子市', '10010'),
('1001003', '布袋鎮', '10010'),
('1001004', '大林鎮', '10010'),
('1001005', '民雄鄉', '10010'),
('1001006', '溪口鄉', '10010'),
('1001007', '新港鄉', '10010'),
('1001008', '六腳鄉', '10010'),
('1001009', '東石鄉', '10010'),
('1001010', '義竹鄉', '10010'),
('1001011', '鹿草鄉', '10010'),
('1001012', '水上鄉', '10010'),
('1001013', '中埔鄉', '10010'),
('1001014', '竹崎鄉', '10010'),
('1001015', '梅山鄉', '10010'),
('1001016', '番路鄉', '10010'),
('1001017', '大埔鄉', '10010'),
('1001018', '阿里山鄉', '10010'),
('1001301', '屏東市', '10013'),
('1001302', '潮州鎮', '10013'),
('1001303', '東港鎮', '10013'),
('1001304', '恆春鎮', '10013'),
('1001305', '萬丹鄉', '10013'),
('1001306', '長治鄉', '10013'),
('1001307', '麟洛鄉', '10013'),
('1001308', '九如鄉', '10013'),
('1001309', '里港鄉', '10013'),
('1001310', '鹽埔鄉', '10013'),
('1001311', '高樹鄉', '10013'),
('1001312', '萬巒鄉', '10013'),
('1001313', '內埔鄉', '10013'),
('1001314', '竹田鄉', '10013'),
('1001315', '新埤鄉', '10013'),
('1001316', '枋寮鄉', '10013'),
('1001317', '新園鄉', '10013'),
('1001318', '崁頂鄉', '10013'),
('1001319', '林邊鄉', '10013'),
('1001320', '南州鄉', '10013'),
('1001321', '佳冬鄉', '10013'),
('1001322', '琉球鄉', '10013'),
('1001323', '車城鄉', '10013'),
('1001324', '滿州鄉', '10013'),
('1001325', '枋山鄉', '10013'),
('1001326', '三地門鄉', '10013'),
('1001327', '霧臺鄉', '10013'),
('1001328', '瑪家鄉', '10013'),
('1001329', '泰武鄉', '10013'),
('1001330', '來義鄉', '10013'),
('1001331', '春日鄉', '10013'),
('1001332', '獅子鄉', '10013'),
('1001333', '牡丹鄉', '10013'),
('1001401', '臺東市', '10014'),
('1001402', '成功鎮', '10014'),
('1001403', '關山鎮', '10014'),
('1001404', '卑南鄉', '10014'),
('1001405', '鹿野鄉', '10014'),
('1001406', '池上鄉', '10014'),
('1001407', '東河鄉', '10014'),
('1001408', '長濱鄉', '10014'),
('1001409', '太麻里鄉', '10014'),
('1001410', '大武鄉', '10014'),
('1001411', '綠島鄉', '10014'),
('1001412', '海端鄉', '10014'),
('1001413', '延平鄉', '10014'),
('1001414', '金峰鄉', '10014'),
('1001415', '達仁鄉', '10014'),
('1001416', '蘭嶼鄉', '10014'),
('1001501', '花蓮市', '10015'),
('1001502', '鳳林鎮', '10015'),
('1001503', '玉里鎮', '10015'),
('1001504', '新城鄉', '10015'),
('1001505', '吉安鄉', '10015'),
('1001506', '壽豐鄉', '10015'),
('1001507', '光復鄉', '10015'),
('1001508', '豐濱鄉', '10015'),
('1001509', '瑞穗鄉', '10015'),
('1001510', '富里鄉', '10015'),
('1001511', '秀林鄉', '10015'),
('1001512', '萬榮鄉', '10015'),
('1001513', '卓溪鄉', '10015'),
('1001601', '馬公市', '10016'),
('1001602', '湖西鄉', '10016'),
('1001603', '白沙鄉', '10016'),
('1001604', '西嶼鄉', '10016'),
('1001605', '望安鄉', '10016'),
('1001606', '七美鄉', '10016'),
('1001701', '中正區', '10017'),
('1001702', '七堵區', '10017'),
('1001703', '暖暖區', '10017'),
('1001704', '仁愛區', '10017'),
('1001705', '中山區', '10017'),
('1001706', '安樂區', '10017'),
('1001707', '信義區', '10017'),
('1001801', '東區', '10018'),
('1001802', '北區', '10018'),
('1001803', '香山區', '10018'),
('1002001', '東區', '10020'),
('1002002', '西區', '10020'),
('6300100', '松山區', '63'),
('6300200', '信義區', '63'),
('6300300', '大安區', '63'),
('6300400', '中山區', '63'),
('6300500', '中正區', '63'),
('6300600', '大同區', '63'),
('6300700', '萬華區', '63'),
('6300800', '文山區', '63'),
('6300900', '南港區', '63'),
('6301000', '內湖區', '63'),
('6301100', '士林區', '63'),
('6301200', '北投區', '63'),
('6400100', '鹽埕區', '64'),
('6400200', '鼓山區', '64'),
('6400300', '左營區', '64'),
('6400400', '楠梓區', '64'),
('6400500', '三民區', '64'),
('6400600', '新興區', '64'),
('6400700', '前金區', '64'),
('6400800', '苓雅區', '64'),
('6400900', '前鎮區', '64'),
('6401000', '旗津區', '64'),
('6401100', '小港區', '64'),
('6401200', '鳳山區', '64'),
('6401300', '林園區', '64'),
('6401400', '大寮區', '64'),
('6401500', '大樹區', '64'),
('6401600', '大社區', '64'),
('6401700', '仁武區', '64'),
('6401800', '鳥松區', '64'),
('6401900', '岡山區', '64'),
('6402000', '橋頭區', '64'),
('6402100', '燕巢區', '64'),
('6402200', '田寮區', '64'),
('6402300', '阿蓮區', '64'),
('6402400', '路竹區', '64'),
('6402500', '湖內區', '64'),
('6402600', '茄萣區', '64'),
('6402700', '永安區', '64'),
('6402800', '彌陀區', '64'),
('6402900', '梓官區', '64'),
('6403000', '旗山區', '64'),
('6403100', '美濃區', '64'),
('6403200', '六龜區', '64'),
('6403300', '甲仙區', '64'),
('6403400', '杉林區', '64'),
('6403500', '內門區', '64'),
('6403600', '茂林區', '64'),
('6403700', '桃源區', '64'),
('6403800', '那瑪夏區', '64'),
('6500100', '板橋區', '65'),
('6500200', '三重區', '65'),
('6500300', '中和區', '65'),
('6500400', '永和區', '65'),
('6500500', '新莊區', '65'),
('6500600', '新店區', '65'),
('6500700', '樹林區', '65'),
('6500800', '鶯歌區', '65'),
('6500900', '三峽區', '65'),
('6501000', '淡水區', '65'),
('6501100', '汐止區', '65'),
('6501200', '瑞芳區', '65'),
('6501300', '土城區', '65'),
('6501400', '蘆洲區', '65'),
('6501500', '五股區', '65'),
('6501600', '泰山區', '65'),
('6501700', '林口區', '65'),
('6501800', '深坑區', '65'),
('6501900', '石碇區', '65'),
('6502000', '坪林區', '65'),
('6502100', '三芝區', '65'),
('6502200', '石門區', '65'),
('6502300', '八里區', '65'),
('6502400', '平溪區', '65'),
('6502500', '雙溪區', '65'),
('6502600', '貢寮區', '65'),
('6502700', '金山區', '65'),
('6502800', '萬里區', '65'),
('6502900', '烏來區', '65'),
('6600100', '中區', '66'),
('6600200', '東區', '66'),
('6600300', '南區', '66'),
('6600400', '西區', '66'),
('6600500', '北區', '66'),
('6600600', '西屯區', '66'),
('6600700', '南屯區', '66'),
('6600800', '北屯區', '66'),
('6600900', '豐原區', '66'),
('6601000', '東勢區', '66'),
('6601100', '大甲區', '66'),
('6601200', '清水區', '66'),
('6601300', '沙鹿區', '66'),
('6601400', '梧棲區', '66'),
('6601500', '后里區', '66'),
('6601600', '神岡區', '66'),
('6601700', '潭子區', '66'),
('6601800', '大雅區', '66'),
('6601900', '新社區', '66'),
('6602000', '石岡區', '66'),
('6602100', '外埔區', '66'),
('6602200', '大安區', '66'),
('6602300', '烏日區', '66'),
('6602400', '大肚區', '66'),
('6602500', '龍井區', '66'),
('6602600', '霧峰區', '66'),
('6602700', '太平區', '66'),
('6602800', '大里區', '66'),
('6602900', '和平區', '66'),
('6700100', '新營區', '67'),
('6700200', '鹽水區', '67'),
('6700300', '白河區', '67'),
('6700400', '柳營區', '67'),
('6700500', '後壁區', '67'),
('6700600', '東山區', '67'),
('6700700', '麻豆區', '67'),
('6700800', '下營區', '67'),
('6700900', '六甲區', '67'),
('6701000', '官田區', '67'),
('6701100', '大內區', '67'),
('6701200', '佳里區', '67'),
('6701300', '學甲區', '67'),
('6701400', '西港區', '67'),
('6701500', '七股區', '67'),
('6701600', '將軍區', '67'),
('6701700', '北門區', '67'),
('6701800', '新化區', '67'),
('6701900', '善化區', '67'),
('6702000', '新市區', '67'),
('6702100', '安定區', '67'),
('6702200', '山上區', '67'),
('6702300', '玉井區', '67'),
('6702400', '楠西區', '67'),
('6702500', '南化區', '67'),
('6702600', '左鎮區', '67'),
('6702700', '仁德區', '67'),
('6702800', '歸仁區', '67'),
('6702900', '關廟區', '67'),
('6703000', '龍崎區', '67'),
('6703100', '永康區', '67'),
('6703200', '東區', '67'),
('6703300', '南區', '67'),
('6703400', '北區', '67'),
('6703500', '安南區', '67'),
('6703600', '安平區', '67'),
('6703700', '中西區', '67'),
('6800100', '桃園區', '68'),
('6800200', '中壢區', '68'),
('6800300', '大溪區', '68'),
('6800400', '楊梅區', '68'),
('6800500', '蘆竹區', '68'),
('6800600', '大園區', '68'),
('6800700', '龜山區', '68'),
('6800800', '八德區', '68'),
('6800900', '龍潭區', '68'),
('6801000', '平鎮區', '68'),
('6801100', '新屋區', '68'),
('6801200', '觀音區', '68'),
('6801300', '復興區', '68');

-- --------------------------------------------------------

--
-- 資料表結構 `towns48`
--

DROP TABLE IF EXISTS `towns48`;
CREATE TABLE `towns48` (
  `ID` smallint NOT NULL,
  `townCode` char(7) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `Wx` varchar(15) NOT NULL,
  `AT` tinyint NOT NULL,
  `T` tinyint NOT NULL,
  `RH` tinyint NOT NULL,
  `CI` varchar(15) NOT NULL,
  `WeatherDescription` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `towns48pop6h`
--

DROP TABLE IF EXISTS `towns48pop6h`;
CREATE TABLE `towns48pop6h` (
  `ID` smallint NOT NULL,
  `townCode` char(7) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `PoP6h` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `towns168`
--

DROP TABLE IF EXISTS `towns168`;
CREATE TABLE `towns168` (
  `ID` smallint NOT NULL,
  `townCode` char(7) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `T` tinyint NOT NULL,
  `RH` tinyint NOT NULL,
  `MinCI` tinyint NOT NULL,
  `MaxAT` tinyint NOT NULL,
  `Wx` varchar(15) NOT NULL,
  `MaxCI` tinyint NOT NULL,
  `MinT` tinyint NOT NULL,
  `WeatherDescription` varchar(127) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `MinAT` tinyint NOT NULL,
  `MaxT` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `towns168pop12h`
--

DROP TABLE IF EXISTS `towns168pop12h`;
CREATE TABLE `towns168pop12h` (
  `ID` smallint NOT NULL,
  `townCode` char(7) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `PoP12h` tinyint
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 替換檢視表以便查看 `towns168pop12hcountycode`
-- (請參考以下實際畫面)
--
-- DROP VIEW IF EXISTS `towns168pop12hcountycode`;
-- CREATE TABLE `towns168pop12hcountycode` (
-- `ID` smallint
-- ,`townCode` char(7)
-- ,`startTime` datetime
-- ,`endTime` datetime
-- ,`PoP12h` tinyint
-- ,`countyCode` char(5)
-- );

-- --------------------------------------------------------

--
-- 替換檢視表以便查看 `towns168tcountycode`
-- (請參考以下實際畫面)
--
-- DROP VIEW IF EXISTS `towns168tcountycode`;
-- CREATE TABLE `towns168tcountycode` (
-- `ID` smallint
-- ,`townCode` char(7)
-- ,`startTime` datetime
-- ,`endTime` datetime
-- ,`T` tinyint
-- ,`countyCode` char(5)
-- );

-- --------------------------------------------------------

--
-- 替換檢視表以便查看 `towns168townnamecountyname`
-- (請參考以下實際畫面)
--
-- DROP VIEW IF EXISTS `towns168townnamecountyname`;
-- CREATE TABLE `towns168townnamecountyname` (
-- `ID` smallint
-- ,`townCode` char(7)
-- ,`startTime` datetime
-- ,`endTime` datetime
-- ,`T` tinyint
-- ,`RH` tinyint
-- ,`MinCI` tinyint
-- ,`MaxAT` tinyint
-- ,`Wx` varchar(15)
-- ,`MaxCI` tinyint
-- ,`MinT` tinyint
-- ,`WeatherDescription` varchar(127)
-- ,`MinAT` tinyint
-- ,`MaxT` tinyint
-- ,`townName` varchar(7)
-- ,`countyName` varchar(7)
-- );

-- --------------------------------------------------------

--
-- 資料表結構 `update_time`
--

DROP TABLE IF EXISTS `update_time`;
CREATE TABLE `update_time` (
  `tableName` varchar(31) NOT NULL,
  `updateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 檢視表結構 `counties168countyname`
--
-- DROP TABLE IF EXISTS `counties168countyname`;

-- DROP VIEW IF EXISTS `counties168countyname`;
-- CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `counties168countyname`  AS  select `counties168`.`ID` AS `ID`,`counties168`.`countyCode` AS `countyCode`,`counties168`.`startTime` AS `startTime`,`counties168`.`endTime` AS `endTime`,`counties168`.`T` AS `T`,`counties168`.`RH` AS `RH`,`counties168`.`MinCI` AS `MinCI`,`counties168`.`MaxAT` AS `MaxAT`,`counties168`.`Wx` AS `Wx`,`counties168`.`MaxCI` AS `MaxCI`,`counties168`.`MinT` AS `MinT`,`counties168`.`WeatherDescription` AS `WeatherDescription`,`counties168`.`MinAT` AS `MinAT`,`counties168`.`MaxT` AS `MaxT`,`countycode2countyname`.`countyName` AS `countyName` from (`counties168` left join `countycode2countyname` on((`counties168`.`countyCode` = `countycode2countyname`.`countyCode`))) ;

-- --------------------------------------------------------

--
-- 檢視表結構 `towns168pop12hcountycode`
--
-- DROP TABLE IF EXISTS `towns168pop12hcountycode`;

-- DROP VIEW IF EXISTS `towns168pop12hcountycode`;
-- CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `towns168pop12hcountycode`  AS  select `towns168pop12h`.`ID` AS `ID`,`towns168pop12h`.`townCode` AS `townCode`,`towns168pop12h`.`startTime` AS `startTime`,`towns168pop12h`.`endTime` AS `endTime`,`towns168pop12h`.`PoP12h` AS `PoP12h`,`towncode2townname`.`countyCode` AS `countyCode` from (`towns168pop12h` join `towncode2townname` on((`towns168pop12h`.`townCode` = `towncode2townname`.`townCode`))) ;

-- --------------------------------------------------------

--
-- 檢視表結構 `towns168tcountycode`
--
-- DROP TABLE IF EXISTS `towns168tcountycode`;

-- DROP VIEW IF EXISTS `towns168tcountycode`;
-- CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `towns168tcountycode`  AS  select `towns168`.`ID` AS `ID`,`towns168`.`townCode` AS `townCode`,`towns168`.`startTime` AS `startTime`,`towns168`.`endTime` AS `endTime`,`towns168`.`T` AS `T`,`towncode2townname`.`countyCode` AS `countyCode` from (`towns168` join `towncode2townname` on((`towns168`.`townCode` = `towncode2townname`.`townCode`))) ;

-- --------------------------------------------------------

--
-- 檢視表結構 `towns168townnamecountyname`
--
-- DROP TABLE IF EXISTS `towns168townnamecountyname`;

-- DROP VIEW IF EXISTS `towns168townnamecountyname`;
-- CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `towns168townnamecountyname`  AS  select `towns168`.`ID` AS `ID`,`towns168`.`townCode` AS `townCode`,`towns168`.`startTime` AS `startTime`,`towns168`.`endTime` AS `endTime`,`towns168`.`T` AS `T`,`towns168`.`RH` AS `RH`,`towns168`.`MinCI` AS `MinCI`,`towns168`.`MaxAT` AS `MaxAT`,`towns168`.`Wx` AS `Wx`,`towns168`.`MaxCI` AS `MaxCI`,`towns168`.`MinT` AS `MinT`,`towns168`.`WeatherDescription` AS `WeatherDescription`,`towns168`.`MinAT` AS `MinAT`,`towns168`.`MaxT` AS `MaxT`,`towncode2townname`.`townName` AS `townName`,`countycode2countyname`.`countyName` AS `countyName` from ((`towns168` left join `towncode2townname` on((`towns168`.`townCode` = `towncode2townname`.`townCode`))) left join `countycode2countyname` on((`towncode2townname`.`countyCode` = `countycode2countyname`.`countyCode`))) ;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `counties48`
--
ALTER TABLE `counties48`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `c2c48` (`countyCode`);

--
-- 資料表索引 `counties48pop6h`
--
ALTER TABLE `counties48pop6h`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `c2c48p6` (`countyCode`);

--
-- 資料表索引 `counties168`
--
ALTER TABLE `counties168`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `c2c168` (`countyCode`);

--
-- 資料表索引 `counties168pop12h`
--
ALTER TABLE `counties168pop12h`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `c2c168p12` (`countyCode`);

--
-- 資料表索引 `countycode2countyname`
--
ALTER TABLE `countycode2countyname`
  ADD PRIMARY KEY (`countyCode`);

--
-- 資料表索引 `towncode2townname`
--
ALTER TABLE `towncode2townname`
  ADD PRIMARY KEY (`townCode`);

--
-- 資料表索引 `towns48`
--
ALTER TABLE `towns48`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `t2t48` (`townCode`);

--
-- 資料表索引 `towns48pop6h`
--
ALTER TABLE `towns48pop6h`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `t2t48p6` (`townCode`);

--
-- 資料表索引 `towns168`
--
ALTER TABLE `towns168`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `t2t168` (`townCode`);

--
-- 資料表索引 `towns168pop12h`
--
ALTER TABLE `towns168pop12h`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `t2t168p12` (`townCode`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `counties48`
--
ALTER TABLE `counties48`
  MODIFY `ID` smallint NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `counties48pop6h`
--
ALTER TABLE `counties48pop6h`
  MODIFY `ID` smallint NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `counties168`
--
ALTER TABLE `counties168`
  MODIFY `ID` smallint NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `counties168pop12h`
--
ALTER TABLE `counties168pop12h`
  MODIFY `ID` smallint NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `towns48`
--
ALTER TABLE `towns48`
  MODIFY `ID` smallint NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `towns48pop6h`
--
ALTER TABLE `towns48pop6h`
  MODIFY `ID` smallint NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `towns168`
--
ALTER TABLE `towns168`
  MODIFY `ID` smallint NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `towns168pop12h`
--
ALTER TABLE `towns168pop12h`
  MODIFY `ID` smallint NOT NULL AUTO_INCREMENT;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `counties48`
--
ALTER TABLE `counties48`
  ADD CONSTRAINT `c2c48` FOREIGN KEY (`countyCode`) REFERENCES `countycode2countyname` (`countyCode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `counties48pop6h`
--
ALTER TABLE `counties48pop6h`
  ADD CONSTRAINT `c2c48p6` FOREIGN KEY (`countyCode`) REFERENCES `countycode2countyname` (`countyCode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `counties168`
--
ALTER TABLE `counties168`
  ADD CONSTRAINT `c2c168` FOREIGN KEY (`countyCode`) REFERENCES `countycode2countyname` (`countyCode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `counties168pop12h`
--
ALTER TABLE `counties168pop12h`
  ADD CONSTRAINT `c2c168p12` FOREIGN KEY (`countyCode`) REFERENCES `countycode2countyname` (`countyCode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `towns48`
--
ALTER TABLE `towns48`
  ADD CONSTRAINT `t2t48` FOREIGN KEY (`townCode`) REFERENCES `towncode2townname` (`townCode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `towns48pop6h`
--
ALTER TABLE `towns48pop6h`
  ADD CONSTRAINT `t2t48p6` FOREIGN KEY (`townCode`) REFERENCES `towncode2townname` (`townCode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `towns168`
--
ALTER TABLE `towns168`
  ADD CONSTRAINT `t2t168` FOREIGN KEY (`townCode`) REFERENCES `towncode2townname` (`townCode`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- 資料表的限制式 `towns168pop12h`
--
ALTER TABLE `towns168pop12h`
  ADD CONSTRAINT `t2t168p12` FOREIGN KEY (`townCode`) REFERENCES `towncode2townname` (`townCode`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

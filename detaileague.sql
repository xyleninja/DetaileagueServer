-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Mrz 2017 um 23:10
-- Server-Version: 10.1.8-MariaDB
-- PHP-Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `detaileague`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `champions`
--

CREATE TABLE `champions` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `summoners`
--

CREATE TABLE `summoners` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `region` varchar(30) NOT NULL,
  `level` int(2) NOT NULL,
  `normalGames` int(6) NOT NULL,
  `normalWins` int(6) NOT NULL,
  `sdGames` int(6) NOT NULL,
  `sdWins` int(6) NOT NULL,
  `soloDuo` varchar(20) NOT NULL,
  `flex3v3` varchar(20) NOT NULL,
  `flex5v5` varchar(20) NOT NULL,
  `timeStamp` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `summoners`
--

INSERT INTO `summoners` (`id`, `name`, `region`, `level`, `normalGames`, `normalWins`, `sdGames`, `sdWins`, `soloDuo`, `flex3v3`, `flex5v5`, `timeStamp`) VALUES
(90837353, 'Mute4win', 'euw', 30, 0, 142, 108, 54, 'GOLD', 'PROVISIONAL', 'PLATINUM', 1489533667);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `champions`
--
ALTER TABLE `champions`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `summoners`
--
ALTER TABLE `summoners`
  ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

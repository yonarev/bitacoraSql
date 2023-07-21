-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-07-2023 a las 00:19:50
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `q`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tabla_titulo_desarrollo`
--

CREATE TABLE `tabla_titulo_desarrollo` (
  `id` varchar(20) NOT NULL,
  `idUsu` varchar(20) DEFAULT NULL,
  `idTit` varchar(20) DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `desarrollo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tabla_titulo_desarrollo`
--

INSERT INTO `tabla_titulo_desarrollo` (`id`, `idUsu`, `idTit`, `titulo`, `desarrollo`) VALUES
('0207202319504', '28062023162651', '0207202319504', 'primero', 'Primer registro de desarrollo'),
('03072023104856', '28062023163857', '03072023104856', 'a', 'En desarrollo aaaaaa'),
('03072023104941', '28062023163857', '03072023104941', 'b', 'bbbbb'),
('03072023105528', '28062023163857', '03072023105528', 'c', 'c En desarrollo'),
('03072023153650', '28062023162651', '03072023153650', 'onceavo', 'En desarrollo'),
('0307202315539', '28062023162651', '0307202315539', 'doceavo', 'En desarrollo'),
('03072023155630', '28062023162651', '03072023155630', 'octavo', 'En desarrollo'),
('03072023155653', '28062023162651', '03072023155653', 'trece', 'En desarrollo'),
('03072023155721', '28062023162651', '03072023155721', '14', 'En desarrollo'),
('0307202317223', '28062023162651', '0307202317223', 'ekis', 'En desarrollo'),
('03072023175927', '28062023162651', '03072023175927', '12', 'En desarrollo'),
('03072023200133', '28062023162651', '03072023200133', 'segundo', 'segundo'),
('0307202320082', '28062023162651', '0307202320082', 'tercero', '33333'),
('0307202320103', '28062023162651', '0307202320103', 'cuarterolo', '4444'),
('03072023201317', '28062023162651', '03072023201317', 'kinto', 'En desarrollo'),
('03072023201358', '28062023162651', '03072023201358', 'sesenta', 'En desarrollo'),
('030720239445', '28062023162651', '030720239445', 'setimo', '4444'),
('0307202394538', '28062023162651', '0307202394538', 'nueve', '222222'),
('0307202394938', '28062023162651', '0307202394938', 'decimo', '10 En desarrollo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tabla_titulo_desarrollo`
--
ALTER TABLE `tabla_titulo_desarrollo`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-07-2023 a las 23:44:53
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
-- Estructura de tabla para la tabla `titulos`
--

CREATE TABLE `titulos` (
  `idUsu` varchar(30) NOT NULL,
  `fecha` varchar(20) NOT NULL,
  `hora` time NOT NULL,
  `idTitulo` varchar(30) NOT NULL,
  `titulo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `titulos`
--

INSERT INTO `titulos` (`idUsu`, `fecha`, `hora`, `idTitulo`, `titulo`) VALUES
('28062023162651', '01/07/2023', '11:10:17', '01072023111017', 'nuevo'),
('28062023162651', '01/07/2023', '11:13:48', '01072023111348', 'otro'),
('28062023162651', '01/07/2023', '11:20:03', '0107202311203', 'nuevo titulo'),
('28062023163857', '01/07/2023', '11:29:52', '01072023112952', 'nuevo'),
('28062023163857', '01/07/2023', '11:30:01', '0107202311301', 'otro'),
('28062023163857', '01/07/2023', '13:16:23', '01072023131623', 'TITULASO YONAR'),
('28062023162651', '01/07/2023', '13:20:55', '01072023132055', 'otrito mas'),
('28062023162651', '01/07/2023', '13:25:14', '01072023132514', 'mas mas'),
('28062023162651', '01/07/2023', '13:27:13', '01072023132713', 'zanahoria'),
('28062023163857', '01/07/2023', '13:29:58', '01072023132958', 'auxilio'),
('28062023163857', '01/07/2023', '13:30:52', '01072023133052', 'aguante'),
('28062023162651', '01/07/2023', '13:39:16', '01072023133916', 'kanoaita'),
('28062023162651', '01/07/2023', '13:46:03', '0107202313463', 'foca'),
('28062023162651', '01/07/2023', '13:46:30', '01072023134630', 'gato'),
('28062023162651', '01/07/2023', '13:51:50', '01072023135150', 'jaime'),
('28062023163857', '01/07/2023', '13:52:56', '01072023135256', 'bahia'),
('28062023162651', '01/07/2023', '17:36:48', '01072023173648', 'palabra');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `titulos`
--
ALTER TABLE `titulos`
  ADD PRIMARY KEY (`idTitulo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

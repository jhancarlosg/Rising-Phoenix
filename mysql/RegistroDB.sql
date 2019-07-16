-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 16-07-2019 a las 00:33:49
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.7

DROP DATABASE IF EXISTS `RegistroDB` ;

-- -----------------------------------------------------
-- DATABASE RegistroDB
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `RegistroDB` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
SHOW WARNINGS;
USE `RegistroDB` ;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `RegistroDB`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `AsesorVentas`
--

CREATE TABLE `AsesorVentas` (
  `idAsesorVentas` smallint(5) UNSIGNED NOT NULL,
  `nombreCompleto` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `AsesorVentas`
--

INSERT INTO `AsesorVentas` (`idAsesorVentas`, `nombreCompleto`) VALUES
(1, ''),
(2, 'TODO'),
(3, 'LESLIE ESPINOZA'),
(4, 'CAJA'),
(5, 'SAE'),
(6, 'DELIA PEREZ'),
(7, 'GUSTAVO MANYARI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Atencion`
--

CREATE TABLE `Atencion` (
  `idAtencion` int(10) UNSIGNED NOT NULL,
  `fechaHora` datetime NOT NULL DEFAULT current_timestamp(),
  `DNI` char(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idAsesorVentas` smallint(5) UNSIGNED NOT NULL,
  `idUsuario` smallint(5) UNSIGNED NOT NULL,
  `token` char(8) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Atencion`
--

INSERT INTO `Atencion` (`idAtencion`, `fechaHora`, `DNI`, `idAsesorVentas`, `idUsuario`, `token`) VALUES
(20, '2019-07-15 09:58:16', '56756756', 2, 1, '4a660545'),
(21, '2019-07-15 09:58:16', '56756756', 2, 1, '4a660545'),
(22, '2019-07-15 10:00:28', '56756756', 2, 1, '4b3c0559'),
(23, '2019-07-15 10:09:52', '56756756', 6, 1, '4ad8054d'),
(24, '2019-07-15 10:21:47', '56756756', 2, 1, '49fd053f'),
(25, '2019-07-15 10:22:16', '56756756', 2, 1, '4a570549'),
(26, '2019-07-15 11:02:12', '56756756', 2, 1, '4aee0552'),
(27, '2019-07-15 11:03:49', '56756756', 2, 1, '4aad0549'),
(28, '2019-07-15 11:38:18', '56756756', 2, 1, '4b70055c'),
(29, '2019-07-15 11:58:18', '56756750', 2, 1, '4bec0567'),
(30, '2019-07-15 14:43:49', '56756756', 2, 1, '4b71055a'),
(31, '2019-07-15 14:43:51', '56756756', 2, 1, '4bcb0564'),
(32, '2019-07-15 14:44:03', '56756756', 2, 1, '4b4f0556'),
(33, '2019-07-15 14:48:01', '12345678', 2, 1, '4b7f0557');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cliente`
--

CREATE TABLE `Cliente` (
  `DNI` char(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombreCompleto` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idDistrito` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Cliente`
--

INSERT INTO `Cliente` (`DNI`, `nombreCompleto`, `telefono`, `idDistrito`) VALUES
('12345678', 'ESFDDVSAFSA', '982188295', 16),
('23455566', 'wwertyui', '982188295', 15),
('47499790', 'NILA CARRASCO QUEVEDO', '997599757', 1),
('47774578', 'IVAN CAMILOAGA COLLANA', '987236016', 1),
('56756750', 'tjyjytjtyj', '982188295', 1),
('56756756', 'rthrthrttrh', '982188295', 1);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `Datos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `Datos` (
`fechaHora` datetime
,`DNI` char(8)
,`nombreCompleto` varchar(50)
,`telefono` varchar(12)
,`idDistrito` smallint(5) unsigned
,`asesor` varchar(45)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Distrito`
--

CREATE TABLE `Distrito` (
  `idDistrito` smallint(5) UNSIGNED NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `porDefecto` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Distrito`
--

INSERT INTO `Distrito` (`idDistrito`, `nombre`, `porDefecto`) VALUES
(1, 'SMP', 1),
(2, 'COMAS', 1),
(3, 'Matute', NULL),
(15, 'yrtftyuirwesdrftht', NULL),
(16, 'jkljiliuilui', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Sesion`
--

CREATE TABLE `Sesion` (
  `idSesion` int(10) UNSIGNED NOT NULL,
  `idUsuario` smallint(5) UNSIGNED NOT NULL,
  `session` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastConexion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Sesion`
--

INSERT INTO `Sesion` (`idSesion`, `idUsuario`, `session`, `ip`, `lastConexion`) VALUES
(1, 1, 'fa1e862790a52462ab85c68235dc36c96a4c09ccac3c94fb23b95cbe697f316f', '192.168.0.15', '2019-07-14 07:22:13'),
(2, 1, '8242551dfb2ec7a3126ee36dc0e36d381675d79ad37df0bebd2c927c5837c5a0', '192.168.0.15', '2019-07-15 04:43:53'),
(3, 1, '2eaa2b56904616e5c6cccdc07d2c018f5a643c168a0e31a757fa5baef5ccc185', '192.168.0.15', '2019-07-15 14:42:37'),
(4, 1, '92f09a4ea4c785b1958524e3d2aa0e0be4e48b54e6d7600217d00b0e0b530ffe', '192.168.0.15', '2019-07-15 15:24:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `idUsuario` smallint(5) UNSIGNED NOT NULL,
  `correo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` char(64) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`idUsuario`, `correo`, `password`) VALUES
(1, 'admin@root', 'dc7074a00456f419dbbfb95acbbadea68ca12b2c4c3f2c5a0f4daf146225266a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UsuarioAsesores`
--

CREATE TABLE `UsuarioAsesores` (
  `idAsesorVentas` smallint(5) UNSIGNED NOT NULL,
  `idUsuario` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `UsuarioAsesores`
--

INSERT INTO `UsuarioAsesores` (`idAsesorVentas`, `idUsuario`) VALUES
(2, 1),
(6, 1);

-- --------------------------------------------------------

--
-- Estructura para la vista `Datos`
--
DROP TABLE IF EXISTS `Datos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `Datos`  AS  with LISTA as (select `A`.`fechaHora` AS `fechaHora`,`C`.`DNI` AS `DNI`,`C`.`nombreCompleto` AS `nombreCompleto`,`C`.`telefono` AS `telefono`,`C`.`idDistrito` AS `idDistrito`,`AV`.`nombreCompleto` AS `asesor` from ((`Atencion` `A` join `Cliente` `C`) join `AsesorVentas` `AV`) where `A`.`idAsesorVentas` = `AV`.`idAsesorVentas` and `A`.`DNI` = `C`.`DNI` union select `A`.`fechaHora` AS `fechaHora`,`C`.`DNI` AS `DNI`,`C`.`nombreCompleto` AS `nombreCompleto`,`C`.`telefono` AS `telefono`,`C`.`idDistrito` AS `idDistrito`,NULL AS `Asesor` from (`Atencion` `A` join `Cliente` `C`) where `A`.`DNI` = `C`.`DNI` and `A`.`idAsesorVentas` is null)select `LISTA`.`fechaHora` AS `fechaHora`,`LISTA`.`DNI` AS `DNI`,`LISTA`.`nombreCompleto` AS `nombreCompleto`,`LISTA`.`telefono` AS `telefono`,`LISTA`.`idDistrito` AS `idDistrito`,`LISTA`.`asesor` AS `asesor` from `LISTA` order by `LISTA`.`fechaHora` desc limit 30 ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `AsesorVentas`
--
ALTER TABLE `AsesorVentas`
  ADD PRIMARY KEY (`idAsesorVentas`);

--
-- Indices de la tabla `Atencion`
--
ALTER TABLE `Atencion`
  ADD PRIMARY KEY (`idAtencion`),
  ADD KEY `fk_Atencion_Cliente_idx` (`DNI`),
  ADD KEY `fk_Atencion_UsuarioAsesores1_idx` (`idAsesorVentas`,`idUsuario`);

--
-- Indices de la tabla `Cliente`
--
ALTER TABLE `Cliente`
  ADD PRIMARY KEY (`DNI`),
  ADD KEY `fk_Cliente_Distrito1_idx` (`idDistrito`);

--
-- Indices de la tabla `Distrito`
--
ALTER TABLE `Distrito`
  ADD PRIMARY KEY (`idDistrito`);

--
-- Indices de la tabla `Sesion`
--
ALTER TABLE `Sesion`
  ADD PRIMARY KEY (`idSesion`),
  ADD KEY `fk_Sesion_Usuario1_idx` (`idUsuario`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- Indices de la tabla `UsuarioAsesores`
--
ALTER TABLE `UsuarioAsesores`
  ADD PRIMARY KEY (`idAsesorVentas`,`idUsuario`),
  ADD KEY `fk_AsesorVentas_has_Usuario_Usuario1_idx` (`idUsuario`),
  ADD KEY `fk_AsesorVentas_has_Usuario_AsesorVentas1_idx` (`idAsesorVentas`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `AsesorVentas`
--
ALTER TABLE `AsesorVentas`
  MODIFY `idAsesorVentas` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `Atencion`
--
ALTER TABLE `Atencion`
  MODIFY `idAtencion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `Distrito`
--
ALTER TABLE `Distrito`
  MODIFY `idDistrito` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `Sesion`
--
ALTER TABLE `Sesion`
  MODIFY `idSesion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `idUsuario` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Atencion`
--
ALTER TABLE `Atencion`
  ADD CONSTRAINT `fk_Atencion_Cliente` FOREIGN KEY (`DNI`) REFERENCES `Cliente` (`DNI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Atencion_UsuarioAsesores1` FOREIGN KEY (`idAsesorVentas`,`idUsuario`) REFERENCES `UsuarioAsesores` (`idAsesorVentas`, `idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `Cliente`
--
ALTER TABLE `Cliente`
  ADD CONSTRAINT `fk_Cliente_Distrito1` FOREIGN KEY (`idDistrito`) REFERENCES `Distrito` (`idDistrito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `Sesion`
--
ALTER TABLE `Sesion`
  ADD CONSTRAINT `fk_Sesion_Usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `UsuarioAsesores`
--
ALTER TABLE `UsuarioAsesores`
  ADD CONSTRAINT `fk_AsesorVentas_has_Usuario_AsesorVentas1` FOREIGN KEY (`idAsesorVentas`) REFERENCES `AsesorVentas` (`idAsesorVentas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_AsesorVentas_has_Usuario_Usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

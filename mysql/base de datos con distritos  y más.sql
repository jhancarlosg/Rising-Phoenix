-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-07-2019 a las 02:57:42
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `registrodb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asesorventas`
--

CREATE TABLE `asesorventas` (
  `idAsesorVentas` smallint(5) UNSIGNED NOT NULL,
  `nombreCompleto` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `asesorventas`
--

INSERT INTO `asesorventas` (`idAsesorVentas`, `nombreCompleto`) VALUES
(1, ''),
(2, 'TODO'),
(3, 'LESLIE ESPINOZA'),
(4, 'CAJA'),
(5, 'SAE'),
(6, 'DELIA PEREZ'),
(7, 'GUSTAVO MANYARI');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atencion`
--

CREATE TABLE `atencion` (
  `idAtencion` int(10) UNSIGNED NOT NULL,
  `fechaHora` datetime NOT NULL DEFAULT current_timestamp(),
  `DNI` char(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idAsesorVentas` smallint(5) UNSIGNED NOT NULL,
  `idUsuario` smallint(5) UNSIGNED NOT NULL,
  `token` char(8) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `DNI` char(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombreCompleto` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idDistrito` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `datos`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `datos` (
`fechaHora` datetime
,`DNI` char(8)
,`nombreCompleto` varchar(50)
,`telefono` varchar(12)
,`idDistrito` smallint(5) unsigned
,`asesor` varchar(45)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `distrito`
--

CREATE TABLE `distrito` (
  `idDistrito` smallint(5) UNSIGNED NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `porDefecto` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `distrito`
--

INSERT INTO Distrito (idDistrito, nombre, porDefecto) VALUES
(2, 'COMAS', 1),
(18, 'ANCON', 1),
(19, 'ATE', 1),
(20, 'BARRANCO', 1),
(21, 'BRENA', 1),
(22, 'CARABAYLLO', 1),
(23, 'CHACLACAYO', 1),
(24, 'CHORRILLOS', 1),
(25, 'CIENEGUILLA', 1),
(27, 'EL AGUSTINO', 1),
(28, 'INDEPENDENCIA', 1),
(29, 'JESUS MARIA', 1),
(30, 'LA MOLINA', 1),
(31, 'LA VICTORIA', 1),
(32, 'LIMA', 1),
(33, 'LINCE', 1),
(34, 'LOS OLIVOS', 1),
(35, 'LURIGANCHO-CHOSICA', 1),
(36, 'LURIN', 1),
(37, 'MAGDALENA DEL MAR', 1),
(38, 'MIRAFLORES', 1),
(39, 'PACHACAMAC', 1),
(40, 'PUEBLO LIBRE', 1),
(41, 'PUENTE PIEDRA', 1),
(42, 'RIMAC', 1),
(43, 'SAN MARTIN DE PORRES', 1),
(44, 'SAN MIGUEL', 1),
(45, 'SANTA ANITA', 1),
(46, 'SAN ISIDRO', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesion`
--

CREATE TABLE `sesion` (
  `idSesion` int(10) UNSIGNED NOT NULL,
  `idUsuario` smallint(5) UNSIGNED NOT NULL,
  `session` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastConexion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sesion`
--

INSERT INTO `sesion` (`idSesion`, `idUsuario`, `session`, `ip`, `lastConexion`) VALUES
(1, 1, 'fa1e862790a52462ab85c68235dc36c96a4c09ccac3c94fb23b95cbe697f316f', '192.168.0.15', '2019-07-14 07:22:13'),
(2, 1, '8242551dfb2ec7a3126ee36dc0e36d381675d79ad37df0bebd2c927c5837c5a0', '192.168.0.15', '2019-07-15 04:43:53'),
(3, 1, '2eaa2b56904616e5c6cccdc07d2c018f5a643c168a0e31a757fa5baef5ccc185', '192.168.0.15', '2019-07-15 14:42:37'),
(4, 1, '92f09a4ea4c785b1958524e3d2aa0e0be4e48b54e6d7600217d00b0e0b530ffe', '192.168.0.15', '2019-07-15 15:24:24'),
(5, 1, '2741a7b7f96f6d07d0605cfd39f6aec5d0fb6ae8552e20e7d0c613a7b5aac070', '::1', '2019-07-15 17:40:28'),
(6, 8, '17b03bcb93cc146d64fde20169bccc9f7b1ac4d4f99cd6580df18917c9b033ca', '::1', '2019-07-15 18:10:33'),
(7, 8, '990815f797c28185d6636c6f3a367a6226114ba07433f823f08b97d9ab4a7b97', '::1', '2019-07-15 18:56:13'),
(8, 3, '5761dc22828750ed6616390ed7e948ac8c4fb92e59fd5ac71005c6b9d1f77811', '::1', '2019-07-15 18:59:35'),
(9, 8, '4988c650ef75757e2d8d68659f39640405bbec0db9f45dc93abb844e28378bbc', '::1', '2019-07-15 19:01:37'),
(10, 1, 'f5d4a1843d571267d9f3ed1c268b4d8ef51482d397db693ee53ebe83b051c821', '::1', '2019-07-15 19:02:33'),
(11, 8, 'ba62d67894c2d3b871762f0153cc065e080af60ba2dd4354d77329857a505f28', '::1', '2019-07-15 19:17:48'),
(12, 2, 'a95fe8dc881be535778bd24a8bc311be4afc2e047a6aaa582b23a876ab52268b', '::1', '2019-07-15 19:19:19'),
(13, 3, '6a22feee5d5428f10882e6955caf66c33cea073a4f03bb613eefa3af1c55fe45', '::1', '2019-07-15 19:42:06'),
(14, 1, 'b35768e9ddf5f75283efd3f28b327498cd04ad0de109dac43e0389c4cb86a8bd', '::1', '2019-07-15 19:47:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` smallint(5) UNSIGNED NOT NULL,
  `correo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` char(64) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `correo`, `password`) VALUES
(1, 'admin@root', 'dc7074a00456f419dbbfb95acbbadea68ca12b2c4c3f2c5a0f4daf146225266a'),
(2, 'lespinozaq@idat.edu.pe', 'f3515ac07912eda1337bebe7550826f7a269a314b6aa95aa33a11a621515b18c'),
(3, 'dperezl@idat.edu.pe', 'f0fbb30d67ac6ed89b0de60654a5bc311e1eed350803e9041eab8268ab9bdc74'),
(4, 'gmanyari@idat.edu.pe', 'e146223b0353497643298692b7581908c7781c17a833fb817879f6b75c008bf5'),
(5, 'sae@idat.edu.pe', '9a9157fc4548b43292eb23e6999c3b15005914be4c32b4b67feec5a2e40ae8d4'),
(6, 'caja@idat.edu.pe', '9529932eecbfb68640170f4331899c79d317d8b83eca2070b8a0577f623b0b6a'),
(7, 'lamanqui@idat.edu.pe', 'cede01431a05841a94abe691a898d7f3952ef991bbf9795fa81246a5f2b7f1b6'),
(8, 'onoriega@idat.edu.pe', '9c9f2429a1ecb2524dc816c3ab2be107c11beef5d0b07cc240fa044ef2f14e15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioasesores`
--

CREATE TABLE `usuarioasesores` (
  `idAsesorVentas` smallint(5) UNSIGNED NOT NULL,
  `idUsuario` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarioasesores`
--

INSERT INTO `usuarioasesores` (`idAsesorVentas`, `idUsuario`) VALUES
(1, 8),
(2, 1),
(3, 2),
(6, 1);

-- --------------------------------------------------------

--
-- Estructura para la vista `datos`
--
DROP TABLE IF EXISTS `datos`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `datos`  AS  with LISTA as (select `a`.`fechaHora` AS `fechaHora`,`c`.`DNI` AS `DNI`,`c`.`nombreCompleto` AS `nombreCompleto`,`c`.`telefono` AS `telefono`,`c`.`idDistrito` AS `idDistrito`,`av`.`nombreCompleto` AS `asesor` from ((`atencion` `a` join `cliente` `c`) join `asesorventas` `av`) where `a`.`idAsesorVentas` = `av`.`idAsesorVentas` and `a`.`DNI` = `c`.`DNI` union select `a`.`fechaHora` AS `fechaHora`,`c`.`DNI` AS `DNI`,`c`.`nombreCompleto` AS `nombreCompleto`,`c`.`telefono` AS `telefono`,`c`.`idDistrito` AS `idDistrito`,NULL AS `Asesor` from (`atencion` `a` join `cliente` `c`) where `a`.`DNI` = `c`.`DNI` and `a`.`idAsesorVentas` is null)select `lista`.`fechaHora` AS `fechaHora`,`lista`.`DNI` AS `DNI`,`lista`.`nombreCompleto` AS `nombreCompleto`,`lista`.`telefono` AS `telefono`,`lista`.`idDistrito` AS `idDistrito`,`lista`.`asesor` AS `asesor` from `lista` order by `lista`.`fechaHora` desc limit 30 ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asesorventas`
--
ALTER TABLE `asesorventas`
  ADD PRIMARY KEY (`idAsesorVentas`);

--
-- Indices de la tabla `atencion`
--
ALTER TABLE `atencion`
  ADD PRIMARY KEY (`idAtencion`),
  ADD KEY `fk_Atencion_Cliente_idx` (`DNI`),
  ADD KEY `fk_Atencion_UsuarioAsesores1_idx` (`idAsesorVentas`,`idUsuario`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`DNI`),
  ADD KEY `fk_Cliente_Distrito1_idx` (`idDistrito`);

--
-- Indices de la tabla `distrito`
--
ALTER TABLE `distrito`
  ADD PRIMARY KEY (`idDistrito`);

--
-- Indices de la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD PRIMARY KEY (`idSesion`),
  ADD KEY `fk_Sesion_Usuario1_idx` (`idUsuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- Indices de la tabla `usuarioasesores`
--
ALTER TABLE `usuarioasesores`
  ADD PRIMARY KEY (`idAsesorVentas`,`idUsuario`),
  ADD KEY `fk_AsesorVentas_has_Usuario_Usuario1_idx` (`idUsuario`),
  ADD KEY `fk_AsesorVentas_has_Usuario_AsesorVentas1_idx` (`idAsesorVentas`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asesorventas`
--
ALTER TABLE `asesorventas`
  MODIFY `idAsesorVentas` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `atencion`
--
ALTER TABLE `atencion`
  MODIFY `idAtencion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `distrito`
--
ALTER TABLE `distrito`
  MODIFY `idDistrito` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `sesion`
--
ALTER TABLE `sesion`
  MODIFY `idSesion` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atencion`
--
ALTER TABLE `atencion`
  ADD CONSTRAINT `fk_Atencion_Cliente` FOREIGN KEY (`DNI`) REFERENCES `cliente` (`DNI`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Atencion_UsuarioAsesores1` FOREIGN KEY (`idAsesorVentas`,`idUsuario`) REFERENCES `usuarioasesores` (`idAsesorVentas`, `idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_Cliente_Distrito1` FOREIGN KEY (`idDistrito`) REFERENCES `distrito` (`idDistrito`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD CONSTRAINT `fk_Sesion_Usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarioasesores`
--
ALTER TABLE `usuarioasesores`
  ADD CONSTRAINT `fk_AsesorVentas_has_Usuario_AsesorVentas1` FOREIGN KEY (`idAsesorVentas`) REFERENCES `asesorventas` (`idAsesorVentas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_AsesorVentas_has_Usuario_Usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

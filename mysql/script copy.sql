-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema RegistroDB
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `RegistroDB` ;

-- -----------------------------------------------------
-- DATABASE RegistroDB
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `RegistroDB` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
SHOW WARNINGS;
USE `RegistroDB` ;

-- -----------------------------------------------------
-- Table `RegistroDB`.`Distrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RegistroDB`.`Distrito` (
  `idDistrito` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `porDefecto` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`idDistrito`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `RegistroDB`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RegistroDB`.`Cliente` (
  `DNI` CHAR(8) NOT NULL,
  `nombreCompleto` VARCHAR(50) NOT NULL,
  `telefono` VARCHAR(12) NULL,
  `idDistrito` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`DNI`),
  INDEX `fk_Cliente_Distrito1_idx` (`idDistrito` ASC),
  CONSTRAINT `fk_Cliente_Distrito1`
    FOREIGN KEY (`idDistrito`)
    REFERENCES `RegistroDB`.`Distrito` (`idDistrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `RegistroDB`.`AsesorVentas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RegistroDB`.`AsesorVentas` (
  `idAsesorVentas` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombreCompleto` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAsesorVentas`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `RegistroDB`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RegistroDB`.`Usuario` (
  `idUsuario` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `correo` VARCHAR(50) NOT NULL,
  `password` CHAR(64) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `RegistroDB`.`UsuarioAsesores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RegistroDB`.`UsuarioAsesores` (
  `idAsesorVentas` SMALLINT UNSIGNED NOT NULL,
  `idUsuario` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`idAsesorVentas`, `idUsuario`),
  INDEX `fk_AsesorVentas_has_Usuario_Usuario1_idx` (`idUsuario` ASC),
  INDEX `fk_AsesorVentas_has_Usuario_AsesorVentas1_idx` (`idAsesorVentas` ASC),
  CONSTRAINT `fk_AsesorVentas_has_Usuario_AsesorVentas1`
    FOREIGN KEY (`idAsesorVentas`)
    REFERENCES `RegistroDB`.`AsesorVentas` (`idAsesorVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AsesorVentas_has_Usuario_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `RegistroDB`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `RegistroDB`.`Atencion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RegistroDB`.`Atencion` (
  `idAtencion` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fechaHora` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DNI` CHAR(8) NOT NULL,
  `idAsesorVentas` SMALLINT UNSIGNED NOT NULL,
  `idUsuario` SMALLINT UNSIGNED NOT NULL,
  `token` CHAR(8) NOT NULL,
  PRIMARY KEY (`idAtencion`),
  INDEX `fk_Atencion_Cliente_idx` (`DNI` ASC),
  INDEX `fk_Atencion_UsuarioAsesores1_idx` (`idAsesorVentas` ASC, `idUsuario` ASC),
  CONSTRAINT `fk_Atencion_Cliente`
    FOREIGN KEY (`DNI`)
    REFERENCES `RegistroDB`.`Cliente` (`DNI`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Atencion_UsuarioAsesores1`
    FOREIGN KEY (`idAsesorVentas` , `idUsuario`)
    REFERENCES `RegistroDB`.`UsuarioAsesores` (`idAsesorVentas` , `idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `RegistroDB`.`Sesion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RegistroDB`.`Sesion` (
  `idSesion` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `idUsuario` SMALLINT UNSIGNED NOT NULL,
  `session` VARCHAR(64) NOT NULL,
  `ip` VARCHAR(15) NOT NULL,
  `lastConexion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idSesion`),
  INDEX `fk_Sesion_Usuario1_idx` (`idUsuario` ASC),
  CONSTRAINT `fk_Sesion_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `RegistroDB`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
USE `RegistroDB` ;

-- -----------------------------------------------------
-- Placeholder table for view `RegistroDB`.`Datos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `RegistroDB`.`Datos` (`id` INT);
SHOW WARNINGS;

-- -----------------------------------------------------
-- View `RegistroDB`.`Datos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `RegistroDB`.`Datos`;
SHOW WARNINGS;
USE `RegistroDB`;
CREATE  OR REPLACE VIEW `Datos` AS
with LISTA AS (
select A.fechaHora, C.*, AV.nombreCompleto as asesor
FROM Atencion A, Cliente C, AsesorVentas AV
WHERE A.idAsesorVentas = AV.idAsesorVentas AND A.DNI = C.DNI
UNION
select A.fechaHora, C.*, null as Asesor
FROM Atencion A, Cliente C
WHERE A.DNI = C.DNI AND A.idAsesorVentas is null
) select * from LISTA order by fechaHora desc limit 30;
SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `RegistroDB`.`Distrito`
-- -----------------------------------------------------
START TRANSACTION;
USE `RegistroDB`;
INSERT INTO `RegistroDB`.`Distrito` (`idDistrito`, `nombre`, `porDefecto`) VALUES (DEFAULT, 'SMP', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `RegistroDB`.`Cliente`
-- -----------------------------------------------------
START TRANSACTION;
USE `RegistroDB`;
INSERT INTO `RegistroDB`.`Cliente` (`DNI`, `nombreCompleto`, `telefono`, `idDistrito`) VALUES ('47774578', 'IVAN CAMILOAGA COLLANA', '987236016', 1);
INSERT INTO `RegistroDB`.`Cliente` (`DNI`, `nombreCompleto`, `telefono`, `idDistrito`) VALUES ('70767502', 'DIEGO GUERRA', '944237777', 1);
INSERT INTO `RegistroDB`.`Cliente` (`DNI`, `nombreCompleto`, `telefono`, `idDistrito`) VALUES ('47499790', 'NILA CARRASCO QUEVEDO', '997599757', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `RegistroDB`.`AsesorVentas`
-- -----------------------------------------------------
START TRANSACTION;
USE `RegistroDB`;
INSERT INTO `RegistroDB`.`AsesorVentas` (`idAsesorVentas`, `nombreCompleto`) VALUES (DEFAULT, 'DELIA PEREZ');
INSERT INTO `RegistroDB`.`AsesorVentas` (`idAsesorVentas`, `nombreCompleto`) VALUES (DEFAULT, 'GUSTAVO MANYARI');
INSERT INTO `RegistroDB`.`AsesorVentas` (`idAsesorVentas`, `nombreCompleto`) VALUES (DEFAULT, 'LESLIE ESPINOZA');
INSERT INTO `RegistroDB`.`AsesorVentas` (`idAsesorVentas`, `nombreCompleto`) VALUES (DEFAULT, 'CAJA');
INSERT INTO `RegistroDB`.`AsesorVentas` (`idAsesorVentas`, `nombreCompleto`) VALUES (DEFAULT, 'SAE');

COMMIT;


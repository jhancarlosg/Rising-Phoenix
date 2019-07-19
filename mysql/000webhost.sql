-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

USE `id10198844_registrodb` ;

-- -----------------------------------------------------
-- Table `id10198844_registrodb`.`Distrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `id10198844_registrodb`.`Distrito` (
  `idDistrito` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `porDefecto` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`idDistrito`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `id10198844_registrodb`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `id10198844_registrodb`.`Cliente` (
  `DNI` CHAR(8) NOT NULL,
  `nombreCompleto` VARCHAR(50) NOT NULL,
  `telefono` VARCHAR(12) NULL,
  `idDistrito` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`DNI`),
  INDEX `fk_Cliente_Distrito1_idx` (`idDistrito` ASC) ,
  CONSTRAINT `fk_Cliente_Distrito1`
    FOREIGN KEY (`idDistrito`)
    REFERENCES `id10198844_registrodb`.`Distrito` (`idDistrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `id10198844_registrodb`.`AsesorVentas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `id10198844_registrodb`.`AsesorVentas` (
  `idAsesorVentas` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombreCompleto` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAsesorVentas`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `id10198844_registrodb`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `id10198844_registrodb`.`Usuario` (
  `idUsuario` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `correo` VARCHAR(50) NOT NULL,
  `password` CHAR(64) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `id10198844_registrodb`.`UsuarioAsesores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `id10198844_registrodb`.`UsuarioAsesores` (
  `idAsesorVentas` SMALLINT UNSIGNED NOT NULL,
  `idUsuario` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`idAsesorVentas`, `idUsuario`),
  INDEX `fk_AsesorVentas_has_Usuario_Usuario1_idx` (`idUsuario` ASC) ,
  INDEX `fk_AsesorVentas_has_Usuario_AsesorVentas1_idx` (`idAsesorVentas` ASC) ,
  CONSTRAINT `fk_AsesorVentas_has_Usuario_AsesorVentas1`
    FOREIGN KEY (`idAsesorVentas`)
    REFERENCES `id10198844_registrodb`.`AsesorVentas` (`idAsesorVentas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_AsesorVentas_has_Usuario_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `id10198844_registrodb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `id10198844_registrodb`.`Atencion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `id10198844_registrodb`.`Atencion` (
  `idAtencion` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fechaHora` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DNI` CHAR(8) NOT NULL,
  `idAsesorVentas` SMALLINT UNSIGNED NOT NULL,
  `idUsuario` SMALLINT UNSIGNED NOT NULL,
  `token` CHAR(8) NOT NULL,
  PRIMARY KEY (`idAtencion`),
  INDEX `fk_Atencion_Cliente_idx` (`DNI` ASC) ,
  INDEX `fk_Atencion_UsuarioAsesores1_idx` (`idAsesorVentas` ASC, `idUsuario` ASC) ,
  CONSTRAINT `fk_Atencion_Cliente`
    FOREIGN KEY (`DNI`)
    REFERENCES `id10198844_registrodb`.`Cliente` (`DNI`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Atencion_UsuarioAsesores1`
    FOREIGN KEY (`idAsesorVentas` , `idUsuario`)
    REFERENCES `id10198844_registrodb`.`UsuarioAsesores` (`idAsesorVentas` , `idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `id10198844_registrodb`.`Sesion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `id10198844_registrodb`.`Sesion` (
  `idSesion` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `idUsuario` SMALLINT UNSIGNED NOT NULL,
  `session` VARCHAR(64) NOT NULL,
  `ip` VARCHAR(15) NOT NULL,
  `lastConexion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idSesion`),
  INDEX `fk_Sesion_Usuario1_idx` (`idUsuario` ASC) ,
  CONSTRAINT `fk_Sesion_Usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `id10198844_registrodb`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;


ALTER TABLE `RegistroDB`.`Atencion` 
ADD INDEX `fk_Atencion_UsuarioAsesores1_idx` (`idAsesorVentas` ASC, `idUsuario` ASC);

ALTER TABLE `RegistroDB`.`Atencion` 
ADD CONSTRAINT `fk_Atencion_UsuarioAsesores1`
  FOREIGN KEY (`idAsesorVentas` , `idUsuario`)
  REFERENCES `RegistroDB`.`UsuarioAsesores` (`idAsesorVentas` , `idUsuario`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

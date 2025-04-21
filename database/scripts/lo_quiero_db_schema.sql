SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mysql_lo_quiero
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mysql_lo_quiero`;
CREATE SCHEMA IF NOT EXISTS `mysql_lo_quiero` DEFAULT CHARACTER SET utf8;
USE `mysql_lo_quiero`;

-- -----------------------------------------------------
-- Table `mysql_lo_quiero`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mysql_lo_quiero`.`user`;
CREATE TABLE IF NOT EXISTS `mysql_lo_quiero`.`user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(128) NOT NULL,
  `user_pwd` VARCHAR(80) NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE,
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mysql_lo_quiero`.`object`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mysql_lo_quiero`.`object`;
CREATE TABLE IF NOT EXISTS `mysql_lo_quiero`.`object` (
  `object_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `object_name` VARCHAR(45) NOT NULL,
  `object_description` VARCHAR(255) NOT NULL,
  `object_img` VARCHAR(255) NOT NULL,
  `object_state` ENUM('Disponible', 'Reservado') NOT NULL DEFAULT 'Reservado',
  `object_donor_id` INT UNSIGNED NOT NULL,
  `object_recipient_id` INT UNSIGNED NULL,
  PRIMARY KEY (`object_id`),
  INDEX `fk_object_user_donor_idx` (`object_donor_id` ASC) VISIBLE,
  INDEX `fk_object_user_recipient_idx` (`object_recipient_id` ASC) VISIBLE,
  CONSTRAINT `fk_object_user_donor`
    FOREIGN KEY (`object_donor_id`)
    REFERENCES `mysql_lo_quiero`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_object_user_recipient`
    FOREIGN KEY (`object_recipient_id`)
    REFERENCES `mysql_lo_quiero`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mysql_lo_quiero`.`pickup`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mysql_lo_quiero`.`pickup`;
CREATE TABLE IF NOT EXISTS `mysql_lo_quiero`.`pickup` (
  `pickup_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `pickup_object_id` INT UNSIGNED NOT NULL,
  `pickup_area` VARCHAR(45) NOT NULL,
  `pickup_start_date` DATE NOT NULL,
  `pickup_end_date` DATE NOT NULL,
  PRIMARY KEY (`pickup_id`),
  INDEX `fk_pickup_object_idx` (`pickup_object_id` ASC) VISIBLE,
  CONSTRAINT `fk_pickup_object`
    FOREIGN KEY (`pickup_object_id`)
    REFERENCES `mysql_lo_quiero`.`object` (`object_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
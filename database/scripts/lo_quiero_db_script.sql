-- -----------------------------------------------------
-- Data for table `mysql_lo_quiero`.`user`
-- -----------------------------------------------------
INSERT INTO `mysql_lo_quiero`.`user` (`user_email`, `user_pwd`, `user_name`) VALUES
('ana@example.com', '123456', 'AnaG'),
('benito@example.com', '123456', 'BenitoR'),
('clara@example.com', '123456', 'ClaraM'),
('diego@example.com', '123456', 'DiegoT'),
('elena@example.com', '123456', 'ElenaP'),
('fernando@example.com', '123456', 'FernandoS'),
('gema@example.com', '123456', 'GemaL'),
('hugo@example.com', '123456', 'HugoV'),
('irene@example.com', '123456', 'IreneC'),
('javier@example.com', '123456', 'JavierN'),
('karen@example.com', '123456', 'KarenB'),
('luis@example.com', '123456', 'LuisF'),
('marta@example.com', '123456', 'MartaD'),
('nacho@example.com', '123456', 'NachoE'),
('olga@example.com', '123456', 'OlgaH');

-- -----------------------------------------------------
-- Data for table `mysql_lo_quiero`.`object`
-- -----------------------------------------------------
INSERT INTO `mysql_lo_quiero`.`object` (`object_name`, `object_description`, `object_img`, `object_state`, `object_donor_id`, `object_recipient_id`) VALUES
('Sofá', 'Sofá de 3 plazas, buen estado', 'https://example.com/sofa.jpg', 'Disponible', 1, NULL),
('Mesa', 'Mesa de madera, usada', 'https://example.com/mesa.jpg', 'Reservado', 2, 3),
('Lámpara', 'Lámpara de pie', 'https://example.com/lampara.jpg', 'Disponible', 4, NULL),
('Silla', 'Silla ergonómica', 'https://example.com/silla.jpg', 'Reservado', 5, 6),
('Bicicleta', 'Bici urbana, necesita arreglo', 'https://example.com/bici.jpg', 'Disponible', 7, NULL),
('Televisor', 'TV 32 pulgadas', 'https://example.com/tv.jpg', 'Reservado', 8, 9),
('Estantería', 'Estantería de madera', 'https://example.com/estanteria.jpg', 'Disponible', 10, NULL),
('Cama', 'Cama individual, buen estado', 'https://example.com/cama.jpg', 'Reservado', 11, 12),
('Sillón', 'Sillón reclinable', 'https://example.com/sillon.jpg', 'Disponible', 13, NULL),
('Escritorio', 'Escritorio pequeño', 'https://example.com/escritorio.jpg', 'Reservado', 3, 1);

-- -----------------------------------------------------
-- Data for table `mysql_lo_quiero`.`pickup`
-- -----------------------------------------------------
INSERT INTO `mysql_lo_quiero`.`pickup` (`pickup_object_id`, `pickup_area`, `pickup_start_date`, `pickup_end_date`) VALUES
(2, 'Bilbao', '2025-04-21', '2025-04-25'),
(4, 'Burgos', '2025-04-22', '2025-04-26'),
(6, 'Laredo', '2025-04-23', '2025-04-27'),
(8, 'Sestao', '2025-04-24', '2025-04-28'),
(10, 'Madrid', '2025-04-25', '2025-04-29');
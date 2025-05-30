INSERT INTO `user` (`user_email`, `user_pwd`, `user_name`) VALUES
('ana@example.com', '$2b$10$e8UPwv74SdNEeGLAPqN6IepHdCUxNUAbls5ivNoHZe5oOyGj5qqda', 'AnaG'),
('benito@example.com', '$2b$10$NZOkfajfk4gOcCp7fC/51eUQqHD5YpxBInsUFF.Szw3W.46yD3Kuu', 'BenitoR'),
('clara@example.com', '$2b$10$Wyjx/Hs/AZsdxJjWzWhP3O/DTP0ujH3zojzwhFG1GbiAhU/TsvGti', 'ClaraM'),
('diego@example.com', '$2b$10$DEgYPrWxpoETV7ZJ4NyWAO3pCrbj0MAed83sMkA0sX388izI1ggEq', 'DiegoT'),
('elena@example.com', '$2b$10$1IZc/xR.mR/a5yt7T529G.FsI66/Xg4DIdjbFf/zGvGblQKD7982W', 'ElenaP'),
('fernando@example.com', '$2b$10$6OB1CoyaPsUNywqxfmrBreRm00LJkXevLrbJnnPx6Yp23IdK/1VTq', 'FernandoS'),
('gema@example.com', '$2b$10$0vrI/koixSXhB4J9uZPW2evdpXVujldR4x720dVh0Xdd4.YLU.Pj.', 'GemaL'),
('hugo@example.com', '$2b$10$m/P.zvdOR7Z0ffQTciR6Se0QniQZ.PLWIZG82zrCHBHltD1mpYIbu', 'HugoV'),
('irene@example.com', '$2b$10$hcGG/xIDw98i80xiXZXQs.L1g1bQwCTFT8DIQwpFexwDGi4cFCnye', 'IreneC'),
('javier@example.com', '$2b$10$NQXFWJsrph6ZYGQkTc624Ou1yHdoB62k.xFCiUadEfty8XBf8rFx2', 'JavierN'),
('karen@example.com', '$2b$10$NfwJgfifLTSlryUe1iShgO2WsysplccRoMEjnW9.Mmmd3gRdhx9gq', 'KarenB'),
('luis@example.com', '$2b$10$7lzUv1FNHo1J7JGRGfrDy.8J/MkEzB5VYIo5I6KM9teHyPQQO2sWi', 'LuisF');

INSERT INTO `object` (`object_name`, `object_description`, `object_img`, `object_state`, `object_donor_id`, `object_recipient_id`) VALUES
('Sofá', 'Sofá de 3 plazas, buen estado', 'https://cdn.wallapop.com/images/10420/is/ny/__/c10420p1136537917/i5673913114.jpg?pictureSize=W640', 'Disponible', 1, NULL),
('Mesa', 'Mesa de madera, usada', 'https://cdn.wallapop.com/images/10420/im/e9/__/c10420p1126007969/i5596647213.jpg?pictureSize=W640', 'Reservado', 2, 3),
('Lámpara', 'Lámpara de pie', 'https://cdn.wallapop.com/images/10420/ir/fd/__/c10420p1134458612/i5661373888.jpg?pictureSize=W640', 'Disponible', 4, NULL),
('Silla', 'Silla ergonómica', 'https://cdn.wallapop.com/images/10420/it/3h/__/c10420p1137262249/i5682927998.jpg?pictureSize=W320', 'Reservado', 5, 6),
('Bicicleta', 'Bici urbana, necesita arreglo', 'https://cdn.wallapop.com/images/10420/dv/bb/__/c10420p838656094/i2929079515.jpg?pictureSize=W640', 'Disponible', 7, NULL),
('Televisor', 'TV 32 pulgadas', 'https://cdn.wallapop.com/images/10420/is/mo/__/c10420p1136478960/i5673433329.jpg?pictureSize=W640', 'Reservado', 8, 9),
('Estantería', 'Estantería de madera', 'https://cdn.wallapop.com/images/10420/is/ia/__/c10420p1136273922/i5671915136.jpg?pictureSize=W640', 'Disponible', 10, NULL),
('Cama', 'Cama individual, buen estado', 'https://cdn.wallapop.com/images/10420/it/67/__/c10420p1137390008/i5683925875.jpg?pictureSize=W640', 'Reservado', 11, 12),
('Sillón', 'Sillón reclinable', 'https://cdn.wallapop.com/images/10420/it/0n/__/c10420p1137130791/i5681486785.jpg?pictureSize=W640', 'Disponible', 1, NULL),
('Escritorio', 'Escritorio pequeño', 'https://cdn.wallapop.com/images/10420/is/ri/__/c10420p1136704034/i5675195406.jpg?pictureSize=W640', 'Reservado', 2, 1);

INSERT INTO `pickup` (`pickup_object_id`, `pickup_area`, `pickup_start_date`, `pickup_end_date`) VALUES
(1, 'Bilbao', '2025-05-12', '2025-05-16'),
(2, 'Bilbao', '2025-04-21', '2025-04-25'),
(3, 'Vitoria', '2025-05-13', '2025-05-17'),
(4, 'Burgos', '2025-04-22', '2025-04-26'),
(5, 'Santander', '2025-05-14', '2025-05-18'),
(6, 'Laredo', '2025-04-23', '2025-04-27'),
(7, 'Logroño', '2025-05-15', '2025-05-19'),
(8, 'Sestao', '2025-04-24', '2025-04-28'),
(9, 'Pamplona', '2025-05-16', '2025-05-20'),
(10, 'Madrid', '2025-04-25', '2025-04-29');


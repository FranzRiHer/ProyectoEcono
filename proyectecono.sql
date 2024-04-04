-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2024 at 01:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proyectecono`
--

-- --------------------------------------------------------

--
-- Table structure for table `categoria_egreso`
--

CREATE TABLE `categoria_egreso` (
  `id_categoria_egreso` bigint(20) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoria_egreso`
--

INSERT INTO `categoria_egreso` (`id_categoria_egreso`, `descripcion`, `id_usuario`) VALUES
(5, 'COMIDA', 3),
(6, 'TRASNPORTE', 3),
(7, 'SOCIAL', 3),
(8, 'MATEO', 3);

-- --------------------------------------------------------

--
-- Table structure for table `egreso`
--

CREATE TABLE `egreso` (
  `id_egreso` bigint(20) NOT NULL,
  `cantidad_egreso` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_categoria` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `egreso`
--

INSERT INTO `egreso` (`id_egreso`, `cantidad_egreso`, `descripcion`, `id_usuario`, `id_categoria`) VALUES
(5, 5000, 'Empanada.', NULL, NULL),
(6, 20000, 'trago', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ingreso`
--

CREATE TABLE `ingreso` (
  `id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ingreso`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` varchar(32) NOT NULL,
  `url` varchar(90) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `url`) VALUES
('agregarGastos', '/src/main/resources/static/registroGastos/rGastos.html'),
('agregarIngresos', '/src/main/resources/static/agregarIngresos/agregarIngresos.html'),
('principal', '/src/main/resources/static/principal/index.html'),
('verEgresos', '/src/main/resources/static/verEgresos/verEgresos.html'),
('visualizarIngresos', '/src/main/resources/static/verFuentesIngresos/verFuentesIngreso.html'),
('editarPerfilUser', 'src/main/resources/static/editarPerfilUser/editarPerfilUser.html');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `saldo` int(11) NOT NULL,
  `egreso_total` bigint(20) DEFAULT NULL,
  `ingreso_total` bigint(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` enum('ADMIN','USER') DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `email`, `nombre`, `saldo`, `egreso_total`, `ingreso_total`, `password`, `rol`, `username`) VALUES
(1, 'prueba@', 'user default', 57988, 25000, 82988, NULL, NULL, NULL),
(2, 'user@prueba.com', 'Usuario Prueba', 0, NULL, NULL, '$2a$10$SMAN.NwbyIaRiIasYq6d1u9KJpxU9rilctT2cHzX2JWsmTVUFwtoe', 'USER', 'userTest'),
(3, 'fgasdfa', 'mateo', 0, NULL, NULL, '$2a$10$4.KPET.OPw3JqMBRlpdKR.ucrbOepx16ZFLQhoZoWUsw2T95NxZEu', 'USER', 'mateo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria_egreso`
--
ALTER TABLE `categoria_egreso`
  ADD PRIMARY KEY (`id_categoria_egreso`);

--
-- Indexes for table `egreso`
--
ALTER TABLE `egreso`
  ADD PRIMARY KEY (`id_egreso`),
  ADD KEY `FKcl3v0otyssmqm3qmlgo311r07` (`id_usuario`),
  ADD KEY `FKdgv8xomcpawbgcnvj4s40ooue` (`id_categoria`);

--
-- Indexes for table `ingreso`
--
ALTER TABLE `ingreso`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria_egreso`
--
ALTER TABLE `categoria_egreso`
  MODIFY `id_categoria_egreso` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `egreso`
--
ALTER TABLE `egreso`
  MODIFY `id_egreso` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ingreso`
--
ALTER TABLE `ingreso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `egreso`
--
ALTER TABLE `egreso`
  ADD CONSTRAINT `FKcl3v0otyssmqm3qmlgo311r07` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `FKdgv8xomcpawbgcnvj4s40ooue` FOREIGN KEY (`id_categoria`) REFERENCES `categoria_egreso` (`id_categoria_egreso`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

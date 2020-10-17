-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 17 Okt 2020 pada 05.35
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_manggaChat`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `idUser` varchar(128) NOT NULL,
  `idFriend` varchar(128) NOT NULL,
  `idSender` varchar(128) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `idRoom` varchar(128) NOT NULL,
  `idUser` varchar(128) NOT NULL,
  `status` int(11) NOT NULL,
  `notification` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `members`
--

INSERT INTO `members` (`id`, `idRoom`, `idUser`, `status`, `notification`) VALUES
(35, '78a0662f-9c2c-4a85-bbcf-a643ced7e240', 'cbe87590-82f2-4cea-81b2-571bfeab63f9', 1, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `idRoom` varchar(128) NOT NULL,
  `idUser` varchar(128) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `documentName` varchar(255) DEFAULT NULL,
  `documentUrl` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `messages`
--

INSERT INTO `messages` (`id`, `idRoom`, `idUser`, `location`, `type`, `image`, `message`, `documentName`, `documentUrl`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(177, '78a0662f-9c2c-4a85-bbcf-a643ced7e240', 'cbe87590-82f2-4cea-81b2-571bfeab63f9', NULL, 6, NULL, 'Create Group Public', NULL, NULL, '2020-10-17 01:22:02', '2020-10-17 01:22:02', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `idRoom` varchar(255) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(255) DEFAULT '',
  `idSender` varchar(255) NOT NULL DEFAULT '',
  `idReceiver` varchar(255) NOT NULL DEFAULT '',
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `rooms`
--

INSERT INTO `rooms` (`id`, `idRoom`, `name`, `description`, `idSender`, `idReceiver`, `type`) VALUES
(33, '78a0662f-9c2c-4a85-bbcf-a643ced7e240', 'Public', '', '', '', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `token`
--

CREATE TABLE `token` (
  `token` varchar(255) NOT NULL,
  `idUser` varchar(128) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` varchar(128) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `username` varchar(32) DEFAULT '',
  `password` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT '',
  `image` varchar(266) DEFAULT '',
  `phoneNumber` varchar(15) DEFAULT '',
  `bio` varchar(255) DEFAULT '',
  `statusAccount` int(11) NOT NULL DEFAULT 0,
  `statusOnline` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`, `location`, `image`, `phoneNumber`, `bio`, `statusAccount`, `statusOnline`, `createdAt`, `updatedAt`) VALUES
('cbe87590-82f2-4cea-81b2-571bfeab63f9', 'Cep Guna Widodo', 'cepgunawidodo@gmail.com', 'cepguna', '$2b$12$3U9qpsMtoE4Is4R4CUtUZuWOw.B7xTO74s38ydsYzDjw608rD8ZUG', '{\"lat\":-6.9369856,\"lng\":107.60683519999999}', 'http://localhost:4000/uploads/56fm956fdv.jpeg', '886644566', 'Bio Saya Belum Diubah :D', 1, 0, '2020-10-15 05:12:38', '2020-10-15 05:12:38');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`token`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT untuk tabel `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT untuk tabel `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

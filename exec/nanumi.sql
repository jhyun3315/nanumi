-- --------------------------------------------------------
-- 호스트:                          k8b103.p.ssafy.io
-- 서버 버전:                        10.6.12-MariaDB-1:10.6.12+maria~ubu2004 - mariadb.org binary distribution
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- nanumi 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `nanumi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `nanumi`;

-- 테이블 nanumi.address 구조 내보내기
CREATE TABLE IF NOT EXISTS `address` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dong` varchar(20) NOT NULL,
  `gugun` varchar(20) NOT NULL,
  `si` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5013032027 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 nanumi.authority 구조 내보내기
CREATE TABLE IF NOT EXISTS `authority` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `user` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl6unfw8ukfyeamvenxgqtp1op` (`user`),
  CONSTRAINT `FKl6unfw8ukfyeamvenxgqtp1op` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 nanumi.blacklists 구조 내보내기
CREATE TABLE IF NOT EXISTS `blacklists` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `is_blocked` tinyint(4) NOT NULL,
  `blocker_id` bigint(20) DEFAULT NULL,
  `target_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKslj21ofq236buesbnkk0eapep` (`blocker_id`),
  KEY `FKqmsufdw5pyoaujwjah8ne7mhb` (`target_id`),
  CONSTRAINT `FKqmsufdw5pyoaujwjah8ne7mhb` FOREIGN KEY (`target_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKslj21ofq236buesbnkk0eapep` FOREIGN KEY (`blocker_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 nanumi.categories 구조 내보내기
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 nanumi.login_provider 구조 내보내기
CREATE TABLE IF NOT EXISTS `login_provider` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 nanumi.matches 구조 내보내기
CREATE TABLE IF NOT EXISTS `matches` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `is_matching` tinyint(4) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `receiver_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtbdwkl1vi1wi1ykr6jhnv3eti` (`product_id`),
  KEY `FKcyx1k02ylc53eba8u0g4n908s` (`receiver_id`),
  CONSTRAINT `FKcyx1k02ylc53eba8u0g4n908s` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKtbdwkl1vi1wi1ykr6jhnv3eti` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 nanumi.products 구조 내보내기
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `content` text NOT NULL,
  `is_closed` tinyint(4) NOT NULL,
  `is_deleted` tinyint(4) NOT NULL,
  `is_matched` tinyint(4) NOT NULL,
  `name` varchar(10) NOT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfk5aqfv8mvcjodux5ivnnio8f` (`address_id`),
  KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`),
  KEY `FKdb050tk37qryv15hd932626th` (`user_id`),
  CONSTRAINT `FKdb050tk37qryv15hd932626th` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKfk5aqfv8mvcjodux5ivnnio8f` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 nanumi.product_images 구조 내보내기
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqnq71xsohugpqwf3c9gxmsuy` (`product_id`),
  CONSTRAINT `FKqnq71xsohugpqwf3c9gxmsuy` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 nanumi.reports 구조 내보내기
CREATE TABLE IF NOT EXISTS `reports` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `content` text NOT NULL,
  `status` tinyint(4) NOT NULL,
  `stop_date` int(11) NOT NULL DEFAULT 0,
  `reported_id` bigint(20) DEFAULT NULL,
  `reporter_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs5hp3xww9pl0bwblxl3cfwue2` (`reported_id`),
  KEY `FKd3qiw2om5d2oh5xb7fbdcq225` (`reporter_id`),
  CONSTRAINT `FKd3qiw2om5d2oh5xb7fbdcq225` FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKs5hp3xww9pl0bwblxl3cfwue2` FOREIGN KEY (`reported_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 nanumi.reviews 구조 내보내기
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `content` text NOT NULL,
  `rating` int(11) NOT NULL,
  `star_point` int(11) NOT NULL,
  `match_id` bigint(20) DEFAULT NULL,
  `receiver_id` bigint(20) DEFAULT NULL,
  `writer_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgmo2xuu579x0j852bta90eahd` (`match_id`),
  KEY `FK77qnqsbwjkgvrto39r56vv03b` (`receiver_id`),
  KEY `FKf0l51dg2l9fd7r3q1s71hwdod` (`writer_id`),
  CONSTRAINT `FK77qnqsbwjkgvrto39r56vv03b` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKf0l51dg2l9fd7r3q1s71hwdod` FOREIGN KEY (`writer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKgmo2xuu579x0j852bta90eahd` FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 nanumi.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `email` varchar(50) NOT NULL,
  `fcm_token` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(64) NOT NULL,
  `profile_url` varchar(150) DEFAULT NULL,
  `address_id` bigint(20) DEFAULT NULL,
  `login_provider` int(11) DEFAULT NULL,
  `user_info_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKditu6lr4ek16tkxtdsne0gxib` (`address_id`),
  KEY `FKlieofo2m6xg9syjpht9rk9i54` (`login_provider`),
  KEY `FK5wvwve0r2ex1otm6pil40qbhl` (`user_info_id`),
  CONSTRAINT `FK5wvwve0r2ex1otm6pil40qbhl` FOREIGN KEY (`user_info_id`) REFERENCES `user_info` (`id`),
  CONSTRAINT `FKditu6lr4ek16tkxtdsne0gxib` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `FKlieofo2m6xg9syjpht9rk9i54` FOREIGN KEY (`login_provider`) REFERENCES `login_provider` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 nanumi.user_info 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `give_count` int(11) NOT NULL DEFAULT 0,
  `given_count` int(11) NOT NULL DEFAULT 0,
  `rating_count` int(11) NOT NULL DEFAULT 0,
  `rating_total` int(11) NOT NULL DEFAULT 0,
  `refresh_token` varchar(255) DEFAULT NULL,
  `reported_total_count` int(11) NOT NULL DEFAULT 0,
  `star_count` int(11) NOT NULL DEFAULT 0,
  `star_total` int(11) NOT NULL DEFAULT 0,
  `stop_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `temperature` double NOT NULL DEFAULT 0,
  `tier` varchar(20) DEFAULT '새싹',
  `visit_count` bigint(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

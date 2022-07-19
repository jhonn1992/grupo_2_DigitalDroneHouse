CREATE DATABASE droneDigitalHouseDB;

CREATE TABLE `products` (
   `product_id` INT NOT NULL AUTO_INCREMENT,
   `product_name` VARCHAR(100) NOT NULL,
   `reference` VARCHAR(50),
   `image` VARCHAR(200) NOT NULL,
   `category_id` INT NOT NULL,
   `price` DOUBLE NOT NULL,
   `features1` VARCHAR(100),
   `features2` VARCHAR(100),
   `features3` VARCHAR(100),
   `features4` VARCHAR(100),
   PRIMARY KEY (`product_id`)
);

CREATE TABLE `categories` (
   `category_id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`category_id`)
);

CREATE TABLE `users` (
   `user_id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `lastName` VARCHAR(100) NOT NULL,
   `email` VARCHAR(50) NOT NULL,
   `password` VARCHAR(20) NOT NULL,
   `rol_id` INT NOT NULL,
   `avatar` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`user_id`)
);

CREATE TABLE `roles` (
   `rol_id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(50) NOT NULL,
   PRIMARY KEY (`rol_id`)
);


ALTER TABLE `products` ADD CONSTRAINT `FK_category` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_rol` FOREIGN KEY (`rol_id`) REFERENCES `roles`(`rol_id`)  ;

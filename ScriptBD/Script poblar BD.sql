-- Poblar categories 
INSERT INTO categories (name)
VALUES ('drone');
INSERT INTO categories (name)
VALUES ('accesory');

-- Poblar tabla roles
INSERT INTO roles (name)
VALUES ('administrator');
INSERT INTO roles (name)
VALUES ('customer');
INSERT INTO roles (name)
VALUES ('seller');

-- Poblar tabla products
INSERT INTO products (product_name, reference, image, category_id, price, features1, features2, features3, features4)
VALUES ('DJI Mavic 3', 'ND-filer-set', 'mavic-air-2.png', 1, 2049, '4/3 CMOS Hasselblad Camera', '46 Minutes of Flight Time', '15km Max Transmission Range', 'Apple ProRes 422 HQ');

INSERT INTO products (product_name, reference, image, category_id, price, features1, features2, features3, features4)
VALUES ('DJI Air 2S', 'Smart Controller', 'DJI-AIR-2S.png', 1, 1499, '1-Inch CMOS Sensor', '5.4K Video', 'MasterShots', '12km 1080p Transmission');

INSERT INTO products (product_name, reference, image, category_id, price, features1, features2, features3, features4)
VALUES ('DJI Mini 3 Pro', 'DJI RC', 'DJI-mini-3-pro.png', 1, 909, 'Weighs Less than 249 g', 'Tri-Directional Obstacle Sensing (Forward/Backward/Downward)', 'Record Up to 4K/60fps Video and 4K/30fps HDR Video', '34-min Max Flight Time');

INSERT INTO products (product_name, reference, image, category_id, price, features1, features2, features3, features4)
VALUES ('DJI Pocket 2', 'pocket 2 creator', 'dji-pocket.png', 2, 499, 'Pocket-Sized', '3-Axis Stabilization', '64MP Photo', '4K/60fps Video');

INSERT INTO products (product_name, reference, image, category_id, price, features1, features2, features3, features4)
VALUES ('DJI Action 2 Dual-Screen Combo', 'Skelly', 'dji-action.png', 2, 519, 'Versatile Magnetic Design', 'Portable & Wearable', '4K/120fps & Super-Wide FOV', 'HorizonSteady');

INSERT INTO products (product_name, reference, image, category_id, price, features1, features2, features3, features4)
VALUES ('DJI RS 2', 'Vertical Camera Mount', 'stabilizer-rs2.png', 2, 759, 'Versatile Magnetic Design', null, null, null);

-- Poblar tabla users
INSERT INTO users (name, lastName, email, password, rol_id, avatar)
VALUES ('Rocío', 'Álvarez', 'jorge.polania@dg.com', '$2a$10$euPpcxL2La.Sd5Gxy1SXI./jA2/tQkDLA1ioTlOMFDWYkIP9QTyJK', 1, 'defaultAvatar.png');

INSERT INTO users (name, lastName, email, password, rol_id, avatar)
VALUES ('Rocío', 'Álvarez', 'jorge.polania@dg.com', '$2a$10$euPpcxL2La.Sd5Gxy1SXI./jA2/tQkDLA1ioTlOMFDWYkIP9QTyJK', 2, 'defaultAvatar.png');

INSERT INTO users (name, lastName, email, password, rol_id, avatar)
VALUES ('Rocío', 'Álvarez', 'rocio.alvarez@dg.com', '$2a$10$euPpcxL2La.Sd5Gxy1SXI./jA2/tQkDLA1ioTlOMFDWYkIP9QTyJK', 3, 'defaultAvatar.png');

INSERT INTO users (name, lastName, email, password, rol_id, avatar)
VALUES ('Rocío', 'Álvarez', 'rocio.alvarez@dg.com', '$2a$10$euPpcxL2La.Sd5Gxy1SXI./jA2/tQkDLA1ioTlOMFDWYkIP9QTyJK', 2, 'defaultAvatar.png');

INSERT INTO users (name, lastName, email, password, rol_id, avatar)
VALUES ('Rocío', 'Álvarez', 'rocio.alvarez@dg.com', '$2a$10$euPpcxL2La.Sd5Gxy1SXI./jA2/tQkDLA1ioTlOMFDWYkIP9QTyJK', 3, 'defaultAvatar.png');

INSERT INTO users (name, lastName, email, password, rol_id, avatar)
VALUES ('Rocío', 'Álvarez', 'rocio.alvarez@dg.com', '$2a$10$euPpcxL2La.Sd5Gxy1SXI./jA2/tQkDLA1ioTlOMFDWYkIP9QTyJK', 2, 'defaultAvatar.png');

INSERT INTO users (name, lastName, email, password, rol_id, avatar)
VALUES ('Rocío', 'Álvarez', 'rocio.alvarez@dg.com', '$2a$10$euPpcxL2La.Sd5Gxy1SXI./jA2/tQkDLA1ioTlOMFDWYkIP9QTyJK', 3, 'defaultAvatar.png');

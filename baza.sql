-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: avto
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `avto`
--

DROP TABLE IF EXISTS `avto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `avto` (
  `idAvto` int(11) NOT NULL AUTO_INCREMENT,
  `letnik` int(11) NOT NULL,
  `kilometri` int(11) NOT NULL,
  `cena` float NOT NULL,
  `opis` varchar(10000) NOT NULL,
  `pogon4` tinyint(1) NOT NULL,
  `datumObjave` int(11) NOT NULL,
  `model_idModel` int(11) NOT NULL,
  `model_znamka_idZnamka` int(11) NOT NULL,
  `gorivo_idGorivo` int(11) NOT NULL,
  `vrata_idVrata` int(11) NOT NULL,
  `menjalnik_idMenjalnik` int(11) NOT NULL,
  `uporabnik_idUporabnik` int(11) NOT NULL,
  PRIMARY KEY (`idAvto`,`model_idModel`,`model_znamka_idZnamka`,`gorivo_idGorivo`,`vrata_idVrata`,`menjalnik_idMenjalnik`,`uporabnik_idUporabnik`),
  KEY `fk_avto_model1_idx` (`model_idModel`,`model_znamka_idZnamka`),
  KEY `fk_avto_gorivo1_idx` (`gorivo_idGorivo`),
  KEY `fk_avto_vrata1_idx` (`vrata_idVrata`),
  KEY `fk_avto_menjalnik1_idx` (`menjalnik_idMenjalnik`),
  KEY `fk_avto_uporabnik1_idx` (`uporabnik_idUporabnik`),
  CONSTRAINT `fk_avto_gorivo1` FOREIGN KEY (`gorivo_idGorivo`) REFERENCES `gorivo` (`idGorivo`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_avto_menjalnik1` FOREIGN KEY (`menjalnik_idMenjalnik`) REFERENCES `menjalnik` (`idMenjalnik`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_avto_model1` FOREIGN KEY (`model_idModel`, `model_znamka_idZnamka`) REFERENCES `model` (`idModel`, `znamka_idZnamka`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_avto_uporabnik1` FOREIGN KEY (`uporabnik_idUporabnik`) REFERENCES `uporabnik` (`idUporabnik`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_avto_vrata1` FOREIGN KEY (`vrata_idVrata`) REFERENCES `vrata` (`idVrata`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avto`
--

LOCK TABLES `avto` WRITE;
/*!40000 ALTER TABLE `avto` DISABLE KEYS */;
INSERT INTO `avto` VALUES (7,2020,1000,10000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',0,1741689285,11,680,15,7,9,8),(8,2020,100,15000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',0,1741689322,11,680,17,6,9,8),(9,2024,50,50000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',1,1741689349,10,680,14,7,8,8),(10,2020,15000,600,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',1,1741689383,14,681,14,7,9,8),(11,2020,500,17000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',1,1741689427,16,681,15,6,8,8),(12,2016,150000,5000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',0,1741689461,39,687,14,6,9,8),(13,2024,100,100000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',1,1741689489,43,688,14,7,9,8),(14,2023,10000,150000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',1,1741689523,51,690,16,6,9,8),(15,2013,100,600,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',0,1741689562,69,695,17,6,8,8),(16,2020,500,9000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',0,1741689595,26,684,15,5,8,8),(17,2025,1,160000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',0,1741689659,21,683,15,4,8,10),(18,2006,200000,1000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',1,1741689844,48,689,14,6,9,10),(19,2015,1000,7500,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',0,1741689879,12,680,17,6,9,10),(20,2025,100,90000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',1,1741689910,40,687,14,6,9,10),(21,2010,1000,11000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',1,1741689939,36,686,17,6,8,10),(22,2019,15000,16000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',0,1741689975,59,692,15,5,9,10),(23,2022,50000,16000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',0,1741690011,52,690,16,6,9,10),(24,2022,15000,26000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',1,1741690049,65,694,14,7,9,10),(25,2024,100,110000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',1,1741690077,68,694,16,7,9,10),(26,2022,1500,35000,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dui odio, vulputate vel turpis at, rutrum vehicula purus. Vestibulum eget sodales lectus, quis viverra nisi. Aliquam posuere lectus quis purus finibus lacinia. Vestibulum sed lacinia diam, non laoreet velit. Maecenas ultrices a risus et vehicula. Ut euismod a nulla ut.',0,1741690131,12,680,16,5,9,10);
/*!40000 ALTER TABLE `avto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `geslo`
--

DROP TABLE IF EXISTS `geslo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `geslo` (
  `idGeslo` int(11) NOT NULL AUTO_INCREMENT,
  `geslo` varchar(255) NOT NULL,
  `email` varchar(45) NOT NULL,
  `uporabnik_idUporabnik` int(11) NOT NULL,
  PRIMARY KEY (`idGeslo`,`uporabnik_idUporabnik`),
  KEY `fk_geslo_uporabnik1_idx` (`uporabnik_idUporabnik`),
  CONSTRAINT `fk_geslo_uporabnik1` FOREIGN KEY (`uporabnik_idUporabnik`) REFERENCES `uporabnik` (`idUporabnik`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `geslo`
--

LOCK TABLES `geslo` WRITE;
/*!40000 ALTER TABLE `geslo` DISABLE KEYS */;
INSERT INTO `geslo` VALUES (5,'$2b$12$5emZWVNsKOSMvqEN/mUU8OsRBG5oswkfF6HSIKf2sCbhqSp2BJJ2K','test@test.si',8),(7,'$2b$12$Z9w26f1KFIHy2coVioZKheogZt/eUp/A0K814nP0dR4QCZH2Ricju','test1@test.si',10);
/*!40000 ALTER TABLE `geslo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gorivo`
--

DROP TABLE IF EXISTS `gorivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `gorivo` (
  `idGorivo` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(45) NOT NULL,
  PRIMARY KEY (`idGorivo`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gorivo`
--

LOCK TABLES `gorivo` WRITE;
/*!40000 ALTER TABLE `gorivo` DISABLE KEYS */;
INSERT INTO `gorivo` VALUES (14,'dizel'),(15,'bencin'),(16,'elektrika'),(17,'hibrid');
/*!40000 ALTER TABLE `gorivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menjalnik`
--

DROP TABLE IF EXISTS `menjalnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `menjalnik` (
  `idMenjalnik` int(11) NOT NULL AUTO_INCREMENT,
  `vrsta` varchar(45) NOT NULL,
  PRIMARY KEY (`idMenjalnik`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menjalnik`
--

LOCK TABLES `menjalnik` WRITE;
/*!40000 ALTER TABLE `menjalnik` DISABLE KEYS */;
INSERT INTO `menjalnik` VALUES (8,'ročni'),(9,'avtomatski');
/*!40000 ALTER TABLE `menjalnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `model` (
  `idModel` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(45) NOT NULL,
  `znamka_idZnamka` int(11) NOT NULL,
  PRIMARY KEY (`idModel`,`znamka_idZnamka`),
  KEY `fk_model_znamka_idx` (`znamka_idZnamka`),
  CONSTRAINT `fk_model_znamka` FOREIGN KEY (`znamka_idZnamka`) REFERENCES `znamka` (`idZnamka`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES (10,'4Runner',680),(11,'Prius',680),(12,'Yaris',680),(13,'RAV4',680),(14,'Golf',681),(15,'Polo',681),(16,'Tiguan',681),(17,'Passat',681),(18,'Civic',682),(19,'Accord',682),(20,'CR-V',682),(21,'Mustang',683),(22,'Focus',683),(23,'Fiesta',683),(24,'Ranger',683),(25,'Kona',684),(26,'I10',684),(27,'Ioniq 5',684),(28,'SantaFe',684),(29,'Leaf',685),(30,'Qashqai',685),(31,'Juke',685),(32,'Pathfinder',685),(33,'Jimny',686),(34,'Swift',686),(35,'S-cross',686),(36,'SX4',686),(37,'M5',687),(38,'X1',687),(39,'X3',687),(40,'M60i',687),(41,'C Class',688),(42,'S Class',688),(43,'G Wagon',688),(44,'GLE',688),(45,'A4',689),(46,'A5',689),(47,'Q3',689),(48,'Q5',689),(49,'Model Y',690),(50,'Model X',690),(51,'Model S',690),(52,'Model 3',690),(53,'Clio',691),(54,'Captur',691),(55,'Twingo',691),(56,'Kadjar',691),(57,'208',692),(58,'308',692),(59,'3008',692),(60,'5008',692),(61,'500',693),(62,'Panda',693),(63,'Tipo',693),(64,'Multipla',693),(65,'Karoq',694),(66,'Octavia',694),(67,'Superb',694),(68,'Enyaq',694),(69,'XC90',695),(70,'V60',695),(71,'S90',695),(72,'XC40',695);
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uporabnik`
--

DROP TABLE IF EXISTS `uporabnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `uporabnik` (
  `idUporabnik` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(45) NOT NULL,
  `priimek` varchar(45) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`idUporabnik`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uporabnik`
--

LOCK TABLES `uporabnik` WRITE;
/*!40000 ALTER TABLE `uporabnik` DISABLE KEYS */;
INSERT INTO `uporabnik` VALUES (8,'test','test',1,'test@test.si'),(10,'test1','test1',0,'test1@test.si');
/*!40000 ALTER TABLE `uporabnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vrata`
--

DROP TABLE IF EXISTS `vrata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `vrata` (
  `idVrata` int(11) NOT NULL AUTO_INCREMENT,
  `kolicina` int(11) NOT NULL,
  PRIMARY KEY (`idVrata`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vrata`
--

LOCK TABLES `vrata` WRITE;
/*!40000 ALTER TABLE `vrata` DISABLE KEYS */;
INSERT INTO `vrata` VALUES (4,2),(5,3),(6,4),(7,5);
/*!40000 ALTER TABLE `vrata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `znamka`
--

DROP TABLE IF EXISTS `znamka`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `znamka` (
  `idZnamka` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(45) NOT NULL,
  PRIMARY KEY (`idZnamka`)
) ENGINE=InnoDB AUTO_INCREMENT=696 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `znamka`
--

LOCK TABLES `znamka` WRITE;
/*!40000 ALTER TABLE `znamka` DISABLE KEYS */;
INSERT INTO `znamka` VALUES (680,'Toyota'),(681,'Volkswagen'),(682,'Honda'),(683,'Ford'),(684,'Hyundai'),(685,'Nissan'),(686,'Suzuki'),(687,'BMW'),(688,'Mercedes-Benz'),(689,'Audi'),(690,'Tesla'),(691,'Renault'),(692,'Peugeot'),(693,'Fiat'),(694,'Skoda'),(695,'Volvo');
/*!40000 ALTER TABLE `znamka` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-11 11:51:28

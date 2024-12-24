-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: movie-app
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `year_of_creation` int NOT NULL DEFAULT '2023',
  `rated` varchar(10) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `imdb_rating` double DEFAULT NULL,
  `genre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `genre_check` CHECK ((`genre` in (_utf8mb4'UNKNOWN',_utf8mb4'ADVENTURE',_utf8mb4'ACTION',_utf8mb4'DRAMA',_utf8mb4'ROMANCE',_utf8mb4'SPORTS',_utf8mb4'COMEDY',_utf8mb4'THRILLER',_utf8mb4'HORROR',_utf8mb4'NARRATION',_utf8mb4'SHOOTER')))
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (24,'The Dark Knight',2008,'PG-13','When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',9,'ACTION'),(25,'Forrest Gump',1994,'PG-13','The presidencies of Kennedy and Johnson, the Vietnam War, the Civil Rights Movement, and other historical events unfold from the perspective of an Alabama man with an extraordinary ability to run.',8.8,'DRAMA'),(26,'Inception',2010,'PG-13','A thief who enters the dreams of others to steal secrets from their subconscious is given the task of planting an idea into the mind of a CEO.',8.8,'ACTION'),(27,'The Matrix',1999,'R','A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',8.7,'ACTION'),(28,'The Lord of the Rings: The Return of the King',2003,'PG-13','Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',8.9,'ADVENTURE'),(29,'Fight Club',1999,'R','An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soap maker.',8.8,'DRAMA'),(30,'The Silence of the Lambs',1991,'R','A young F.B.I. cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer who skins his victims.',8.6,'THRILLER'),(31,'Interstellar',2014,'PG-13','A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',8.6,'DRAMA'),(32,'Parasite',2019,'R','Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',8.6,'DRAMA'),(33,'The Avengers',2012,'PG-13','Earth\'s mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.',8,'ACTION'),(34,'Shutter Island',2010,'R','A U.S Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.',8.1,'THRILLER'),(35,'Jaws',1975,'PG','A great white shark terrorizes a small island community, and it is up to a police chief, a marine biologist, and a professional shark hunter to stop it.',8,'THRILLER'),(36,'Pulp Fiction',1994,'R','The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',8.9,'DRAMA'),(38,'Gladiator',2000,'R','A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',8.5,'ACTION'),(39,'The Lion King',1994,'G','Lion prince Simba and his father are targeted by his evil uncle, who wants to ascend the throne himself.',8.5,'DRAMA'),(41,'Star Wars: Episode IV - A New Hope',1977,'PG','Luke Skywalker joins forces with a Jedi knight, a cocky pilot, a Wookiee, and two droids to rescue Princess Leia from the clutches of the evil Empire.',8.6,'ADVENTURE'),(42,'The Prestige',2006,'PG-13','Two magicians engage in a bitter rivalry, each trying to best the other with ever-more elaborate tricks, leading them down a dangerous path.',8.5,'THRILLER'),(43,'The Shawshank Redemption',2023,NULL,'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',9.3,'DRAMA'),(44,'movie',2023,NULL,'this movie is Added by Admin Adel',9.9,'ACTION');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_admin` tinyint NOT NULL DEFAULT '0',
  `email` varchar(45) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,0,'john.doe@example.com','$2a$10$5j3CIFk7iPIrA34wsNRYXO9LOLABLcCnfX9XS.tDN43yMuryR1bCK'),(2,0,'sssh@gmail.com','$2a$10$cZJ.vIfOaaBtBIXwHonX6eTVhB.WcBjjP.6kwMvB6VRq7me6DZzI.'),(3,0,'admin@admin.com','$2a$10$V917CdowhkhKtz2pk8avweWUEO0b5s3vbc81uekOOxlT5s8WowaZO'),(4,0,'sssh@admin.com','$2a$10$MfGcCwZe8gQ12eFzRehz9Ob8vMpS.iDwCLco4Udz80iUubO.lFEl.'),(5,0,'sara@asd.com','$2a$10$ma020mpgXPxtvQEEYtdra.9b8tKY9eurcfvLolZ91Iws9AQB4nskC'),(6,0,'ad@admin.com','$2a$10$XFgywdd9N2RBUwNfuaARi.LK3VrhKbcEXDdhFxFywBNj/WYJqSa8y'),(7,1,'sara@Admin.com','$2a$10$g5Npo.LJe44bHjQgbQQgMOHkGyU99/0Dai2Sew4MMiCheMj96aaei'),(8,1,'Adel@admin.com','$2a$10$6c7R95.jhjbJDeNYc/zTkuVRwW2RSWpSmKhO56v9Hzxj1gsAp7lU2'),(11,0,'mo@user.com','$2a$10$evgWFfPmXXnVH64VCTN5l.vUm2zSTgI2LbFLIvgyAE0CcHRuz8AXG'),(12,0,'aaaaaaa@aaaa.com','$2a$10$.YfxRF29TawTc/ZWiQE6ouZ1/RIFBfZKkyb4Q1CfEo3btBdMsX1gu'),(13,0,'jsaal@user.com','$2a$10$2FIHm2DU0qakP1E5MnEZf.lrh.fRHJkeQuRIfcheht0xonN37smo2'),(14,0,'yara@user.com','$2a$10$GVtg8MiPgLtarBlUXD.mwOlSXzcSQPuMme3YBzJTc1XyRlTt0gcsS'),(15,0,'lara@user.com','$2a$10$9u02UOPnwMCuF9NQ1/aoQOxt8RneS2LthwrBleg6Rn7ThmA8JKsCq'),(16,0,'lama@user.com','$2a$10$3Wo.XQsbN.W7zFiwycbwZOfGyw3HiNvr0x7Eft.rg4ivOuQBb78py'),(17,0,'mohga@user.com','$2a$10$gz89J82FTKM6vWAR59cLJOk3aZ8pQoy0VIAArKL.xYc0/4WX7HA.m'),(18,0,'sara@sara.sara','$2a$10$eOZk4HUtRZjghuCXYu7FMeg5g91BRvq4JSPOy9/obVPnvOksOWz0e');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'movie-app'
--

--
-- Dumping routines for database 'movie-app'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-24 19:00:18

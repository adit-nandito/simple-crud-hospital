-- Create the database
CREATE DATABASE SiloamDB;
USE SiloamDB;

-- Create patients table
CREATE TABLE patients (
    id_patient VARCHAR(25) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('MALE', 'FEMALE') NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100),
    address VARCHAR(255),
    INDEX (id_patient)
);

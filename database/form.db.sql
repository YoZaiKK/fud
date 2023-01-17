-- Base de datos: `proyecto_fud`
--
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `antescedentes`
--
CREATE TABLE `antescedentes` (
  `CURP3` varchar(18) NOT NULL,
  `DenuncioMP` int(11) NOT NULL,
  `FechaMP` date NULL,
  `CompetenciaMP` int(11) NULL,
  `EntidadFedMP` varchar(50) NULL,
  `DelitoMP` varchar(100) NULL,
  `EstadoMP` varchar(100) NULL,
  `ExistePJ` int(11) NOT NULL,
  `CompetenciaPJ` int(11) NULL,
  `FechaPJ` date NULL,
  `EntidadFedPJ` varchar(50) NULL,
  `DelitoPJ` varchar(100) NULL,
  `EstadoPJ` varchar(100) NOT NULL,
  `PresentoQ` int(11) NOT NULL,
  `FechaQ` date NULL,
  `CompetenciaQ` int(11) NULL,
  `EntidadFedQ` varchar(50) NULL,
  `DelitoQ` varchar(100) NULL,
  `EstadoQ` varchar(100) NULL
);

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `funcionario`
--
CREATE TABLE `funcionario` (
  `Nombre` char(50) NOT NULL,
  `ApellidoP` char(20) NOT NULL,
  `ApellidoM` char(20) NOT NULL,
  `RFC` varchar(13) NOT NULL,
  `Contrasena` varchar(10) NOT NULL,
  `Ocupacion` char(30) NOT NULL,
  `IsAdmin` varchar(20) NULL
);

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `informacionext`
--
CREATE TABLE `informacionext` (
  `CURP4` varchar(18) NOT NULL,
  `Tutor` char(100) NULL,
  `Edad` int NULL,
  `Telefonos` varchar(50) NULL,
  `SituacionCalle` int(11) NOT NULL,
  `Discapacidad` int(11) NOT NULL,
  `Tipo` int(11) NULL,
  `Dependencia` int(11) NULL,
  `Migrante` int(11) NOT NULL,
  `Pais` char(20) NULL,
  `HablaEspanol` int(11) NOT NULL,
  `RequiereTra` int(11) NULL,
  `ComunidadInd` int(11) NOT NULL,
  `Comunidad` varchar(30) NOT NULL
);

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `solicitante`
--
CREATE TABLE `solicitante` (
  `CURP2` varchar(18) NOT NULL,
  `TipoSolicitante` int(11) NOT NULL,
  `Nombre` char(100) NOT NULL,
  `EsTutor` int(11) NULL,
  `Cargo` char(50) NULL,
  `Departamento` varchar(30) NULL
);

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `victima`
--
CREATE TABLE `victima` (
  `NumCaso` int(11) NOT NULL,
  `CURP` varchar(18) NOT NULL,
  `TipoVictima` int(11) NOT NULL,
  `Nombre` char(100) NOT NULL,
  `Fecha` date NOT NULL,
  `Sexo` int(11) NOT NULL,
  `Nacionalidad` varchar(30) NOT NULL,
  `Pais` char(20) NOT NULL,
  `Entidad` char(30) NOT NULL,
  `Delegacion` char(30) NOT NULL,
  `Calle` varchar(30) NOT NULL,
  `Colonia` varchar(30) NOT NULL,
  `NumExt` int(11) NOT NULL,
  `NumInt` int(11) NOT NULL,
  `CodPostal` varchar(10) NOT NULL,
  `Localidad` varchar(30) NOT NULL,
  `DelegacionR` varchar(30) NOT NULL,
  `EntidadFedR` varchar(30) NOT NULL,
  `TipoDano` int(11) NOT NULL,
  `ObervacionTD` varchar(200) NOT NULL,
  `HechosVict` int(11) NOT NULL,
  `ObservacionHV` varchar(200) NOT NULL
);

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `RelVictima`
--
CREATE TABLE `relVictima` (
  `CURP1` varchar(20) NOT NULL,
  `Nombre` char(100) NOT NULL,
  `Sexo` int(11) NOT NULL,
  `RelVictima` varchar(30) NOT NULL
);

--
-- Indices de la tabla `antescedentes`
--
ALTER TABLE
  `antescedentes`
ADD
  KEY (`CURP3`);

--
-- Indices de la tabla `funcionario`
--
ALTER TABLE
  `funcionario`
ADD
  PRIMARY KEY (`RFC`);

--
-- Indices de la tabla `informacionext`
--
ALTER TABLE
  `informacionext`
ADD
  KEY (`CURP4`);

--
-- Indices de la tabla `RelVictima`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
--
ALTER TABLE
  `relVictima`
ADD
  KEY (`CURP1`);

--
-- Indices de la tabla `solicitante`
--
ALTER TABLE
  `solicitante`
ADD
  KEY (`CURP2`);

--
-- Indices de la tabla `victima`
--
ALTER TABLE
  `victima`
ADD
  PRIMARY KEY (`CURP`),
ADD
  KEY (`NumCaso`);

--
-- AUTO_INCREMENT de la tabla `victima`
--
ALTER TABLE
  `victima`
MODIFY
  `NumCaso` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 24;
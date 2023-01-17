CREATE TABLE tabla_trabajador (
  rfc varchar(13) NOT NULL,
  nombre varchar(255) NOT NULL,
  primer_apellido varchar(255) NOT NULL,
  segundo_apellido varchar(255) NOT NULL,
  contrasena varchar(255) NOT NULL,
  ocupa varchar(255) NOT NULL,
  PRIMARY KEY (rfc)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  tabla_trabajador (
    rfc,
    nombre,
    primer_apellido,
    segundo_apellido,
    contrasea,
    ocupacin
  )
VALUES
  (
    'XEXT990101NI4',
    'Maria',
    'Garcia',
    'Snchez',
    'contrasea456',
    'abogado'
  );

INSERT INTO
  tabla_trabajador (
    rfc,
    nombre,
    primer_apellido,
    segundo_apellido,
    contrasea,
    ocupacin
  )
VALUES
  (
    'AAA00000000AA',
    'Juan',
    'Perez',
    'Lopez',
    'contrasea123',
    'ingeniero'
  );
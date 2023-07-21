<?php
require_once "./conexion_servidor.php";

// Vaciar la tabla 'usuarios'
// $query = "DELETE FROM usuarios";
// $stmt = $conexion->prepare($query);
// $stmt->execute();

// Vaciar la tabla 'tabla_titulo_desarrollo'
// $query = "DELETE FROM tabla_titulo_desarrollo";
// $stmt = $conexion->prepare($query);
// $stmt->execute();

// Vaciar la tabla 'usuarios'
$query = "TRUNCATE TABLE usuarios";
$stmt = $conexion->prepare($query);
$stmt->execute();

// Vaciar la tabla 'tabla_titulo_desarrollo'
$query = "TRUNCATE TABLE tabla_titulo_desarrollo";
$stmt = $conexion->prepare($query);
$stmt->execute();

// Obtener los datos enviados por POST
$tablaUsuarios = $_POST['tablaUsuarios'];
$tablaDesarrolloUsuarios = $_POST['tablaDesarrolloUsuarios'];

// Convertir los datos de JSON a arrays
$usuarios = json_decode($tablaUsuarios, true);
$desarrolloUsuarios = json_decode($tablaDesarrolloUsuarios, true);

// Insertar los datos en la tabla 'usuarios'
foreach ($usuarios as $usuario) {
  $query = "INSERT INTO usuarios (idUsu, usuario, gps, psw, accesos, obs) VALUES (:idUsu, :usuario, :gps, :psw, :accesos, :obs)";
  $stmt = $conexion->prepare($query);
  $stmt->bindParam(':idUsu', $usuario['idUsu']);
  $stmt->bindParam(':usuario', $usuario['usuario']);
  $stmt->bindParam(':gps', $usuario['gps']);
  $stmt->bindParam(':psw', $usuario['psw']);
  $stmt->bindParam(':accesos', $usuario['accesos']);
  $stmt->bindParam(':obs', $usuario['obs']);
  $stmt->execute();
}

// Insertar los datos en la tabla 'tabla_titulo_desarrollo'
foreach ($desarrolloUsuarios as $desarrollo) {
  $query = "INSERT INTO tabla_titulo_desarrollo (id, idUsu, idTit, titulo, desarrollo) VALUES (:id, :idUsu, :idTit, :titulo, :desarrollo)";
  $stmt = $conexion->prepare($query);
  $stmt->bindParam(':id', $desarrollo['id']);
  $stmt->bindParam(':idUsu', $desarrollo['idUsu']);
  $stmt->bindParam(':idTit', $desarrollo['idTit']);
  $stmt->bindParam(':titulo', $desarrollo['titulo']);
  $stmt->bindParam(':desarrollo', $desarrollo['desarrollo']);
  $stmt->execute();
}

// Cerrar la conexión PDO
$conexion = null;
?>

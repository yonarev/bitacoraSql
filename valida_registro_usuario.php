<?php
require_once "./conexion_servidor.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Obtener los valores del formulario
  $usuario = $_POST["correo"];
  $contrasena = $_POST["contrasena"];
  $idUsu = $_POST["idUsu"];
  $gps = $_POST["gps"];
  $accesos = $_POST["accesos"];
  $obs = $_POST["obs"];

  // Verificar si el usuario ya existe
  $query = "SELECT COUNT(*) AS total FROM usuarios WHERE usuario = :usuario";
  $statement = $conexion->prepare($query);
  $statement->bindParam(':usuario', $usuario);
  $statement->execute();
  $row = $statement->fetch(PDO::FETCH_ASSOC);
  $totalUsuarios = $row["total"];

  if ($totalUsuarios > 0) {
    echo "El usuario ya existe. Por favor, elija otro correo electrónico.";
  } else {
    // Insertar el nuevo usuario en la tabla de la base de datos
    $queryInsert = "INSERT INTO usuarios (idUsu, usuario, psw, gps, accesos, obs) VALUES (:idUsu, :usuario, :contrasena, :gps, :accesos, :obs)";
    $statementInsert = $conexion->prepare($queryInsert);
    $statementInsert->bindParam(':idUsu', $idUsu);
    $statementInsert->bindParam(':usuario', $usuario);
    $statementInsert->bindParam(':contrasena', $contrasena);
    $statementInsert->bindParam(':gps', $gps);
    $statementInsert->bindParam(':accesos', $accesos);
    $statementInsert->bindParam(':obs', $obs);
    $resultInsert = $statementInsert->execute();

    if ($resultInsert) {
      echo "Registro exitoso";
    } else {
      echo "Error al registrar el usuario";
    }
  }
}
// Cerrar la conexión a la base de datos
$conexion = null;
?>

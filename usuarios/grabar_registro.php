<?php
// Obtener los valores enviados desde el formulario
$idUsu = $_POST['idUsu'];
$usuario = $_POST['usuario'];
$gps = $_POST['gps'];
$psw = $_POST['psw'];
$obs = $_POST['obs'];
$accesos = $_POST['accesos'];

// $servername = "localhost";
// $username = "id18639165_yonar";
// $password = "Libertonim0$";
// $dbname = "id18639165_basedatos";
// SERVIDOR EN yonarev
$servername = "localhost";
$username = "id20940221_janvera";
$password = "Libertonim0$";
$dbname = "id20940221_q";

try {
  $conexion = new PDO("mysql:host=$servername;dbname=$dbName", $username, $password);
  $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Insertar los datos en la tabla correspondiente
  $stmt = $conexion->prepare("INSERT INTO usuarios (idUsu, usuario, gps, psw, obs, accesos) VALUES (:idUsu, :usuario, :gps, :psw, :obs, :accesos)");
  $stmt->bindParam(':idUsu', $idUsu);
  $stmt->bindParam(':usuario', $usuario);
  $stmt->bindParam(':gps', $gps);
  $stmt->bindParam(':psw', $psw);
  $stmt->bindParam(':obs', $obs);
  $stmt->bindParam(':accesos', $accesos);
  $stmt->execute();

  echo "Registro insertado correctamente";
} catch(PDOException $e) {
  echo "Error al insertar el registro: " . $e->getMessage();
}

$conexion = null; // Cerrar la conexión a la base de datos
?>

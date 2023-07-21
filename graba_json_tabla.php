<?php
require_once "./conexion_servidor.php";
try {
  $conexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // Truncar la tabla para eliminar todos los registros existentes
  $sqlTruncate = "TRUNCATE TABLE usuarios";
  $conexion->exec($sqlTruncate);
  // Recibir los datos JSON del cuerpo de la solicitud
  $json = file_get_contents('php://input');
  // Convertir el JSON a un array asociativo
  $usuarios = json_decode($json, true);
  if (is_array($usuarios) && count($usuarios) > 0) {
    // Preparar la consulta SQL para insertar los registros
    $sqlInsert = "INSERT INTO usuarios (campo1, campo2, campo3) VALUES (:campo1, :campo2, :campo3)";
    $stmt = $conexion->prepare($sqlInsert);
    // Recorrer los registros y ejecutar la consulta para insertarlos uno por uno
    foreach ($usuarios as $usuario) {
      $campo1 = $usuario['campo1']; // Ajusta los nombres de los campos según tu estructura de tabla
      $campo2 = $usuario['campo2'];
      $campo3 = $usuario['campo3'];
      // Asignar los valores a los parámetros de la consulta preparada
      $stmt->bindParam(':campo1', $campo1);
      $stmt->bindParam(':campo2', $campo2);
      $stmt->bindParam(':campo3', $campo3);
      // Ejecutar la consulta preparada
      $stmt->execute();
    }
    echo "La tabla 'usuarios' ha sido sobrescrita exitosamente con los nuevos registros.";
  } else {
    echo "No se recibieron datos válidos.";
  }
} catch (PDOException $e) {
  echo "Error de conexión: " . $e->getMessage();
}
// Cerrar la conexión a la base de datos
$conexion = null;
?>

<?php
require_once "./conexion_servidor.php";
// Obtener los valores del formulario
$correo = $_POST['correo'];
$contrasena = $_POST['contrasena'];
// Consultar la tabla 'usuarios' para validar el inicio de sesión
try {
  // Consulta SQL para buscar el correo y la contraseña en la tabla 'usuarios'
  $consulta = "SELECT * FROM usuarios WHERE usuario = :correo AND psw = :contrasena";
  $stmt = $conexion->prepare($consulta);
  $stmt->bindParam(':correo', $correo);
  $stmt->bindParam(':contrasena', $contrasena);
  $stmt->execute();
  $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($resultado) {
    // Inicio de sesión válido
    echo "valido";
  } else {
    // Inicio de sesión inválido
    echo "invalido";
  }
} catch (PDOException $e) {
  // Error en la conexión o consulta
  echo "Error: " . $e->getMessage();
}
$conexion = null;
?>

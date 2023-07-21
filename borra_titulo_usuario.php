<?php
// Establecer la conexión a la base de datos
require_once "./conexion_servidor.php";
// Obtener los parámetros
$idUsu = $_POST['idUsu'];
$titulo = $_POST['titulo'];
// Preparar la consulta SQL
$sql = "DELETE FROM titulos WHERE idUsu = :idUsu AND titulo = :titulo";
$stmt = $conexion->prepare($sql);
$stmt->bindParam(':idUsu', $idUsu);
$stmt->bindParam(':titulo', $titulo);
// Ejecutar la consulta
if ($stmt->execute()) {
  // Éxito al eliminar el título
  echo "Título eliminado correctamente";
} else {
  // Error al eliminar el título
  echo "Error al eliminar el título";
}
// Cerrar la conexión a la base de datos
$conexion = null;
?>

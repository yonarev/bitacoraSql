<?php
require_once "./conexion_servidor.php";
// Obtener los parámetros de la URL
$idUsu = $_GET['idUsu'];
$titulo = $_GET['titulo'];
try {
  // Crear la consulta preparada
  $sql = "SELECT idTit FROM tabla_titulo_desarrollo WHERE idUsu = :idUsu AND titulo = :titulo";
  // Ejecutar la consulta preparada
  $stmt = $conexion->prepare($sql);
  $stmt->bindParam(':idUsu', $idUsu);
  $stmt->bindParam(':titulo', $titulo);
  $stmt->execute();
  // Obtener el resultado de la consulta
  $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
  // Retornar el idTitulo como respuesta
  echo $resultado['idTit'];
} catch (PDOException $e) {
  echo "Error al obtener el idTitulo: " . $e->getMessage();
  exit();
}
?>

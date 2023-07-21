<?php
require_once "./conexion_servidor.php";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $idUsu = $_POST['idUsu'];
  $idTitulo = $_POST['idTitulo'];
  $titulo = $_POST['titulo'];
  $fecha = $_POST['fecha'];
  $hora = $_POST['hora'];
  try {
    // Verificar si el título ya existe para el usuario dado
    $stmt = $conexion->prepare("SELECT COUNT(*) as count FROM titulos WHERE idUsu = :idUsu AND titulo = :titulo");
    $stmt->bindParam(':idUsu', $idUsu);
    $stmt->bindParam(':titulo', $titulo);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result['count'] > 0) {
      echo "El título ya existe para el usuario dado";
    } else {
      // Verificar si el idTitulo ya existe
      $stmt = $conexion->prepare("SELECT COUNT(*) as count FROM titulos WHERE idTitulo = :idTitulo");
      $stmt->bindParam(':idTitulo', $idTitulo);
      $stmt->execute();
      $result = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($result['count'] > 0) {
        echo "El idTitulo ya está en uso";
      } else {
        // Insertar el nuevo título si no existe duplicado
        $stmt = $conexion->prepare("INSERT INTO titulos (idUsu,idTitulo, fecha, hora,  titulo) VALUES (:idUsu,:idTitulo, :fecha, :hora,  :titulo)");
        $stmt->bindParam(':idUsu', $idUsu);
        $stmt->bindParam(':idTitulo', $idTitulo);
        $stmt->bindParam(':fecha', $fecha);
        $stmt->bindParam(':hora', $hora);
        $stmt->bindParam(':titulo', $titulo);
        $stmt->execute();
        echo "Registro guardado exitosamente";
      }
    }
  } catch (PDOException $e) {
    echo "Error al guardar el registro: " . $e->getMessage();
  }
}
// Cerrar la conexión a la base de datos
$conexion = null;
?>

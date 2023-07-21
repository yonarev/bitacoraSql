<?php
require_once "./conexion_servidor.php";
// Obtener los datos enviados por POST
$idUsu = $_POST['idUsu'];
$idTit = $_POST['idTit'];
$titulo = $_POST['titulo'];
try {
  // Buscar si existe un registro con idUsu y idTit en la tabla
  $consulta = $conexion->prepare("SELECT * FROM tabla_titulo_desarrollo WHERE idUsu = :idUsu AND idTit = :idTit");
  $consulta->bindParam(':idUsu', $idUsu);
  $consulta->bindParam(':idTit', $idTit);
  $consulta->execute();
  // Verificar si se encontró un registro
  if ($consulta->rowCount() > 0) {
    // Verificar si el título ya está en uso por otro registro
    $consultaTitulo = $conexion->prepare("SELECT * FROM tabla_titulo_desarrollo WHERE titulo = :titulo AND idTit <> :idTit");
    $consultaTitulo->bindParam(':titulo', $titulo);
    $consultaTitulo->bindParam(':idTit', $idTit);
    $consultaTitulo->execute();

    if ($consultaTitulo->rowCount() === 0) {
      // Actualizar el título del registro encontrado
      $actualizar = $conexion->prepare("UPDATE tabla_titulo_desarrollo SET titulo = :titulo WHERE idUsu = :idUsu AND idTit = :idTit");
      $actualizar->bindParam(':titulo', $titulo);
      $actualizar->bindParam(':idUsu', $idUsu);
      $actualizar->bindParam(':idTit', $idTit);
      $actualizar->execute();

      $response = array('message' => 'El título se actualizó correctamente.');
    } else {
      $response = array('message' => 'El título ya está en uso por otro registro.');
    }
  } else {
    $response = array('message' => 'No se encontró el registro en la tabla.');
  }
} catch (PDOException $e) {
  $response = array('message' => 'Error en la base de datos: ' . $e->getMessage());
}
// Cerrar la conexión a la base de datos
$conexion = null;
// Devolver la respuesta en formato JSON
echo json_encode($response);
?>

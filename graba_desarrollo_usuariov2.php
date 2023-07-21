<?php
require_once "./conexion_servidor.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Obtener los datos del formulario
  $idUsu = $_POST['idUsu'];
  $idTit = $_POST['idTit'];
  $textoDes = $_POST['textoDes'];
  try {
    // Verificar si los campos 'idUsu' y 'idTit' ya existen
    $consultaVerificar = $conexion->prepare("SELECT COUNT(*) FROM desarrollo WHERE idUsu = :idUsu AND idTit = :idTit");
    $consultaVerificar->bindParam(':idUsu', $idUsu);
    $consultaVerificar->bindParam(':idTit', $idTit);
    $consultaVerificar->execute();
    $existeRegistro = ($consultaVerificar->fetchColumn() > 0);
    if ($existeRegistro) {
      // Si el registro existe, realizar una actualización
      if (!empty($textoDes)) {
        $consulta = $conexion->prepare("UPDATE desarrollo SET textoDes = :textoDes WHERE idUsu = :idUsu AND idTit = :idTit");
        $consulta->bindParam(':textoDes', $textoDes);
        $consulta->bindParam(':idUsu', $idUsu);
        $consulta->bindParam(':idTit', $idTit);
        $consulta->execute();
      } else {
        // El campo 'textoDes' está vacío, no se realiza ninguna actualización
        echo "El campo 'textoDes' está vacío. No se realiza ninguna actualización.";
        exit;
      }
    } else {
      // Si el registro no existe, realizar una inserción
      $id = uniqid(); // Genera un ID único basado en la marca de tiempo actual
      $consulta = $conexion->prepare("INSERT INTO desarrollo (id, textoDes, idUsu, idTit) VALUES (:id, :textoDes, :idUsu, :idTit)");
      $consulta->bindParam(':id', $id);
      $consulta->bindParam(':textoDes', $textoDes);
      $consulta->bindParam(':idUsu', $idUsu);
      $consulta->bindParam(':idTit', $idTit);
      $consulta->execute();
    }
    // Cerrar la conexión
    $conexion = null;

    // Respuesta exitosa
    // echo "Datos guardados correctamente";
  } catch (PDOException $e) {
    // Error en la conexión o en la consulta
    echo "Error: " . $e->getMessage();
  }
}
?>

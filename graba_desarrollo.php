<?php
require_once "./conexion_servidor.php";
// Obtener los parámetros enviados por POST
$idUsu = $_POST['idUsu'];
$idTit = $_POST['idTit'];
$desarrollo = $_POST['desarrollo'];
// Sobreescribir los campos título y desarrollo en la tabla SQL
try {
    $query = "UPDATE tabla_titulo_desarrollo SET  desarrollo = :desarrollo WHERE idUsu = :idUsu AND idTit = :idTit";
    $statement = $conexion->prepare($query);
    $statement->bindValue(':idUsu', $idUsu);
    $statement->bindValue(':idTit', $idTit);
    $statement->bindValue(':desarrollo', $desarrollo);
    $statement->execute();
    echo "Los datos se han grabado correctamente";
} catch (PDOException $e) {
    echo "Error al grabar los datos: " . $e->getMessage();
}
// Cerrar la conexión a la base de datos
$conexion = null;
?>

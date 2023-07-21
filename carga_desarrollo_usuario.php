<?php
require_once "./conexion_servidor.php";
// Obtener los parámetros de la URL
$idUsu = $_GET['idUsu'];
$idTit = $_GET['idTit'];
// Preparar la consulta SQL
$consulta = $conexion->prepare("SELECT desarrollo FROM tabla_titulo_desarrollo WHERE idUsu = :idUsu AND idTit = :idTit");
$consulta->bindParam(":idUsu", $idUsu);
$consulta->bindParam(":idTit", $idTit);
// Ejecutar la consulta
$consulta->execute();
// Obtener el resultado
$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
// Cerrar la conexión
$conexion = null;
// Verificar si se obtuvo un resultado y devolver el contenido de textoDes
if ($resultado) {
    echo $resultado['desarrollo'];
} else {
    echo ""; // Espacio vacío
}
// Cerrar la conexión a la base de datos
$conexion = null;
?>

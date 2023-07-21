<?php
require_once "./conexion_servidor.php";
// Obtener el ID de usuario enviado desde JavaScript
$idUsu = $_POST['idUsu'];
// Realizar la consulta SQL para obtener los títulos del usuario
$stmt = $conexion->prepare("SELECT titulo FROM tabla_titulo_desarrollo WHERE idUsu = :idUsu");
$stmt->bindValue(':idUsu', $idUsu, PDO::PARAM_STR);
$stmt->execute();
// Obtener los resultados de la consulta
$resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
// Devolver los resultados como respuesta JSON
header('Content-Type: application/json');
echo json_encode($resultados);
// Cerrar la conexión a la base de datos
$conexion = null;
?>

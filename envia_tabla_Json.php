<?php
require_once "./conexion_servidor.php";

// Realizar la consulta SQL para obtener los datos de la tabla
$query = "SELECT id, idUsu, idTit, titulo, desarrollo FROM tabla_titulo_desarrollo";
$stmt = $conexion->prepare($query);
$stmt->execute();

// Obtener los resultados de la consulta
$datos = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Cerrar la conexión
$conexion = null;

// Enviar los datos en formato JSON
echo json_encode($datos);
?>

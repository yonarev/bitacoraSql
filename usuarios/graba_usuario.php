<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once "./conexion_servidor.php";

// Obtener los datos enviados desde JavaScript
$data = json_decode(file_get_contents('php://input'), true);

// Verificar si se obtuvieron los datos correctamente
if ($data && is_array($data)) {
    $idUsu = $data['idUsu'];
    $usuario = $data['usuario'];
    $gps = $data['gps'];
    $psw = $data['psw'];
    $accesos = implode(", ", $data['accesos']);
    $obs = $data['obs'];

    // Preparar la consulta SQL
    $stmt = $conexion->prepare("INSERT INTO usuarios (idUsu, usuario, gps, psw, accesos, obs) VALUES (:idUsu, :usuario, :gps, :psw, :accesos, :obs)");
    $stmt->bindParam(':idUsu', $idUsu);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':gps', $gps);
    $stmt->bindParam(':psw', $psw);
    $stmt->bindParam(':accesos', $accesos);
    $stmt->bindParam(':obs', $obs);
    
    // Ejecutar la consulta SQL
    if ($stmt->execute()) {
        echo "Registro insertado correctamente en la tabla";
    } else {
        echo "Error al insertar el registro en la tabla";
    }
} else {
    echo "Los datos enviados no son válidos";
}

$conexion = null; // Cerrar la conexión a la base de datos
?>

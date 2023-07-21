<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once "./conexion_servidor.php";

// Obtener los datos del Local Storage
$usuarios = json_decode($_POST['usuarios'], true);

// Verificar si se obtuvieron los datos correctamente
if ($usuarios && is_array($usuarios)) {
    // Vaciar la tabla antes de agregar nuevos registros
    $sql = "TRUNCATE TABLE usuarios";
    $conexion->exec($sql);

    // Insertar los nuevos registros
    foreach ($usuarios as $usuario) {
        $idUsu = $usuario['idUsu'];
        $usuarioNombre = $usuario['usuario'];
        $gps = $usuario['gps'];
        $psw = $usuario['psw'];
        $accesos = implode(", ", (array)$usuario['accesos']); // Corrección aquí
        $obs = $usuario['obs'];

        $stmt = $conexion->prepare("INSERT INTO usuarios (idUsu, usuario, gps, psw, accesos, obs) VALUES (:idUsu, :usuario, :gps, :psw, :accesos, :obs)");
        $stmt->bindParam(':idUsu', $idUsu);
        $stmt->bindParam(':usuario', $usuarioNombre);
        $stmt->bindParam(':gps', $gps);
        $stmt->bindParam(':psw', $psw);
        $stmt->bindParam(':accesos', $accesos);
        $stmt->bindParam(':obs', $obs);
        $stmt->execute();
    }

    echo "Datos insertados correctamente en la tabla";
} else {
    echo "Los datos del Local Storage no son válidos";
}

$conexion = null; // Cerrar la conexión a la base de datos
?>

<?php
require_once "./conexion_servidor.php";
// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
$sql = "DELETE FROM usuarios";
// Ejecutar la consulta
if ($conexion->query($sql) === TRUE) {
    echo "La tabla 'usuarios' se ha vaciado correctamente.";
    // echo "La tabla 'usuarios' ha sido eliminada correctamente.";
} else {
    // echo "Error al eliminar la tabla 'usuarios': " . $conn->error;
    echo "Error al vaciar la tabla 'usuarios': " . $conn->error;
}
// Cerrar conexión
$conexion->close();
?>

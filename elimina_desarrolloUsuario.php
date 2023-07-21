<?php
// elimina de desarrollo y titulos
require_once "./conexion_servidor.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $idUsu = $_POST['idUsu'];
    $idTit = $_POST['idTit'];
    try {
        // Eliminar registro de la tabla 'desarrollo'
        $stmt = $conexion->prepare("DELETE FROM tabla_titulo_desarrollo WHERE idUsu = :idUsu AND idTit = :idTit");
        $stmt->bindParam(':idUsu', $idUsu);
        $stmt->bindParam(':idTit', $idTit);
        $stmt->execute();
        // Eliminar registro de la tabla 'titulos'
        $stmt = $conexion->prepare("DELETE FROM titulos WHERE idUsu = :idUsu AND idTitulo = :idTit");
        $stmt->bindParam(':idUsu', $idUsu);
        $stmt->bindParam(':idTit', $idTit);
        $stmt->execute();
        echo "Registros eliminados correctamente.";
    } catch (PDOException $e) {
        // Manejo de excepciones
        echo "Error al eliminar los registros: " . $e->getMessage();
    }
} else {
    echo "Solicitud no válida.";
}
// Cerrar la conexión a la base de datos
$conexion = null;
?>

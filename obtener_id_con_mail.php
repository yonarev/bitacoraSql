<?php
require_once "./conexion_servidor.php"; // Archivo de conexión a la base de datos
$usuario = $_POST['usuario'];
try {
    $sql = "SELECT idUsu FROM usuarios WHERE usuario = :usuario";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->execute();
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($resultado) {
        echo $resultado['idUsu'];
    } else {
        echo 'Usuario no encontrado';
    }
} catch (PDOException $e) {
    // Manejo de excepciones en caso de error de conexión o consulta
    echo "Error: " . $e->getMessage();
}
?>

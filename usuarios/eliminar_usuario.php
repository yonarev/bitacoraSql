<?php
require_once "./conexion_servidor.php";

// Obtener el ID del usuario enviado en la solicitud
$idUsu = $_POST['idUsu'];

// Realizar la lógica de eliminación en la base de datos
$stmt = $conexion->prepare("DELETE FROM usuarios WHERE idUsu = :id");
$stmt->bindParam(":id", $idUsu, PDO::PARAM_INT); // Vincular el parámetro :id como entero

// Ejecutar la consulta
if ($stmt->execute()) {
    // Comprobar si se eliminó algún registro
    if ($stmt->rowCount() > 0) {
        // El usuario se eliminó correctamente
        echo "El usuario se eliminó correctamente";
    } else {
        // No se encontró el usuario con el ID proporcionado
        echo "No se encontró el usuario con el ID proporcionado";
    }
} else {
    // Hubo un error al eliminar el usuario
    echo "Error al eliminar el usuario: " . $stmt->errorInfo()[2];
}

// Cerrar la conexión y liberar recursos
$stmt->closeCursor();
$conexion = null;
?>

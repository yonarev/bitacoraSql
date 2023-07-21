<!-- tabla_titulo_desarrollo -->
<?php
require_once "./conexion_servidor.php";
// Verificar si se recibieron los datos por POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtener los datos enviados por POST
    $id = $_POST["id"];
    $idUsu = $_POST["idUsu"];
    $idTit = $_POST["idTit"];
    $titulo = $_POST["titulo"];
    $desarrollo = $_POST["desarrollo"];
    // Verificar si el título ya existe en la tabla
    $stmt = $conexion->prepare("SELECT COUNT(*) FROM tabla_titulo_desarrollo WHERE titulo = ?");
    $stmt->bindParam(1, $titulo);
    $stmt->execute();
    $count = $stmt->fetchColumn();
    if ($count > 0) {
        echo "El título ya existe. No se puede repetir.";
    } else {
        // Insertar los valores en la tabla utilizando una consulta preparada
        $stmt = $conexion->prepare("INSERT INTO tabla_titulo_desarrollo (id, idUsu, idTit, titulo, desarrollo) VALUES (?, ?, ?, ?, ?)");
        $stmt->bindParam(1, $id);
        $stmt->bindParam(2, $idUsu);
        $stmt->bindParam(3, $idTit);
        $stmt->bindParam(4, $titulo);
        $stmt->bindParam(5, $desarrollo);
        
        if ($stmt->execute()) {
            echo "Datos insertados correctamente";
        } else {
            echo "Error al insertar los datos";
        }
    }
} else {
    echo "Acceso denegado";
}
// Cerrar la conexión a la base de datos
$conexion = null;
?>

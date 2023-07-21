<?php
require_once "./conexion_servidor.php";

$response = array();

try {
    // Consulta para obtener los usuarios de la base de datos (reemplaza con tu propia consulta)
    $sql = "SELECT * FROM usuarios";
    $result = $conexion->query($sql);

    if ($result->rowCount() > 0) {
        $response["success"] = true;
        $response["usuarios"] = array();

        // Obtener los datos de cada fila y agregarlos al array de usuarios
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $usuario = array(
                "idUsu" => $row["idUsu"],
                "usuario" => $row["usuario"],
                "gps" => $row["gps"],
                "psw" => $row["psw"],
                "accesos" => $row["accesos"],
                "obs" => $row["obs"]
            );
            array_push($response["usuarios"], $usuario);
        }
    } else {
        $response["success"] = false;
    }
} catch (PDOException $e) {
    $response["success"] = false;
    $response["error"] = $e->getMessage();
}

// Devolver la respuesta como JSON
header("Content-type: application/json");
echo json_encode($response);

// Cerrar la conexión a la base de datos
$conexion = null;
?>

<?php
require_once "./conexion_servidor.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $idUsu = $_POST['idUsu'];
    $usuario = $_POST['usuario'];
    $gps = $_POST['gps'];
    $psw = $_POST['psw'];
    $obs = $_POST['obs'];
    $accesos = $_POST['accesos'];

    // Implementar la lógica para actualizar el registro de usuario en la base de datos
    try {
        // Obtener la conexión desde el archivo de conexión existente
        $conexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Preparar la consulta SQL para actualizar el registro de usuario
        $sql = "UPDATE usuarios SET usuario = :usuario, psw = :psw, gps = :gps, accesos = :accesos, obs = :obs WHERE idUsu = :idUsu";
        $stmt = $conexion->prepare($sql);

        // Vincular los parámetros de la consulta con los datos del usuario
        $stmt->bindParam(":usuario", $usuario);
        $stmt->bindParam(":psw", $psw);
        $stmt->bindParam(":gps", $gps);
        $stmt->bindParam(":accesos", $accesos);
        $stmt->bindParam(":obs", $obs);
        $stmt->bindParam(":idUsu", $idUsu);

        // Ejecutar la consulta de actualización
        $stmt->execute();

        // Redireccionar al usuario a index.html usando JavaScript
        echo '<script>window.location.href = "index.html";</script>';
        exit(); // Asegura que el código se detenga después de la redirección

    } catch(PDOException $e) {
        // Mostrar el mensaje de error
        echo "Error de actualización: " . $e->getMessage();
    }

    // Cierre de la conexión a la base de datos
    $conexion = null;
}
?>

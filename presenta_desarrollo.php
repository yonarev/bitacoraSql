<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar si se ha enviado un valor para el campo de texto
    if (isset($_POST["textoDes"])) {
        // Obtener el valor del campo de texto enviado
        $textoDes = $_POST["textoDes"];
        // Mostrar el texto en pantalla
        echo "Texto enviado: " . $textoDes;
    } else {
        // El campo de texto no ha sido enviado o está vacío
        echo "No se ha enviado ningún texto.";
    }
} else {
    // No se ha enviado ninguna solicitud POST al archivo PHP
    echo "Acceso inválido al archivo PHP.";
}
// Cerrar la conexión a la base de datos
$conexion = null;
?>

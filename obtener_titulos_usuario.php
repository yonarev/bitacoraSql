<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idUsuario = $_GET['idUsuario'];
    require_once "./conexion_servidor.php";
    $consulta = $conexion->prepare("SELECT idTitulo, titulo FROM titulos WHERE idUsu = :idUsuario");
    $consulta->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR);
    $consulta->execute();
    $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);
    if (count($resultados) > 0) {
        $options = '';
        foreach ($resultados as $resultado) {
            $idTitulo = $resultado['idTitulo'];
            $titulo = $resultado['titulo'];
            $options .= "<option value='$idTitulo'>$titulo</option>";
        }
        echo $options;
    } else {
        echo "<option value=''>No se encontraron títulos para el usuario con ID $idUsuario.</option>";
    }
}
// Cerrar la conexión a la base de datos
$conexion = null;
?>

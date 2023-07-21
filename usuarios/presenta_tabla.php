<?php
require_once "./conexion_servidor.php";

// Consultar los usuarios
$consultaUsuarios = "SELECT * FROM usuarios";
$resultadoUsuarios = $conexion->query($consultaUsuarios);

// Obtener el número de filas
$numFilas = $resultadoUsuarios->rowCount();

// Cerrar la conexión
$conexion = null;
?>

<!DOCTYPE html>
<html>
<head>
    <title>Tabla de Usuarios</title>
    <style>
        table {
            border-collapse: collapse;
        }

        table, th, td {
            border: 1px solid black;
            padding: 5px;
        }
    </style>
</head>
<body>
    <h1>Tabla de Usuarios servidor</h1>

    <?php if ($numFilas > 0): ?>
        <table>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Password</th>
                <th>Accesos</th>
                <th>GPS</th>
                <th>Observaciones</th>
            </tr>

            <?php while ($fila = $resultadoUsuarios->fetch(PDO::FETCH_ASSOC)): ?>
                <tr>
                    <td><?php echo $fila['idUsu']; ?></td>
                    <td><?php echo $fila['usuario']; ?></td>
                    <td><?php echo $fila['psw']; ?></td>
                    <td><?php echo $fila['accesos']; ?></td>
                    <td><?php echo $fila['gps']; ?></td>
                    <td><?php echo $fila['obs']; ?></td>
                </tr>
            <?php endwhile; ?>
        </table>
    <?php else: ?>
        <p>No hay usuarios registrados.</p>
    <?php endif; ?>
</body>
</html>

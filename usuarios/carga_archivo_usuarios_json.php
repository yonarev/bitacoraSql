<?php
require_once "./conexion_servidor.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['archivoInput'])) {
    $archivo = $_FILES['archivoInput'];
  
    // Verificar que el archivo es un archivo JSON válido
    if ($archivo['type'] === 'application/json') {
      // Leer el contenido del archivo JSON
      $contenido = file_get_contents($archivo['tmp_name']);
  
      // Decodificar el contenido JSON en un array asociativo
      $usuarios = json_decode($contenido, true);
  
      // Verificar si se pudo decodificar correctamente el archivo JSON
      if ($usuarios) {
        // Truncar la tabla para eliminar los registros existentes
        $conexion->exec('TRUNCATE TABLE usuarios');
  
        // Preparar la consulta para insertar los registros en la tabla
        $consulta = $conexion->prepare("INSERT INTO usuarios (idUsu, usuario, psw, gps, accesos, obs) VALUES (:idUsu, :usuario, :psw, :gps, :accesos, :obs)");
  
        // Iniciar una transacción para asegurar la integridad de los datos
        $conexion->beginTransaction();
  
        try {
          // Iterar sobre los usuarios y ejecutar la consulta para cada uno
          foreach ($usuarios as $usuario) {
            $consulta->bindParam(':idUsu', $usuario['idUsu']);
            $consulta->bindParam(':usuario', $usuario['usuario']);
            $consulta->bindParam(':psw', $usuario['psw']);
            $consulta->bindParam(':gps', $usuario['gps']);
            $consulta->bindParam(':accesos', $usuario['accesos']);
            $consulta->bindParam(':obs', $usuario['obs']);
  
            $consulta->execute();
          }
  
          // Confirmar la transacción
          $conexion->commit();
  
          // Redirigir a la página principal
          header('Location: index.html');
          exit();
        } catch (PDOException $e) {
          // Revertir la transacción en caso de error
          $conexion->rollBack();
  
          // Redirigir a la página principal con mensaje de error
          header('Location: index.html?error=' . urlencode($e->getMessage()));
          exit();
        }
      } else {
        // Redirigir a la página principal con mensaje de error
        header('Location: index.html?error=Error al decodificar el archivo JSON.');
        exit();
      }
    } else {
      // Redirigir a la página principal con mensaje de error
      header('Location: index.html?error=El archivo seleccionado no es un archivo JSON válido.');
      exit();
    }
  } else {
    // Redirigir a la página principal con mensaje de error
    header('Location: index.html?error=Error al cargar el archivo.');
    exit();
  }
  ?>

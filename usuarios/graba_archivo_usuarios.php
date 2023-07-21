<?php
require_once "./conexion_servidor.php";


try {
    // $conexion = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  
    // Consultar los datos de la tabla SQL (Asegúrate de ajustar los nombres de tabla y columnas)
    $sql = "SELECT * FROM usuarios";
    $stmt = $conexion->query($sql);
  
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
  
    if (count($usuarios) > 0) {
      // Convertir el array a formato JSON
      $json = json_encode($usuarios);
  
      // Configurar las cabeceras de la respuesta para indicar que es un archivo JSON
      header('Content-Type: application/json');
      header('Content-Disposition: attachment; filename="usuariosTabla.json"');
  
      // Enviar el archivo JSON como respuesta
      echo $json;
    } else {
      echo "No se encontraron datos de usuarios en la tabla.";
    }
  } catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
  }
  
  // Cerrar la conexión a la base de datos
  $conexion = null;
  ?>

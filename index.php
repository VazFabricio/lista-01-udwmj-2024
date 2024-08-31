<marquee><?php echo "Hoje e dia ".date("d/m/Y"); ?>.</marquee>
<?php if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
    $ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $ip = $_SERVER['REMOTE_ADDR'];
} ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consulta de CEP</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <link rel="stylesheet" href="assets/css/cep.css" />
</head>
<body>
  <h2>Consultar CEP</h2>

  <div id="input">   
    <input type="text" id="cep" placeholder="Digite o CEP">
    <button onclick="consultarCep()">Consultar</button>
  </div>

  <div id="container">
    <div id="resultado">
      <h3>Endereço:</h3>
      <p id="logradouro"></p>
      <p id="bairro"></p>
      <p id="cidade"></p>
      <p id="uf"></p>
      <p id="Pais"></p>
      <p id="ddd"></p> 
    </div>
    <div id="map"></div>
	<?php echo $ip; ?>
  </div>

  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script src="assets/js/cep.js"></script>
</body>
</html>

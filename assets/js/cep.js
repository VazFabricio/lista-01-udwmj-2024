
    let map;
    let marker;

    function consultarCep() {
      const cep = document.getElementById('cep').value;
      const cepLimpo = cep.replace(/\D/g, '');

      if (cepLimpo.length === 8) {
        fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
          .then(response => response.json())
          .then(data => {
            if (data.erro) {
              alert('CEP não encontrado!');
            } else {
              document.getElementById('resultado').style.display = 'block'; // Mostra o contêiner de resultados

              document.getElementById('logradouro').innerText = `Logradouro: ${data.logradouro}`;
              document.getElementById('bairro').innerText = `Bairro: ${data.bairro}`;
              document.getElementById('cidade').innerText = `Cidade: ${data.localidade}`;
              document.getElementById('uf').innerText = `UF: ${data.uf}`;
              document.getElementById('ddd').innerText = `DDD: ${data.ddd}`;
              document.getElementById('Pais').innerText = `Pais: Brasil`;

              const endereco = `${data.logradouro}, ${data.localidade}, ${data.uf}, Brasil`;
              mostrarMapa(endereco);
            }
          })
          .catch(error => {
            alert('Erro ao consultar o CEP.');
            console.error(error);
          });
      } else {
        alert('Por favor, insira um CEP válido com 8 dígitos.');
      }
    }

    function mostrarMapa(endereco) {
      if (!map) {
        map = L.map('map').setView([-15.77972, -47.92972], 4); // Posição inicial centrada no Brasil
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
      }

      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;

            if (marker) {
              marker.setLatLng([lat, lon]);
            } else {
              marker = L.marker([lat, lon]).addTo(map);
            }

            map.setView([lat, lon], 15); 
          } else {
            alert('Localização não encontrada no mapa.');
          }
        });
    }

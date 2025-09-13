   $(document).ready(function(){
      carregarCarros(); 

      $('#marca').change(function(){
        var marca = $(this).val();
        var modelos = {
          'Porsche': ['911', 'Cayenne', 'Panamera', 'Macan', 'Boxster'],
          'BMW': ['Série 3', 'Série 5', 'X3', 'X5', 'i3'],
          'Ferrari': ['488 GTB', 'Portofino', '812 Superfast', 'Roma', 'SF90 Stradale'],
          'Audi': ['A4', 'A6', 'Q5', 'Q7', 'e-tron', 'RS6'],
          'FIAT': ['Uno', 'Mobi', 'Argo', 'Toro', 'Cronos'],
          'Nissan': ['Versa', 'Kicks', 'March', 'Frontier', 'Leaf']
        };
        var options = '<option value="">Selecione o modelo</option>';
        modelos[marca].forEach(function(modelo){
          options += '<option value="' + modelo + '">' + modelo + '</option>';
        });
        $('#modelo').html(options);
        var modeloSelecionado = $('#modelo').val();
        var preco = obterPreco(marca, modeloSelecionado);
        $('#preco').val(preco);
      });

      $('#modelo').change(function(){
        var marca = $('#marca').val();
        var modelo = $(this).val();
        var preco = obterPreco(marca, modelo);
        $('#preco').val(preco);
      });

      $('#carForm').submit(function(event){
        event.preventDefault();
        var marca = $('#marca').val();
        var modelo = $('#modelo').val();
        var preco = $('#preco').val();
        adicionarCarro(marca, modelo, preco);
        $('#marca').val('');
        $('#modelo').val('');
        $('#preco').val('');
      });

      function obterPreco(marca, modelo){
        var precos = {
          'Porsche': {
            '911': 'R$ 600.000,00',
            'Cayenne': 'R$ 400.000,00',
            'Panamera'  : 'R$ 500.000,00',
            'Macan': 'R$ 300.000,00',
            'Boxster': 'R$ 350.000,00'
          },
          'BMW': {
            'Série 3': 'R$ 200.000,00',
            'Série 5': 'R$ 250.000,00',
            'X3': 'R$ 280.000,00',
            'X5': 'R$ 320.000,00',
            'i3': 'R$ 150.000,00'
          },
          'Ferrari': {
            '488 GTB': 'R$ 900.000,00',
            'Portofino': 'R$ 1.200.000,00',
            '812 Superfast': 'R$ 1.500.000,00',
            'Roma': 'R$ 1.100.000,00',
            'SF90 Stradale': 'R$ 2.000.000,00'
          },
          'Audi': {
            'A4': 'R$ 220.000,00',
            'A6': 'R$ 280.000,00',
            'Q5': 'R$ 320.000,00',
            'Q7': 'R$ 380.000,00',
            'e-tron': 'R$ 450.000,00',
            'RS6': '1.200.000,00'
          },
          'FIAT': {
            'Uno': 'R$ 40.000,00',
            'Mobi': 'R$ 50.000,00',
            'Argo': 'R$ 60.000,00',
            'Toro': 'R$ 80.000,00',
            'Cronos': 'R$ 55.000,00'
          },
          'Nissan': {
            'Versa': 'R$ 60.000,00',
            'Kicks': 'R$ 75.000,00',
            'March': 'R$ 50.000,00',
            'Frontier': 'R$ 140.000,00',
            'Leaf': 'R$ 180.000,00'
          }
        };
        return precos[marca][modelo];
      }

      function adicionarCarro(marca, modelo, preco) {
        var carros = JSON.parse(localStorage.getItem('carros')) || [];
        var novoCarro = {
          marca: marca,
          modelo: modelo,
          preco: preco
        };
        carros.push(novoCarro);
        localStorage.setItem('carros', JSON.stringify(carros));
        carregarCarros();
      }

      function carregarCarros() {
        var carros = JSON.parse(localStorage.getItem('carros')) || [];
        var tabelaCarros = $('#tabelaCarros');
        tabelaCarros.empty();
        $.each(carros, function(index, carro){
          tabelaCarros.append('<tr><td>' + carro.marca + '</td><td>' + carro.modelo + '</td><td>' + carro.preco + '</td><td><button type="button" class="btn btn-sm btn-primary btn-edit" data-index="' + index + '">Editar</button> <button type="button" class="btn btn-sm btn-danger btn-delete" data-index="' + index + '">Excluir</button></td></tr>');
        });
      }

      $(document).on('click', '.btn-edit', function(){
        var index = $(this).data('index');
        var carros = JSON.parse(localStorage.getItem('carros')) || [];
        var carro = carros[index];
        $('#editIndex').val(index);
        $('#editMarca').val(carro.marca);
        $('#editModelo').val(carro.modelo);
        $('#editPreco').val(carro.preco);
        $('#editarCarroModal').modal('show');
      });

      $('#editarCarroForm').submit(function(e){
        e.preventDefault();
        var index = $('#editIndex').val();
        var carros = JSON.parse(localStorage.getItem('carros')) || [];
        carros[index].marca = $('#editMarca').val();
        carros[index].modelo = $('#editModelo').val();
        carros[index].preco = $('#editPreco').val();
        localStorage.setItem('carros', JSON.stringify(carros));
        $('#editarCarroModal').modal('hide');
        carregarCarros();
      });

      $(document).on('click', '.btn-delete', function(){
        var index = $(this).data('index');
        var carros = JSON.parse(localStorage.getItem('carros')) || [];
        carros.splice(index, 1);
        localStorage.setItem('carros', JSON.stringify(carros));
        carregarCarros();
      });

    });
 
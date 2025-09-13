   $(document).ready(function(){
      $('#clienteForm').submit(function(e){
        e.preventDefault();
        var nome = $('#nome').val();
        var endereco = $('#endereco').val();
        var telefone = $('#telefone').val();
        var email = $('#email').val();
        var marcaCarro = $('#marcaCarro').val();
        var modeloCarro = $('#modeloCarro').val();
        
        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        var cliente = {
          id: clientes.length + 1, 
          nome: nome,
          endereco: endereco,
          telefone: telefone,
          email: email,
          marcaCarro: marcaCarro,
          modeloCarro: modeloCarro
        };
        
        clientes.push(cliente);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        
        $('#clienteForm')[0].reset();
        atualizarTabelaClientes();
      });
      
      function atualizarTabelaClientes(){
        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        var tabelaClientes = $('#tabelaClientes');
        tabelaClientes.empty();
        $.each(clientes, function(index, cliente){
          tabelaClientes.append('<tr><td>' + cliente.id + '</td><td>' + cliente.nome + '</td><td>' +
 cliente.endereco + '</td><td>' + cliente.telefone + '</td><td>' + cliente.email + '</td><td>' + cliente.marcaCarro + '</td><td>' + cliente.modeloCarro + '</td><td><button type="button" class="btn btn-sm btn-primary btn-edit" data-index="' + index + '">Editar</button> <button type="button" class="btn btn-sm btn-danger btn-delete" data-index="' + index + '">Excluir</button></td></tr>');
        });
      }
      
      atualizarTabelaClientes();
      
      $(document).on('click', '.btn-edit', function(){
        var index = $(this).data('index');
        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        var cliente = clientes[index];
        $('#editIndex').val(index);
        $('#editNome').val(cliente.nome);
        $('#editEndereco').val(cliente.endereco);
        $('#editTelefone').val(cliente.telefone);
        $('#editEmail').val(cliente.email);
        $('#editMarcaCarro').val(cliente.marcaCarro);
        $('#editModeloCarro').val(cliente.modeloCarro);
        $('#editarClienteModal').modal('show');
      });
      
      $('#editarClienteForm').submit(function(e){
        e.preventDefault();
        var index = $('#editIndex').val();
        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes[index].nome = $('#editNome').val();
        clientes[index].endereco = $('#editEndereco').val();
        clientes[index].telefone = $('#editTelefone').val();
        clientes[index].email = $('#editEmail').val();
        clientes[index].marcaCarro = $('#editMarcaCarro').val();
        clientes[index].modeloCarro = $('#editModeloCarro').val();
        localStorage.setItem('clientes', JSON.stringify(clientes));
        $('#editarClienteModal').modal('hide');
        atualizarTabelaClientes();
      });

      $(document).on('click', '.btn-delete', function(){
        var index = $(this).data('index');
        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes.splice(index, 1);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        atualizarTabelaClientes();
      });

      // Adicionar opções de modelos de carros de acordo com a marca selecionada
      $('#marcaCarro').change(function(){
        var marcaSelecionada = $(this).val();
        var modelos;
        switch(marcaSelecionada) {
          case 'Porsche':
            modelos = ['911', 'Panamera', 'Macan', 'Cayenne'];
            break;
          case 'BMW':
            modelos = ['Série 3', 'Série 5', 'X3', 'X5'];
            break;
          case 'Ferrari':
            modelos = ['F8 Tributo', '488 GTB', '812 Superfast', 'Portofino'];
            break;
          case 'Audi':
            modelos = ['A3', 'A4', 'Q5', 'Q7', 'RS6'];
            break;
          case 'FIAT':
            modelos = ['Uno', 'Argo', 'Mobi', 'Toro'];
            break;
          case 'Nissan':
            modelos = ['Versa', 'Sentra', 'Kicks', 'Frontier'];
            break;
          default:
            modelos = [];
            break;
        }
        var selectModelo = $('#modeloCarro');
        selectModelo.empty();
        $.each(modelos, function(index, modelo){
          selectModelo.append('<option value="' + modelo + '">' + modelo + '</option>');
        });
      });

    });
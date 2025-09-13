   $(document).ready(function(){
      $('#registroForm').submit(function(e) {
        e.preventDefault();
        var idVenda = $('#idVenda').val();
        var cliente = buscarClientePorId(idVenda);
        if (cliente) {
          exibirDetalhesVenda(cliente);
        } else {
          alert("Cliente não encontrado!");
        }
      });
      
      function buscarClientePorId(idCliente) {
        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        return clientes.find(function(cliente) {
          return cliente.id === parseInt(idCliente);
        });
      }
      
      function exibirDetalhesVenda(cliente) {
        var detalhesPopup = '<p><strong>Nome do Cliente:</strong> ' + cliente.nome + '</p>' +
                            '<p><strong>Endereço:</strong> ' + cliente.endereco + '</p>' +
                            '<p><strong>Telefone:</strong> ' + cliente.telefone + '</p>' +
                            '<p><strong>E-mail:</strong> ' + cliente.email + '</p>' +
                            '<p><strong>Marca do Carro:</strong> ' + cliente.marcaCarro + '</p>' +
                            '<p><strong>Modelo do Carro:</strong> ' + cliente.modeloCarro + '</p>';
        $('#detalhesPopupBody').html(detalhesPopup);
        $('#detalhesPopup').modal('show');
      }
    });
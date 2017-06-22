# VOTOGEN

## Projeto de um Sistema de Votação Aplicando a Tecnologia Blockchain.

Passos para instalar o testrpc no Windows 10

Instale o Visual Studio Community Edition. 
Se você escolher uma instalação personalizada, os itens mínimos que precisam ser verificados são todos pertencentes ao Visual C ++ (a versão atual é VS 2017)

Instale o SDK do Windows para Windows (Se você estiver no SDK de instalação do Windows 10 para Windows 10)

Instale o Python 2.7 se não estiver instalado, e certifique-se de adicionar seu local de instalação ao seu PATH .

Instale o OpenSSL. Certifique-se de escolher o pacote certo para a sua arquitetura, e apenas instalar o pacote completo (e não a versão leve). 
Você deve instalar o OpenSSL na sua localização recomendada - não altere o caminho de instalação.

A instalação se dá por meio dos comandos:

Para instalar o TesteRPC: `npm install –g ethereumjs-testrpc web3`

Para instalar dependências do repositório: `npm install`

Para executar projeto: `testrpc`

Ao ser executado o projeto criara 10 endereços virtuais de fundos, e por se tratar apenas de um ambiente de teste, não será gasto nenhuma unidade monetária neste processo.

Para desenvolver os contratos inteligentes dentro do Ethereum a linguagem comumente mais utilizada é a Solidity, responsável por realizar a criação, compilação e realização dos testes destes contratos.

Para instalar: `npm install –g truffle`

Para configurar: `mkdir solidity-experiments`

Para iniciar: `truffle init`

Com isso se tem um ambiente de desenvolvimento Ethereum pré-configurado, disponível para elaboração do contrato e inclusão dos dados na plataforma Ethereum.

Para que seja possivel realizar o test de votação, execute: 

Execute: `node deploy.js`

Execute: `node interact.js <endereço> `
O Endereço gerado pelo deploy. 

Copie e altere esse endereço também no `index.js`

Abra: Index.html 

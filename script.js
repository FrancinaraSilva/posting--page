// 1. Seletores: Onde vamos interagir com o HTML
const form = document.querySelector('#form-post');
const tituloInput = document.querySelector('#titulo-input');
const conteudoInput = document.querySelector('#conteudo-input');
const renderizadorTitulo = document.querySelector('#renderizador-titulo');
const renderizadorConteudo = document.querySelector('#renderizador-conteudo');

// 2. Função assíncrona para enviar os dados
const criarPost = async (titulo, conteudo) => {
    // 2.4.1 Montando o objeto de dados
    const data = {
        title: titulo,
        body: conteudo,
        userId: 1
    };

    // 3. Configurações da requisição `fetch`
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const postCriado = await response.json();

        // 4. Renderização do post
        renderizadorTitulo.innerHTML = `Título: ${postCriado.title}`;
        renderizadorConteudo.innerHTML = `Conteúdo: ${postCriado.body}`;

        console.log('Post criado com sucesso:', postCriado);
        alert('Post criado com sucesso!');

    } catch (error) {
        console.error('Falha ao criar o post:', error);
        alert('Ocorreu um erro ao criar o post. Verifique o console.');
    }
};

// 5. Adicionando o evento de submit ao formulário
form.addEventListener('submit', (e) => {
    e.preventDefault(); // 2.3 Previne o comportamento padrão do formulário (recarregar a página)

    const titulo = tituloInput.value;
    const conteudo = conteudoInput.value;

    // Chamando a função para criar o post
    criarPost(titulo, conteudo);
});
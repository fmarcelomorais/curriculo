

async function meuCurriculo() {
    
    let db = await firebase.firestore()
    let dados = await db.collection('curriculos')
    let info = await dados.get()
    
    let curriculos = []
    info.forEach(x => curriculos.push(x.data()))
    
    cv(curriculos)
    
}

async function cv(info){
    const $conteudo = document.getElementById('conteudo')

    let $dados = document.getElementById('dados')
    let $contato = document.getElementById('contato')
    let $tecno = document.getElementById('tecno')
    let $idioma = document.getElementById('idioma')
    let $objetivo = document.getElementById('objetivo')
    let $formacao = document.getElementById('formacao')
    let $cursos = document.getElementById('cursos')
    let $experiencia = document.getElementById('experiencia')
    let $foto = document.getElementById('foto')


       // Dados Pessoais
       await info.forEach(x => {
        const $dadosHTML = ` 
            <h2>${x.data().DadosPessoais.nome}</h2>
            <h4>${x.data().DadosPessoais.cargo}</h4>
            <p>${x.data().DadosPessoais.idade} Anos`
            $conteudo.innerHTML += $dadosHTML
    })

    // Dados de Contato
    await info.forEach(x => {
        const $contatoHTML = ` 
        <ul >
        <li><i class="fab fa-whatsapp mr-2"></i> ${x.data().contato.telefone}</li>
        <li><i class="fas fa-at mr-2"></i> ${x.data().contato.email}</li>
        <li><i class="fab fa-github mr-2"></i><a href="${x.data().contato.git}"> ${x.data().contato.git}<a/></li>
        <li><i class="fab fa-linkedin mr-2"></i><a href="${x.data().contato.linkedin}"> ${x.data().contato.linkedin}<a/></li>
        </ul>
        <hr>
        <h2>Endereço</h2>
        <i class="fas fa-map-marker-alt mr-2"></i>${x.data().endereco.logradouro} - ${x.data().endereco.bairro}<br>
        ${x.data().endereco.cidade} - ${x.data().endereco.estado}
        `
        $conteudo.innerHTML += $contatoHTML
    })



    // Foto
    info.forEach(foto =>{ 

            user = `${(foto.data().contato.git).split('/').slice(-1).join('')}`
            let url =  `https://api.github.com/users/${user}`
            fetch(url).then( response=> { return response.json()})
            .then(data => $foto.innerHTML = `<img src='${data.avatar_url}' alt="foto do curriculo" srcset="" class="image">`)
            .catch(erro => console.log(erro)) 
    })
    
    // Tecnologias
    let tecno = []
    info.forEach(tecnologia => tecno.push(...tecnologia.data().tecnologias))    
    tecno.forEach(tecnologia => {
        $tecno.innerHTML += `<li class="list-group-item"><i class="far fa-file-code mr-2"></i>${tecnologia}</li>` 
    })

    // Idiomas
    let idiomas = []
    info.forEach(idioma => idiomas.push(...idioma.data().idiomas))    
    idiomas.forEach(idiomas => {
        $idioma.innerHTML += `<li class="list-group-item"><i class="fas fa-language mr-2"></i>${idiomas}</li>` 
    })

    // Objetivo
    info.forEach(obj => {
        $objetivo.innerHTML = `
            <p>${obj.data().objetivo}</p>
        `
    })

    //Formação

    let forms = [] 
    info.forEach(form => forms.push(...form.data().formacao))
    forms.forEach(f =>{
        $formacao.innerHTML = `
        <li><strong>${f.formacao}</strong></li>
        <li>${f.entidade}</li>
        <li>${new Date(f.ano).getFullYear()}</li>
        ` 
    })

    //Cursos
    
    let cursos = []
    info.forEach(curso => cursos.push(...curso.data().cursos))    
    cursos.forEach(curso => {
        $cursos.innerHTML = `
        <li><strong>${curso.curso}</strong></li>
        <li>${curso.entidade}</li>
        <li>${new Date(curso.ano).getFullYear()}</li>
        ` 
    })
    
    //Experiencia
    
    let experiencias = []
    info.forEach(experiencia => experiencias.push(...experiencia.data().experiencias))    
    experiencias.map(experiencia => {
        $experiencia.innerHTML = `
        <li><strong>${experiencia.empresa}</strong></li>
        <li>${experiencia.cargo}</li>
        <li>${new Date(experiencia.anoSaida).getFullYear()}</li>
        ` 
    })
    
    $conteudo.innerHTML += $experiencia
}

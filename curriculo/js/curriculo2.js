
const $conteudo = document.getElementById('conteudo')

async function meuCurriculo() {
    
    let db = await firebase.firestore()
    let dados = await db.collection('curriculos')
    let info = await dados.get()
    let curriculos = []

    info.forEach(x => {
        curriculos.push(x.data())    
    })
    



    cv(curriculos)
    
}

async function cv(curriculos){
    

    // Dados Pessoais
    await curriculos.forEach(x => { 
        let $dadosHTML = ''
        
        async function foto(){
            const url = await fetch(`https://api.github.com/users/${(x.contato.git).split('/').slice(-1).join('')}`)
            const urlRepositorio = await fetch(`https://api.github.com/users/${(x.contato.git).split('/').slice(-1).join('')}/repos`)
            const dados = await url.json()    
            const repos = await urlRepositorio.json()    
           // repos.map(repo => console.log(repo.name))      
            
        $dadosHTML = ` 
        <div class="grid">
        <div class="sidebarL">
        <div class="img" id="foto">
        <img src='${dados.avatar_url}' alt="foto do curriculo" srcset="" class="image">
        </div>
        
        <div class="contatos mt-4 ml-3">
            <div class="dadosPessoais">
                <div id="dados">
                <h2>${x.DadosPessoais.nome}</h2>
                <h4>${x.DadosPessoais.cargo}</h4>
                <p>${x.DadosPessoais.idade} Anos
                </div>
                <hr>
                <div class="contato">
                    <h2>Contato</h2>
                    <div id="contato">
                    <ul >
                    <li><i class="fab fa-whatsapp mr-2"></i> ${x.contato.telefone}</li>
                    <li><i class="fas fa-at mr-2"></i> ${x.contato.email}</li>
                    <li><i class="fab fa-github mr-2"></i><a href="${x.contato.git}"> ${x.contato.git}<a/></li>
                    <li><i class="fab fa-linkedin mr-2"></i><a href="${x.contato.linkedin}"> ${x.contato.linkedin}<a/></li>
                    </ul>
                    <hr>
                    <h2>Endereço</h2>
                    <i class="fas fa-map-marker-alt mr-2"></i>${x.endereco.logradouro} - ${x.endereco.bairro}<br>
                    ${x.endereco.cidade} - ${x.endereco.estado}
                    </div>
                </div>
                <hr>
                <div class="tecnologias">
                    <h2>Tecnologias que Domino</h2>                      
                  <ul class="ml-3 list-group" id="tecno">
                  ${x.tecnologias.map(item => `<li class="list-group-item"><i class="far fa-file-code mr-2"></i>${item}</li>`)}                 
                  </ul>         
                </div>
                <hr>
                <div class="idiomas" >
                    <h2>Idiomas</h2>
                    <ul class="ml-3 list-group" id="idioma">
                    ${x.idiomas.map(item => ` <li class="list-group-item"><i class="far fa-language mr-2"></i>${item}</li>`)}
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="sidebarR  m-5">
        <div class="content">                        
            <div class="resumo">
                <div id="objetivo">
                    <h2>OBJETIVO</h2>
                    <p>${x.objetivo}</p>
                </div>
                <hr>
                <div class="formacao">
                    <h2>FORMAÇÃO ACADÊMICA</h2>
                    <ul class="mt-4" id="formacao">
                    ${x.formacao.map(item => (
                        `<li><strong>${item.formacao}</strong></li>
                         <li><strong>${item.entidade}</strong></li>
                         <li><strong>${new Date(item.ano).getFullYear()}</strong></li>`
                  
                 ))}
                    </ul> 
                </div>
            </div>
            <hr>
            <div class="cursos">
                <h2>CURSOS COMPLEMENTARES</h2>
                <div class="curso ml-3 mt-4" >
                    <ul class="mt-4" id="cursos">
                    ${x.cursos.map(item => (
                        `<li><strong>${item.curso}</strong></li>
                         <li><strong>${item.entidade}</strong></li>
                         <li><strong>${new Date(item.ano).getFullYear()}</strong></li>`
                  
                 ))}
                    </ul> 
                </div>
              <hr>
                <h2>EXPERIENCIAS</h2>
                <div class="experiencias ml-3 mt-4" >
                     <ul class="mt-4" id="experiencia">
                     ${x.experiencias.map(item => (
                        ` <li><strong>${item.cargo}</strong></li>
                         <li><strong>${item.empresa}</strong></li>
                         <li><strong>${new Date(item.anoSaida).getFullYear()}</strong></li>`
                  
                 ))}
                    </ul> 
                </div>
                <hr>
                <h2>REPOSITÓRIOS</h2>
                <div class="repositorios">
                ${repos.map(repo => `
                <div class="card mt-2" >
  <div class="card-body">
    <h5 class="card-title">${repo.name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${repo.description}</h6> 
    <a href="${repo.html_url}" target="_blank"  class="card-link">Acessar Repositório</a>
  </div>
</div>`)}
            </div>
        </div>
    </div>
</div>
</div class="mb-3">
<hr>                  
      </br> 
            `
            
            $conteudo.innerHTML += $dadosHTML
        }
            foto() 
        })
        

}

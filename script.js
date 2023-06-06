document.addEventListener('DOMContentLoaded', function() {
  var repositories = [];
  var profile = {};

  var loadBtn = document.getElementById('loadBtn');
  loadBtn.addEventListener('click', loadData);

  function loadData() {
    var usernameInput = document.getElementById('username');
    var username = usernameInput.value.trim();

    if (username === '') {
      console.log('Por favor, insira um nome de usuário do GitHub.');
      return;
    }

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          repositories = response;
          console.log(repositories);

          if (repositories.length > 0) {
            showRepositories();
          } else {
            console.log('Nenhum repositório encontrado.');
          }
        } else {
          console.log('Falha na requisição. Código de status: ' + xhr.status);
        }
      }
    };

    xhr.open('GET', 'https://api.github.com/users/' + username + '/repos', true);
    xhr.send();

    var profileXhr = new XMLHttpRequest();

    profileXhr.onreadystatechange = function() {
      if (profileXhr.readyState === 4) {
        if (profileXhr.status === 200) {
          profile = JSON.parse(profileXhr.responseText);
          console.log(profile);

          if (profile) {
            showProfile();
          } else {
            console.log('Perfil não encontrado.');
          }
        } else {
          console.log('Falha na requisição. Código de status: ' + profileXhr.status);
        }
      }
    };

    profileXhr.open('GET', 'https://api.github.com/users/' + username, true);
    profileXhr.send();
  }

  function showRepositories() {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
  
    if (repositories.length > 0) {
      var containerDiv = document.createElement('div');
      containerDiv.className = 'grid grid-cols-2 gap-4';
  
      for (var i = 0; i < repositories.length; i++) {
        var repo = repositories[i];
        var repoDiv = document.createElement('div');
        repoDiv.className = 'p-6 bg-gray-300 border border-gray-400 rounded-md shadow-md mb-4';
  
        var namePara = document.createElement('p');
        namePara.className = 'font-bold text-red-700';
        namePara.innerHTML = '<strong>Nome do Repositório:</strong> ' + repo.name;
        repoDiv.appendChild(namePara);
  
        var descriptionPara = document.createElement('p');
        descriptionPara.className = 'text-red-700';
        descriptionPara.innerHTML = '<strong>Descrição:</strong> ' + repo.description;
        repoDiv.appendChild(descriptionPara);
  
        var urlPara = document.createElement('p');
        urlPara.className = 'italic text-red-700';
        urlPara.innerHTML = '<strong>URL:</strong> <a href="' + repo.html_url + '">' + repo.html_url + '</a>';
        repoDiv.appendChild(urlPara);
  
        containerDiv.appendChild(repoDiv);
      }
  
      resultDiv.appendChild(containerDiv);

    } else {
      var notFoundPara = document.createElement('p');
      notFoundPara.className = 'text-red-700';
      notFoundPara.textContent = 'Nenhum repositório encontrado.';
      resultDiv.appendChild(notFoundPara);
    }
  }
  

  function showProfile() {
  var profileDiv = document.getElementById('profile');
  profileDiv.innerHTML = '';

  if (profile.name) {
    var avatarImg = document.createElement('img');
    avatarImg.className = 'w-20 h-20 rounded-full mb-4';
    avatarImg.src = profile.avatar_url;
    profileDiv.appendChild(avatarImg);

    var namePara = document.createElement('p');
    namePara.className = 'font-bold text-red-700';
    namePara.textContent = 'Nome: ' + profile.name;
    profileDiv.appendChild(namePara);
  } else {
    var notFoundPara = document.createElement('p');
    notFoundPara.className = 'text-red-700';
    notFoundPara.textContent = 'Perfil não encontrado.';
    profileDiv.appendChild(notFoundPara);
  }
}


  loadData();
});

// Objeto de traduções para os diferentes idiomas
var translations = {
    pt: {
      headerTitle: 'RS EM DADOS',
      maps: 'Mapas',
      dashboards: 'Dashboards',
      business: 'Painel de Negócios',
      reports: 'Relatórios'
    },
    en: {
      headerTitle: 'RS IN DATA',
      maps: 'Maps',
      dashboards: 'Dashboards',
      business: 'Business Panel',
      reports: 'Reports'
    },
    es: {
      headerTitle: 'RS EN DATOS',
      maps: 'Mapas',
      dashboards: 'Tableros',
      business: 'Panel de Negocios',
      reports: 'Informes'
    }
  };
  
  // Função para carregar uma nova página no iframe
  function loadPage(url) {
    document.getElementById('mainFrame').src = url;
  }
  
  // Função para esconder/mostrar o menu lateral e ajustar o conteúdo principal
  function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var content = document.getElementById('content');
    
    sidebar.classList.toggle('collapsed');
    
    if (sidebar.classList.contains('collapsed')) {
      content.classList.add('full');
    } else {
      content.classList.remove('full');
    }
  }
  
  // Função para trocar de idioma e atualizar o texto do cabeçalho e sidebar
  function setLanguage(lang) {
    console.log("Idioma selecionado: " + lang);
    
    // Atualiza o cabeçalho
    document.getElementById('header-title').textContent = translations[lang].headerTitle;
    
    // Atualiza os itens do menu lateral
    document.getElementById('menu-maps').textContent = translations[lang].maps;
    document.getElementById('menu-dashboards').textContent = translations[lang].dashboards;
    document.getElementById('menu-business').textContent = translations[lang].business;
    document.getElementById('menu-reports').textContent = translations[lang].reports;
  }
  
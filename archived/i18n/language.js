let translations = {};

async function loadTranslations() {
	  const res = await fetch('translations.json');
	  translations = await res.json();

	  const storedLang = localStorage.getItem('lang') || 'en';
	  setLanguage(storedLang);

    // Add event listeners for language selection after translations are loaded
    document.querySelectorAll('.language-selector a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLang = link.dataset.lang;
            setLanguage(selectedLang);
            // Update active class
            document.querySelectorAll('.language-selector a').forEach(l => l.classList.remove('active-language'));
            link.classList.add('active-language');
        });
    });
}

function setLanguage(lang) {
	  localStorage.setItem('lang', lang);

	  document.querySelectorAll('[data-i18n]').forEach(elem => {
		      const key = elem.getAttribute('data-i18n');
		      if (translations[lang] && translations[lang][key]) {
			            elem.innerHTML = translations[lang][key]; // Changed to innerHTML
			          }
		    });
}

document.addEventListener('DOMContentLoaded', loadTranslations);
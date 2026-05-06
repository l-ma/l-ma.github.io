let translations = {};

async function loadTranslations() {
	  const res = await fetch('translations.json');
	  translations = await res.json();

	  const storedLang = localStorage.getItem('lang') || 'en';
	  setLanguage(storedLang);
}

function setLanguage(lang) {
	  localStorage.setItem('lang', lang);

	  document.querySelectorAll('[data-i18n]').forEach(elem => {
		      const key = elem.getAttribute('data-i18n');
		      if (translations[lang] && translations[lang][key]) {
			            elem.innerText = translations[lang][key];
			          }
		    });
}

document.addEventListener('DOMContentLoaded', loadTranslations);

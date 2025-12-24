'use strict';

// Función auxiliar para alternar elementos
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// ----------------------------------------------------------------------
// SIDEBAR TOGGLE (Para Móvil)
// ----------------------------------------------------------------------
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if(sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// ----------------------------------------------------------------------
// TESTIMONIALS MODAL
// ----------------------------------------------------------------------
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Variables del modal
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Función para abrir el modal
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Añadir evento click a cada testimonio
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// Eventos para cerrar modal
if(modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if(overlay) overlay.addEventListener("click", testimonialsModalFunc);

// ----------------------------------------------------------------------
// CUSTOM SELECT (Filtro para Móvil)
// ----------------------------------------------------------------------
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if(select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// Añadir evento a todos los items del select
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// ----------------------------------------------------------------------
// FILTER FUNCTION (Portafolio)
// ----------------------------------------------------------------------
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Eventos para los botones de filtro (Escritorio)
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// ----------------------------------------------------------------------
// CONTACT FORM
// ----------------------------------------------------------------------
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if(form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// ----------------------------------------------------------------------
// PAGE NAVIGATION (Con memoria de sesión)
// ----------------------------------------------------------------------
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Función para cambiar de página
const changePage = function (targetPageName) {
  for (let i = 0; i < pages.length; i++) {
    const pageName = pages[i].dataset.page;
    const link = navigationLinks[i];

    if (targetPageName === pageName) {
      pages[i].classList.add("active");
      link.classList.add("active");
      // Guardamos la página actual en la memoria del navegador
      localStorage.setItem("lastPage", targetPageName);
      window.scrollTo(0, 0);
    } else {
      pages[i].classList.remove("active");
      link.classList.remove("active");
    }
  }
};

// Evento de clic en los enlaces
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();
    changePage(targetPage);
  });
}

// AL CARGAR LA PÁGINA: Comprobar si hay una página guardada
window.addEventListener("load", () => {
  const lastPage = localStorage.getItem("lastPage");
  if (lastPage) {
    changePage(lastPage);
  }
});
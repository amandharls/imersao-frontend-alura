import { categories, getCategoriesForProfileId } from "./data.js";
import { createCarousel } from "./components/Carousel.js";
import { PERFIS, STORAGE_PERFIL, getPerfilPorId } from "./profiles.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const perfilNaUrl = params.get("perfil");
  const perfilEscolhido = getPerfilPorId(perfilNaUrl);

  if (perfilEscolhido) {
    localStorage.setItem(STORAGE_PERFIL.nome, perfilEscolhido.nome);
    localStorage.setItem(STORAGE_PERFIL.imagem, perfilEscolhido.img);
    localStorage.setItem(STORAGE_PERFIL.id, String(perfilNaUrl));
    window.history.replaceState(null, "", window.location.pathname);
  }

  const nomePerfil = localStorage.getItem(STORAGE_PERFIL.nome);
  const imagemPerfil = localStorage.getItem(STORAGE_PERFIL.imagem);
  const idSalvo = localStorage.getItem(STORAGE_PERFIL.id);

  if (nomePerfil && imagemPerfil) {
    const kidsLink = document.querySelector(".kids-link");
    const profileIcon = document.querySelector(".profile-icon");
    if (kidsLink) kidsLink.textContent = nomePerfil;
    if (profileIcon) profileIcon.src = imagemPerfil;
    document.title = `Netflix — ${nomePerfil}`;
  }

  const listaCatalogo =
    idSalvo && PERFIS[idSalvo]
      ? getCategoriesForProfileId(idSalvo)
      : categories;

  const container = document.getElementById("main-content");
  if (container) {
    listaCatalogo.forEach((category) => {
      container.appendChild(createCarousel(category));
    });
  }
});

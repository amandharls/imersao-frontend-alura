/**
 * Perfis alinhados aos cards em ../index.html (query ?perfil=1 … 4).
 * img é relativo a Catalogo/catalogo.html → ../Assets/…
 */
export const PERFIS = {
  1: { nome: "Amandha", img: "../Assets/perfil1.png" },
  2: { nome: "Vitória", img: "../Assets/perfil2.png" },
  3: { nome: "Caio", img: "../Assets/perfil2.png" },
  4: { nome: "Andréia", img: "../Assets/perfil2.png" },
};

export const STORAGE_PERFIL = {
  nome: "perfilAtivoNome",
  imagem: "perfilAtivoImagem",
  id: "perfilAtivoId",
};

export function getPerfilPorId(id) {
  if (id == null || id === "") return null;
  return PERFIS[String(id)] ?? null;
}

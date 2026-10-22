const API_URL = `${CONFIG.API_BASE_URL}/items`;

const itemForm = document.querySelector("#item-form");
const itemName = document.querySelector("#item-name");
const itemDescription = document.querySelector("#item-description");
const submitButton = document.querySelector("#submit-button");
const itemList = document.querySelector("#item-list");
const itemCount = document.querySelector("#item-count");
const statusMessage = document.querySelector("#status-message");

function setStatus(message, state = "") {
  statusMessage.textContent = message;
  statusMessage.dataset.state = state;
}

async function readResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : null;
}

function getErrorMessage(body, fallback) {
  if (body && typeof body.message === "string" && body.message.trim()) {
    return body.message;
  }

  if (body && typeof body.error === "string" && body.error.trim()) {
    return body.error;
  }

  return fallback;
}

function getRequestError(error) {
  if (error instanceof TypeError) {
    return "Impossible de joindre l’API. Vérifiez son adresse, que le serveur est démarré et sa configuration CORS.";
  }

  return error.message || "une erreur inattendue est survenue.";
}

function createItemCard(item, index) {
  const card = document.createElement("li");
  card.className = "item-card";

  const marker = document.createElement("span");
  marker.className = "item-marker";
  marker.setAttribute("aria-hidden", "true");
  marker.textContent = String(index + 1).padStart(2, "0");

  const copy = document.createElement("div");
  copy.className = "item-copy";

  const name = document.createElement("h3");
  name.className = "item-name";
  name.textContent = item.name || item.title || "Élément sans nom";
  copy.append(name);

  if (typeof item.description === "string" && item.description.trim()) {
    const description = document.createElement("p");
    description.className = "item-description";
    description.textContent = item.description;
    copy.append(description);
  }

  card.append(marker, copy);
  return card;
}

function renderItems(items) {
  itemList.replaceChildren();
  itemCount.textContent = String(items.length);
  itemCount.setAttribute("aria-label", `${items.length} élément(s)`);

  if (items.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";

    const icon = document.createElement("span");
    icon.className = "empty-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "＋";

    const title = document.createElement("p");
    title.textContent = "Votre liste est encore vide";

    const hint = document.createElement("span");
    hint.textContent = "Ajoutez votre premier élément avec le formulaire.";

    emptyState.append(icon, title, hint);
    itemList.append(emptyState);
    return;
  }

  items.forEach((item, index) => {
    itemList.append(createItemCard(item, index));
  });
}

async function loadItems({ successMessage = "" } = {}) {
  setStatus("Chargement des éléments…");

  try {
    const response = await fetch(API_URL);
    const body = await readResponse(response);

    if (!response.ok) {
      throw new Error(
        getErrorMessage(body, `Impossible de charger les éléments (${response.status}).`),
      );
    }

    const items = Array.isArray(body) ? body : body && body.items;

    if (!Array.isArray(items)) {
      throw new Error("La réponse du serveur ne contient pas une liste d’éléments valide.");
    }

    renderItems(items);
    setStatus(successMessage, successMessage ? "success" : "");
  } catch (error) {
    setStatus(`Erreur lors du chargement : ${getRequestError(error)}`, "error");
  }
}

itemForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = itemName.value.trim();
  const description = itemDescription.value.trim();

  if (!name) {
    itemName.focus();
    setStatus("Saisissez un nom avant d’ajouter un élément.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Ajout en cours…";
  setStatus("Enregistrement de votre élément…");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    const body = await readResponse(response);

    if (!response.ok) {
      throw new Error(
        getErrorMessage(body, `Impossible d’ajouter l’élément (${response.status}).`),
      );
    }

    itemForm.reset();
    await loadItems({ successMessage: "Élément ajouté avec succès." });
  } catch (error) {
    setStatus(`Erreur lors de l’ajout : ${getRequestError(error)}`, "error");
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "Ajouter à la liste";
  }
});

loadItems();
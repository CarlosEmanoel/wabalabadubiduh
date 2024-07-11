document.addEventListener("DOMContentLoaded", () => {
  // Função para abrir modal
  const openModal = (modalId) => {
    const modal = document.querySelector(`[data-modal="${modalId}"]`);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    }
  };

  // Função para fechar modal
  const closeModal = (modal) => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "unset";
  };

  // Event listeners para abrir modals
  document.querySelectorAll("[data-modal-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal-toggle");
      openModal(modalId);
    });
  });

  // Event listeners para fechar modals
  document.querySelectorAll("[data-modal-dismiss]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("[data-modal]");
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // Event listener para fechar modal ao clicar fora do conteúdo
  document.querySelectorAll("[data-modal]").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });
});

import addContactHandler from "@/scripts/handlers/add-contact";
import renameContactHandler from "@/scripts/handlers/rename-contact";

const modalData = {
  "add-contact": {
    type: "form",
    title: "modal.add-contact",
    text: "modal.add-contact-text",
    placeholder: "modal.add-contact-label",
    btnText: "modal.add-contact-btn",
    handler: addContactHandler,
  },
  "rename-contact": {
    type: "form",
    title: "modal.rename-contact",
    text: "modal.rename-contact-text",
    placeholder: "modal.rename-contact-label",
    btnText: "modal.rename-contact-btn",
    handler: renameContactHandler,
  },
  "remove-contact": {
    type: "confirm",
    title: "modal.remove-contact",
    text: "modal.remove-contact-text",
    btnText: "modal.remove-contact-btn",
    // handler: renameContactHandler,
  },
  "clear-chat-contact": {
    type: "confirm",
    title: "modal.clear-chat-contact",
    text: "modal.clear-chat-contact-text",
    btnText: "modal.clear-chat-contact-btn",
    // handler: renameContactHandler,
  },
} as const;

export default modalData;

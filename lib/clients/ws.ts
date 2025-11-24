import { ContactType } from "@/scripts/database/handlers/add-contact-db";
import routes from "../routes";
import { store } from "../store";

import handleSocketAddContact from "@/scripts/handlers/socket/add-contact";

export default function ws() {
  const { token } = store.getState().auth;
  const socket = new WebSocket(`${routes.connServer()}?token=${token}`);

  socket.addEventListener("open", () => {
    console.log("connection server");
  });

  socket.addEventListener("message", async ({ data }) => {
    const dataParse = JSON.parse(data);
    switch (dataParse.type) {
      case "add_contact":
        return handleSocketAddContact({
          id: dataParse.id,
          name: dataParse.name,
        });
      case "new_contacts":
        return dataParse.contacts.forEach((c: ContactType) =>
          handleSocketAddContact(c),
        );
      default:
        console.log("unknown type: ", dataParse.type);
    }
  });
}

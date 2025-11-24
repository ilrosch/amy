const host: string = process.env.EXPO_PUBLIC_API_URL;
const ws: string = process.env.EXPO_PUBLIC_WS;

const routes = {
  "create-account": () => `${host}/create_account`,
  addContact: (id: string) => `${host}/api/add_contact/${id}`,
  connServer: () => `${ws}/ws/conn_server`,
} as const;

export default routes;

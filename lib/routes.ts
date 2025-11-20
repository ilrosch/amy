const host: string = process.env.EXPO_PUBLIC_API_URL;

const routes = {
  "create-account": () => `${host}/create_account`,
  addContact: (id: string) => `${host}/api/add_contact/${id}`,
} as const;

export default routes;

interface User {
  id: string;
  name: string;
  updated_at: string;
  created_at: string;
}

interface Token {
  access_token: string;
  expires_at: string;
}

export { User, Token };

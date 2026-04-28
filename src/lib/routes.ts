const http: string = process.env.EXPO_PUBLIC_API_URL;
const socket: string = process.env.EXPO_PUBLIC_WS;

export const router = {
  user: {
    connect: (t: string) => `${socket}/api/s/connect?token=${t}`,
    create: () => `${http}/api/user/create`,
    refresh: () => `${http}/api/user/refresh`,
    push: () => `${http}/api/user/push`,
  },
  contact: {
    new: (id: string) => `${http}/api/contact/${id}/new`,
    accept: (id: string) => `${http}/api/contact/${id}/accept`,
    reject: (id: string) => `${http}/api/contact/${id}/reject`,
    status: (id: string) => `${http}/api/contact/${id}/status`,
  },
};

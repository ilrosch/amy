import { Middleware } from '@reduxjs/toolkit';
import { contactApi } from '../api';
import { saveContactToDB } from '../api/contactDB';

export const contactMiddleware: Middleware = (store) => (next) => (action) => {};

import { AuthenticateUserDTO, CreateUserDTO } from './auth.types';
import Boom from '@hapi/boom';
import { supabase } from '../../config/supabase';
import {
  AuthResponse,
  AuthTokenResponsePassword,
  UserResponse,
} from '@supabase/supabase-js';

export const authenticateUserService = async (
  credentials: AuthenticateUserDTO
): Promise<AuthTokenResponsePassword['data']> => {
  const signInResponse = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (signInResponse.error) {
    throw Boom.unauthorized(signInResponse.error.message);
  }

  return signInResponse.data;
};

export const createUserService = async (
  user: CreateUserDTO
): Promise<AuthResponse['data']> => {
  const signUpResponse = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        name: user.name,
        address: user.address,
        role: user.role,
      },
    },
  });

  if (signUpResponse.error) {
    throw Boom.badRequest(signUpResponse.error.message);
  }

  return signUpResponse.data;
};

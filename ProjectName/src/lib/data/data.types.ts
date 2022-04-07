/**
 * LOGIN
 */
export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface LoginResponseModel {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * REGISTER
 */

export interface RegisterRequestModel {
  email: string;
  password: string;
}

export interface RegisterResponseModel {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Get User
 */

export interface GetUserResponseModel {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface CurrentUserResponseModel {
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export interface IUser {
  matricule: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUserCredentials {
    matricule: IUser['matricule'];
    password: IUser['password'];
}
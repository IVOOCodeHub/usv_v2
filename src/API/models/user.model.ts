import { IUser } from "../../utils/types/user.interface.ts";

// webadmin..Ident on SQL Server
interface IdentUser {
  Oid: string;
  Ident: string;
  Password: string;
  Nom: string;
  Prenom: string;
  ReceptionGrp: string;
  EntreCom: string;
  Options: string;
  LoginName: string;
  Profile: string;
  Rights: string;
  EmissionGrp: string;
  EmissionGrpId: string;
  Ring: string;
  SubOutActivity: string;
  SubOutInactivity: string;
  GroupMember: string;
  ScriptFramesetUrl: string;
  ScriptFramesetName: string;
  ScriptFramesetType: string;
  AlwaysOnTop: string;
}

export const userModel: (serverUser: IdentUser) => IUser = (
  serverUser: IdentUser,
): IUser => {
  return {
    matricule: serverUser.Ident,
    password: serverUser.Password,
    firstName: serverUser.Prenom,
    lastName: serverUser.Nom,
  };
};

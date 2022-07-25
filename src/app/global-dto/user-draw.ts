import {User} from "./user";

export interface UserDraw {
  id: number;
  user: User;
  registeredForDraw: boolean;
  consecutiveDraws: number;
  declaredParking: number;
}

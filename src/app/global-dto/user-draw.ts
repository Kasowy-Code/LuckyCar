import {User} from "./user";

export interface UserDraw {
  id: number;
  user: User;
  consecutiveDraws: number;
  declaredParking: number;
  registeredForDraw: boolean;
}

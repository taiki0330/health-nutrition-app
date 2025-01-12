import { User } from "../types";

export function bmiCalculations(users: User[]): number{
  users.map((user) => {
    return user.weight * (user.height * user.height);
  })
}
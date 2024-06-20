export default interface IUser {
  id: number;         // Идентификатор пользователя
  username: string;   // Имя пользователя
  role: string;       // Роль пользователя (админ, пользователь и т.д.)
  email: string;      // Email пользователя
}

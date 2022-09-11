export interface IUserEditRequest {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
}

// entity -> user
export interface IUserRequest {
	name: string
	email: string
	password?: string
	age: number
  isAdm?: boolean
}
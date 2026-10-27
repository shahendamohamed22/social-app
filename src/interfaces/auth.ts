export interface IRegister {
  name: string
  username: string
  email: string
  dateOfBirth: string
  gender: string
  password: string
  rePassword: string
}

export interface ILogin {
  email: string
  password: string
}


export interface IChangePassword {
  password: string
  newPassword: string
}


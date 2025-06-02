export interface Address {
  address: string;
  city?: string;
  country?: string;
  is_default?: boolean;
}

export type UserRole = "admin" | "user" | "manage";

export interface User {
  _id: string;
  fullname: string;
  email: string;
  password?: string; // optional nếu không trả về từ BE
  phone?: string;
  role: UserRole;
  addresses?: Address[];
  contact_subject?: string;
  contact_message?: string;
  contact_status: boolean;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
}

export interface IUser {
  _id?: string; // thêm nếu bạn sẽ sử dụng dữ liệu trả về từ MongoDB
  fullname: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user' | 'manage';
  addresses: {
    address: string;
    city?: string;
    country?: string;
    is_default?: boolean;
  }[];
  contact_subject?: string;
  contact_message?: string;
  contact_status?: boolean;
  status?: boolean;
  isVerified?: boolean;
  otp?: string;
  otpExpiresAt?: Date;
  otpSendCount?: number;
  otpLastSentAt?: Date;
  isAllowedResetPassword?: boolean;
  otpWrongCountVerify?: number;
  otpBlockedUntilVerify?: Date | null;
  otpWrongCountForgot?: number;
  otpBlockedUntilForgot?: Date | null;
  isLocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

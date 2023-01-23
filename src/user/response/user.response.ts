export class UserResponse {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  birthday: string;
  phone: string;
  email: string;
  avatar: string;
  live_at: string;
  ward: string;
  province: string;
  district: string;
  gender: number;
  story: string;
  thumbnail: string;
  access_token: string;
  create_at: string;
  update_at: string;
  search: string;

  constructor(user?: Partial<UserResponse>) {
    this.id = user?.id ?? 0;
    this.full_name = user?.full_name ?? '';
    this.first_name = user?.first_name ?? '';
    this.last_name = user?.last_name ?? '';
    this.birthday = user?.birthday ?? '';
    this.phone = user?.phone ?? '';
    this.email = user?.email ?? '';
    this.avatar = user?.avatar ?? '';
    this.live_at = user?.live_at ?? '';
    this.ward = user?.ward ?? '';
    this.province = user?.province ?? '';
    this.district = user?.district ?? '';
    this.gender = user?.gender ?? 0;
    this.story = user?.story ?? '';
    this.thumbnail = user?.thumbnail ?? '';
    this.access_token = user?.access_token ?? '';
    this.create_at = user?.create_at ?? '';
    this.update_at = user?.update_at ?? '';
    this.search = user?.search ?? '';
  }
}

export interface ProfileFormData {
    fullname: string;
    username: string;
    avatar: File | null;
    media_id: number | null;
    _method: "PATCH";
}

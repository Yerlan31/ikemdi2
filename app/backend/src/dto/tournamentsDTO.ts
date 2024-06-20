
export interface TournamentsDTO {
     userId: number;
     title: string;
     description: string;
     yandexLocation: string | undefined; // Changed to Buffer to store binary data
     startAt: Date;
     endAt: Date;
     contacts: string | undefined; // Foreign key for User
}


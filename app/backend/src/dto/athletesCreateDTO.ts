interface AthleteCreateDTO {
     name: string;
     age: number;
     weightCategory: string;
     city: string;
     achievements?: string | undefined;
     imageUrl?: string | undefined; // Changed from string to Buffer for BLOB storage
     created_at: Date;
     updated_at: Date;
}

export default AthleteCreateDTO;

export interface FreelancerEvent {
    id: number;
    event: string;
    account_created: string;
    commercial_code: string;
    device_id: string;
    timestamp: Date;
}

export interface Freelancer {
    user_id: number;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    actif: boolean;
    created_on: Date;
    country: string;
}

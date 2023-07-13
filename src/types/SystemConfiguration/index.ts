export interface ISystemConfiguration {
    openings: OpeningHour[];
    socialNetworks: SocialNetwork[];
    address: string;
}

export interface OpeningHour {
    day: number;
    initialHour: string;
    finalHour: string;
}

export interface SocialNetwork {
    name: string;
    value: string;
}
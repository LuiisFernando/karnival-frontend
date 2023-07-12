export interface ISystemConfiguration {
    openings: OpeningHour[];
    socialNetworks: SocialNetwork[];
    address: string;
}

export interface OpeningHour {
    day: number;
    initialHour: number;
    finalHour: number;
}

export interface SocialNetwork {
    name: string;
    value: string;
}
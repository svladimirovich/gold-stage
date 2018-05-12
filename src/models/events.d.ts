export interface StageEvent {
    id: string;
    title: string;
    date: Date;
    shortDescription: string;
    fullDescription: string;
    location: string;
    bannerBackground: string;
    pictures: Array<string>;
    minTicketPrice: number;
    maxTicketPrice: number;
    soldOut: boolean;
    eventType: "ballet" | "music";
}
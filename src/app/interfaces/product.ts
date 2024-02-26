export interface Product {
    id:number;
    commercial_name: string;
    full_name: string;
    observation: string;
    images: string[];
    base_price: number;
    start_date: Date;
    end_date: Date;
    category: string;
    minimum_increase: number;
    state: number;
    timer: any | null;
    current_bid: number;
}

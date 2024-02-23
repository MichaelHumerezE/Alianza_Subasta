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
    incremento_puja: number;
    state: number;
    timer: any;
    puja_actual: number;
}

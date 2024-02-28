export interface Offer {
  id: number;
  proposer_id: number;
  auction_article_id: number;
  amount_offered: number;
  register_date: Date;
  proposer: string | null;
}

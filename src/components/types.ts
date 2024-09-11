export interface CryptoDetail {
  id: string;
  name: string;
  symbol: string; // Add the symbol property
  image: {
    large: string;
  };
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
  };
  links: {
    homepage: string[];
    twitter_screen_name: string;
    subreddit_url: string;
  };
}

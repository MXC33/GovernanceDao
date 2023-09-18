interface RaffleMedia {
  name: string;
}

interface Landmark {
  rating: string;
}
export interface UpcomingTicketData {
  published: boolean;
  eligible: boolean;
  id: string;
  name: string;
  short_text: string;
  start_date: string;
  end_date: string;
  image: string;
  background_image: string;
  group?: any;
  available_packages: number;
  landmark_id: string;
  special: boolean;
  tickets: number;
  day?: any;
  raffleMedia: RaffleMedia;
  landmark: Landmark;
  status: string;
}
interface UpcomingData {
  upcomming: UpcomingTicketData[];
  count: number;
}



interface RafflePastData {
  past: PastTicketData[];
  count: number;
}

export interface PastTicketData {
  published: boolean;
  eligible: boolean;
  id: string;
  name: string;
  short_text: string;
  start_date: string;
  end_date: string;
  image: string;
  background_image: string;
  group?: any;
  available_packages: number;
  landmark_id: string;
  special: boolean;
  tickets?: any;
  day?: any;
  raffleMedia?: any;
  landmark: Landmark;
  status: string;
  total_entries: number;
  winners: number;
}


export interface RaffleUpcomingResponse {
  success: boolean;
  status: number;
  message: string;
  data: UpcomingData;
}

export interface RafflePastResponse {
  success: boolean;
  status: number;
  message: string;
  data: RafflePastData;
}
export interface ActiveRaffle {
    published: boolean;
    eligible: boolean;
    id: string;
    name: string;
    short_text: string;
    start_date: string;
    end_date: string;
    image: string;
    background_image: string;
    group?: any;
    available_packages: number;
    landmark_id: string;
    special: boolean;
    tickets: number;
    day?: any;
    raffleMedia: RaffleMedia;
    landmark: Landmark;
    sold: number;
}

interface ActiveRaffleItems {
    active: ActiveRaffle[];
    count: number;
}

export interface ActiveRaffleResponse {
    success: boolean;
    status: number;
    message: string;
    data: ActiveRaffleItems;
}


export interface Events{
    id: string,
    title: string,
    subtitle: string,
    image: string,
    place: string,
    startDate: string,
    endDate: string,
    description: string,
}

export interface EventDetail {
    id: string,
    image: string,
    subtitle: string,
    title: string,
}

export interface Sessions {
    availability: string,
    date: string,
    itemQnt: string,
}

export interface Cart {
    id: string,
    title: string,
    subtitle: string,
    image: string,
    session: [{
        id?: number,
        itemQnt: number,
        date: string,
        availability: number,
    }]
}


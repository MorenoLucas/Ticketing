export interface Event {
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
}

export type Event = {
    id: string,
    title: string,
    description: string,
    location: string,
    start: string,
    end: string,
}

export type EventWithIdAndTitle = {
    id: string,
    title: string,
}

export type EventDto = {
    title: string,
    description: string,
    location: string,
    start: string,
    end: string,
}
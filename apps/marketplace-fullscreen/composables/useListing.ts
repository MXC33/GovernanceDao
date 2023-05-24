export type DurationValue = 0 | 1 | 2| 3

export interface Duration {
    value: DurationValue,
    name: string
}

export const useListing = () => {
    const durationOptions: Duration[] = [
        {
            value: 0,
            name: '3 Days'
        },
        {
            value: 1,
            name: '1 Week'
        },
        {
            value: 2,
            name: '1 Week'
        },
        {
            value: 3,
            name: 'Custom'
        }
    ]

    const list = () => {
        /*
            Todo
            Start loading overlay
         */
        console.log('start Loading overlay')
    }

    return {
        durationOptions
    }
}
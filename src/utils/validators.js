export const required = value => (value ? undefined : 'Required Field')
export const range = (from, to) => value => ((value > from && value < to) ? undefined : `Should be more than ${from} and less than ${to}`)

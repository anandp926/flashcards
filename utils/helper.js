/**
 * Created by rozer on 5/7/2018.
 */
export function capitalize (str = '') {
    return typeof str !== 'string'
        ? ''
        : str[0].toUpperCase() + str.slice(1)
}

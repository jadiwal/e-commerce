
export const column_type = {
    type: Number,
    unique: Boolean
}

/**
 * 
 * @param {String} name 
 * @param {*} type 
 */
export function Column(name, type) {

    this.name = name;
    this.type = type;

}
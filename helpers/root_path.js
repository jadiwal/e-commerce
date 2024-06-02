export class ROOT_PATH {

    __base_path = '/'

    /**
     * @description this is a class to simplify routing with root routes
     * @param {String} root the root path for the file
     */
    constructor(root = '/') {
        this.__base_path = root
    }

    /**
     * @description this is a class to connect the root route to the endpoint
     * @param {String} endpoint the endpoint for the api
     * @returns a endpoint with the root route attached
     */
    route(endpoint) {
        return `${this.__base_path}${this.__base_path[this.__base_path.length - 1] == "/" ? "" : "/"}${endpoint == "/" ? "" : endpoint}`
    }

    /**
     * @description this is a class to give route to the endpoint
     * @param {String} endpoint the endpoint for the api
     * @returns a endpoint without the root route attached
     */
    base_route(endpoint) {
        return `/${endpoint == "/" ? "" : endpoint}`
    }

}
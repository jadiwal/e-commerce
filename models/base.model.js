import { Database } from '../config/db.config.js';
// import { Query } from '../helpers/query.js';

export class Model {

    constructor( table ) {
        this.table = table
    }

    get_all() {

        let cThis = this;
        return new Promise(function (myResolve, myReject) {
            Database.executeQuery('select * from ??',[cThis.table])
                .then((result, error) => {
                    if (error) myReject(error)
                    myResolve(result)
                })
        })

    }

    find(id, key = 'id') {

        let cThis = this;
        return new Promise(function (myResolve, myReject) {
            Database.executeQuery('select * from ?? where ?? = ?', [cThis.table, key, id])
                .then((result, error) => {
                    if (error) myReject(error)
                    myResolve(result)
                })
        })

    }

    create(data) {

        let cThis = this;
        return new Promise(function (myResolve, myReject) {
            Database.executeQuery('insert into ?? set ?', [cThis.table, data])
                .then((result, error) => {
                    if (error) myReject(error)
                    myResolve(result)
                })
        })

    }

    update(id, data, key = 'id') {

        let cThis = this;
        return new Promise(function (myResolve, myReject) {
            Database.executeQuery('update ?? set ? where ?? = ?', [cThis.table, data, key, id])
                .then((result, error) => {
                    if (error) myReject(error)
                    myResolve(result)
                })
        })

    }

    where(condition) {

        let cThis = this;
        return new Promise(function (myResolve, myReject) {
            Database.executeQuery('select * from ?? where ?', [cThis.table, condition])
                .then((result, error) => {
                    if (error) myReject(error)
                    myResolve(result)
                })
        })

    }

  /** 
     * @param {Query} custom_query The date
     */

  customQuery(custom_query) {
    return new Promise(function (myResolve, myReject) {
        Database.executeQuery(custom_query.sql, custom_query.params)
            .then((result, error) => {
                if (error) myReject(error);
                myResolve(result);
            });
    });
}

}


export class Query {

    constructor( table ) {
        this.table = table;
        this.joins = [];
    }

    COMPARATOR = {
        equals: '=',
        not_equals: '<>',
        greator_than: '>',
        less_than: "<",
        greator_than_equal: ">=",
        less_than_equal: "<=",
        like : 'like',
        in: 'in'
    }

    toString() {
        try {
            var conditions = '';
            var joins = '';

            this.joins.forEach(join => {
                const keys = join.condition.keys();
                const values = join.condition.values();
                joins += `\n ${join.type} join ${join.table} on ${join.table}.${keys[0]} = ${join.sTable}.${values[0]}`
            });
            const condition_keys = Object.keys(this.conditions);

            condition_keys.forEach((key, index) => {
                conditions += `${ index > 0 ? ' and ' : '' }${this.table}.${key} = ${this.conditions[key]}`
            });

            return `select * from ${this.table}${joins} where ${conditions}`   
        } catch (error) {
            console.log(error);
        }
    }

    where(condition) {
        this.conditions = condition
        return this
    }

    leftJoin(table, condition, secondTable = this.table) {
        this.joins.push({
            table: table,
            sTable: secondTable,
            type: 'left',
            condition: condition
        })
        return this
    }

    rightJoin(table, condition, secondTable = this.table) {
        this.joins.push({
            table: table,
            sTable: secondTable,
            type: 'right',
            condition: condition
        })
        return this
    }

    innerJoin(table, condition, secondTable = this.table) {
        this.joins.push({
            table: table,
            sTable: secondTable,
            type: 'inner',
            condition: condition
        })
        return this
    }

}
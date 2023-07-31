import { faker } from '@faker-js/faker';
import fs from 'fs';
import _ from 'lodash';

const generateGroups = () => {
    const groups = [];
    let time = _.now();
    for (let i = 0; i < 3; i++) {
        groups.push({
            id: faker.string.uuid(),
            name: faker.helpers.arrayElement(['red', 'blue', 'green']),
            users: _.times(3, () => ({
                id: faker.string.uuid(),
                Name: faker.person.firstName(),
                tasks: _.times(3, () => {
                    const taskTime = time;
                    time += 1000;
                    return {
                    id: faker.string.uuid(),
                    title: faker.lorem.word(),
                    description: faker.lorem.sentence(),
                    done: faker.datatype.boolean(),
                    timestamp: taskTime,
                    }
                }),
            })),
        });
    }
    return groups;
}
 
let groups = [];

if (groups!==[]){
    groups = generateGroups();
    fs.writeFileSync('./data/db.json', JSON.stringify({ groups }, null, 2));
}

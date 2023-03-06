import {TaskService} from '../../src/service/task.service';
import { DBConnection } from '../../src/database/db-connection';

beforeAll(async () => {
    await DBConnection.databaseConnection();
});

describe('Create task', ()=>{
    test('empty string should result in zero', async () => {
        const taskService = new TaskService();
        const title = "Test";
        const description = 'Some description latest';
        const result = await taskService.createTask(title, description);
        expect(result).toBeDefined();
        expect(result.title).toEqual('Test');
        expect(result.description).toEqual("Some description latest");
    });
})

// 14ab5043-eca8-464a-a684-58816e01fa90

describe('get task', ()=>{
    test('empty string should result in zero', async () => {
        const taskService = new TaskService();
        const id = "1a5ab649-a5a8-41ff-be44-0585d01bd588";
        const result = await taskService.getTask(id);
        expect(result).toBeDefined();
        expect(result).toHaveProperty('id', "1a5ab649-a5a8-41ff-be44-0585d01bd588");
    });
})

describe('update task', ()=>{
    test('empty string should result in zero', async () => {
        const taskService = new TaskService();
        const id = "39c21969-4749-40fc-8578-4b4f40df2bd2";
        const title = "Test 1";
        const description = 'Some description 2222';
        const hours = 2;
        const status = 2;
        const result = await taskService.updateTask(id, title, description, hours, status);
        expect(result).toBeDefined();
        expect(result.id).toEqual("39c21969-4749-40fc-8578-4b4f40df2bd2");
        expect(result.title).toEqual('Test 1');
        expect(result.description).toEqual("Some description 2222");
        expect(result.hours).toEqual(2);
        expect(result.status).toEqual(2);
    });
})

describe('delete task', ()=>{
    test('empty string should result in zero', async () => {
        const taskService = new TaskService();
        const id = "6e505c90-a5b6-4689-8edb-f1da753e8884";
        const result = await taskService.deleteTask(id);
        expect(result).toBeTruthy();
    });
})

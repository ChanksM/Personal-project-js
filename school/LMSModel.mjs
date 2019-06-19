import { subjects } from './SubjectsModel';

class LMSModel {
    constructor() {
        this.subjects = new Map();
    }

    async add(id) {
        this.subjects.set(id, subjects);
    }

    async remove(id) {
        this.subjects.delete(id);
    }

    async verify(id) {
        return this.subjects.has(id);
    }

    async read(id) {
        return subjects.get(id);
    }

    async readAll() {
        return this.subjects.values().map(subjectId => ({ subjectId }));
    }
}

export {LMSModel}

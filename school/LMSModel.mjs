class LMSModel {
    constructor() {
        this.subjects = new Map();
    }

    async add(subject) {
        this.subjects.set(subject.id, subject);
    }

    async remove(id) {
        this.subjects.delete(id);
    }

    async verify(id) {
        return this.subjects.has(id);
    }

    async read(id) {
        return this.subjects.get(id);
    }

    async readAll() {
        return this.subjects.values().map(subjectId => ({ subjectId }));
    }
}

export {LMSModel}

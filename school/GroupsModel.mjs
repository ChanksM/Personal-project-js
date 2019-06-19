import {createId} from './idMaker'

class GroupsModel {
    constructor(pupil){
        this.groups = new Map();
        this.pupil = pupil;
    }

    conclution(id){
        if(!this.groups.has(id)) {
            throw new Error('User not found with this id');
        }
    }

    async add(room){
        if(typeof room !== "number") {
            throw new Error('Parameter must be a number');
        }

        const id = createId();
        this.groups.set(id, { room, students: new Set() });
        return id;
    }

    async read(id){
        this.conclution(id);
        return { id, ...this.groups.get(id) };
    }

    async remove(id){
        this.conclution(id);
        this.groups.delete(id);
    }

    async update(id, room){
        this.conclution(id);
        this.groups.set(id, room);
    }

    async readAll(){
        const result = [];
        this.groups.forEach(({...group}, id) => {
            group.students = Array.from(group.students);
            result.push({ id, ...group });
        });

        return result;
    }

    async addPupil(id, pupil){
        if(this.groups.has(id)) {
            this.groups.get(id).students.add(pupil);
        } else {
            throw new Error('Unknown id !');
        };
    }

    async removePupil(id, pupil){
        if(this.groups.has(id)) {
            this.groups.get(id).students.delete(pupil);
        } else {
            throw new Error('Unknown id !');
        };
    }
}

export { GroupsModel };

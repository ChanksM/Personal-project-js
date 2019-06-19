import {createId} from './IdMaker'

class GroupsModel {
    constructor(pupil){
        this.groups = new Map();
        this.pupil = pupil;
    }

    checkValidation(obj){
        if(typeof obj !== "number") {
            throw new Error('Parameter must be a number');
        }
    }

    conclution(id){
        if(!this.groups.has(id)) {
            throw new Error('User not found with this id');
        }
    }

    idError(){
        throw new Error('Unknown id !');
    }

    async add(room){
        this.checkValidation(room);
        
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
        } else this.idError();
    }

    async removePupil(id, pupil){
        if(this.groups.has(id)) {
            this.groups.get(id).students.delete(pupil);
        } else this.idError();
    }
}

export { GroupsModel };

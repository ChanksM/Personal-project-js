import {Validator} from  './validator.mjs'
import {subjSchema} from './schema/subjectSchema'
import {createId} from './IdMaker'
class SubjectsModel {
    constructor(subject) {
        Validator.validate(subject, subjSchema);
        this.id = createId();
        subjects.set(this.id, subject);
        return this.id;
    }
}
 
const subjects = new Map();


export { subjects, SubjectsModel };

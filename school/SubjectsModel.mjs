import {Validator} from  './validator.mjs'
import {subjSchema} from './schema/subjectSchema'
import {createId} from './idMaker'
class SubjectsModel {
    constructor(subject) {
        Validator.validate(subject, subjSchema);
        this.title = subject.title;
        this.lessons = subject.lessons;
        this.description = subject.description;
        this.id = createId();
        return this.id;
    }
}


export { SubjectsModel };

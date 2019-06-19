import {
    SubjectsModel,
    LMSModel,
    TeachersModel,
    PupilsModel,
    GroupsModel,
    GradesbooksModel
} from './school/index.mjs';

const teacherSchema = { name: { first: 'Mushni', last: 'Chankseliani' }, 
    image: "Photo", 
    dateOfBirth: '10-03-1980',
    emails: [{ email: 'mushni.chankseliani.1@btu.edu.ge', primary: true }],
    phones: [{ phone: '577577577', primary: false }],
    sex: 'male', subjects: [{ subject: 'History' }], 
    description: 'Hello world' 
};

const pupilSchema = { name: { first: 'Mush', last: 'Chanks' }, 
    image: "Picture", 
    dateOfBirth: '10-03-2000',
    phones: [{ phone: '577588577', primary: false }],
    sex: 'male', description: 'Hello world'
};

const pupilSchemaSecond = { name: { first: 'Mu', last: 'Ch' },
    phones: [{ phone: '577588599', primary: false}, { phone: '599557558', primary: true}],
    sex: 'male', description: 'Hello again'
};
(async () => {
    const history = new SubjectsModel({
        title: 'History',
        lessons: 24,
        description:'Hello History'
    });

    const lms = new LMSModel();
    await lms.add(history);

    const teacher = new TeachersModel();
    const teacherID = await teacher.add(teacherSchema);
    
    const pupil = new PupilsModel();
    const pupilId = await pupil.add(pupilSchema);
    await pupil.update(pupilId, pupilSchemaSecond)
    
    const group = new GroupsModel(pupil);
    const groupID = await group.add(236);
    await group.addPupil(groupID, pupilId);
    await group.readAll()

    const level = 1;
    const grade = await new GradesbooksModel(group, teacher, lms);
    const gradebook = await grade.add(level, groupID);

    const record = { pupilId: pupilId,
        teacherId: teacherID,
        subjectId: history,
        lesson: 3,
        mark: 7 };

    await grade.addRecord(gradebook, record);

    const me = await grade.read(gradebook, pupilId);
    const result = await grade.readAll(gradebook);
    // console.log(me);
    // console.log(result)
})()
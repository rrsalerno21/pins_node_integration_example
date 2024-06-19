import { createPinsDepartment, createPinsInsured, createPinsProject, createPinsRecord, listPinsDepartments, listPinsProjects, listPinsRequirementTemplates, listPinsUsers } from './pins_api.js';
import sampleCsv from './sample_csv.js';

// We are using a sample set of data with two contracts (records) in sample_csv

// Because the data set does not provide department names, this is an example of how you could internally map 
// the department codes from your db to department names in PINS
const departmentCodeNameMapping = {
    '350': 'Policy and Management',
    '270': 'Community Development'
};

// get PINS departments
const pinsDepartments = await listPinsDepartments();

// get PINS projects
const pinsProjects = await listPinsProjects();

// get PINS requirement templates
const requirementTemplates = await listPinsRequirementTemplates();

// pick a requirement template to assign to record, we will just pick the first one for simplicity
const selectedRequirementTemplateId = requirementTemplates.data?.length ? requirementTemplates.data[0].id : null;

// get PINS users
const pinsUsers = await listPinsUsers();

// pick a user to assign to the records, we will just pick the first one for simplicity
const selectedUserId = pinsUsers.data?.length ? pinsUsers.data[0].id : null;

// loop through our sample data.  You can imagine this would be looping through your queried/extracted data
for (let i = 0; i < sampleCsv.length; i++) {
    const contract = sampleCsv[i];

    // firstOrCreate department
    let departmentId = null;
    const existingDepartment = pinsDepartments.data.find(department => {
        const departmentNameFromCode = departmentCodeNameMapping[contract.Dept];

        return department.name === departmentNameFromCode;
    });

    if (!existingDepartment?.id) {
        console.log('We are making a department');

        const departmentName = 'Same Department A from Integration Script';
        // const department = await createPinsDepartment(departmentName);
        // departmentId = department.id;
    } else {
        departmentId = existingDepartment.id;
    }

    // firstOrCreate project
    let projectId = null;
    const existingProject = pinsProjects.data.find(project => project.name === contract.Desc);

    if (!existingProject?.id) {
        console.log('We are making a project');
        const name = contract.Desc;
        const number = contract.Contract_No;
        const startDate = contract.Est_Start;
        const endDate = contract.Est_End;

        // const project = await createPinsProject({ departmentId, name, number, startDate, endDate });
        // projectId = project.id;
    } else {
        projectId = existingProject.id;
    }


    // firstOrCreate vendor
    console.log('We are firstOrCreating a vendor');

    const name = contract.Vendor;
    const address = contract.address;
    const city = contract.Vendor;
    const state = contract.Vendor;
    const zip = contract.Vendor;
    const country = contract.Vendor;
    const email = contract.v_email_addrs;
    const contactName = contract.v_contact1_name;
    const phone = contract.v_contact1_phone;
    const cc = contract.v_email_cont1;
    const secondaryPhone = contract.v_contact2_phone;
    const legalName = contract.v_dba;

    // const vendor = await createPinsInsured({
    //     name,
    //     address,
    //     city,
    //     state,
    //     zip,
    //     country,
    //     email,
    //     contactName,
    //     phone,
    //     cc,
    //     secondaryPhone,
    //     legalName
    // });
    // const {id: vendorId} = vendor;

    // firstOrCreate contract using user_id and requirement_template_id
    if (selectedUserId && selectedRequirementTemplateId) {
        console.log('We are firstOrCreating a record');
        // const pinsRecord = await createPinsRecord({
        //     insuredId: vendorId,
        //     projectId,
        //     ownerId: selectedUserId,
        //     contractNumber: contract.Contract_No,
        //     requirementTemplateId: selectedRequirementTemplateId
        // });
    }
}

// Add your concluding logic here
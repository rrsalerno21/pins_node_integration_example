import fetch from 'node-fetch';

const apiRoute = 'https://portal.pinsadvantage.com';
const version = 'api/v1.0'

export const getBearerToken = async () => {
    const authRoute = `${apiRoute}/api/oauth/token`;
    const clientId = '';
    const clientSecret = '';
    const authBody = JSON.stringify({
        "grant_type": "client_credentials",
        "client_id": clientId,
        "client_secret": clientSecret,
        "scope": "update-insured-info"
    })

    const apiResponse = await fetch(authRoute, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: authBody,
    });

    const authData = await apiResponse.json();

    const { access_token: accessToken } = authData;

    return `Bearer ${accessToken}`;
}

export const listPinsDepartments = async (pageNumber = 1, pageSize = 100) => {
    const bearerToken = await getBearerToken();
    const route = `${apiRoute}/${version}/departments?pageNumber=${pageNumber}&pageSize=${pageSize}`

    const apiResponse = await fetch(route, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
        }
    });

    return await apiResponse.json();
}

export const listPinsProjects = async (pageNumber = 1, pageSize = 100) => {
    const bearerToken = await getBearerToken();
    const route = `${apiRoute}/${version}/projects?pageNumber=${pageNumber}&pageSize=${pageSize}`

    const apiResponse = await fetch(route, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
        }
    });

    return await apiResponse.json();
}

export const listPinsRequirementTemplates = async (pageNumber = 1, pageSize = 100) => {
    const bearerToken = await getBearerToken();
    const route = `${apiRoute}/${version}/requirement-templates?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    const apiResponse = await fetch(route, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
        }
    });

    return await apiResponse.json();
}

export const listPinsUsers = async (pageNumber = 1, pageSize = 100) => {
    const bearerToken = await getBearerToken();
    const route = `${apiRoute}/${version}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    const apiResponse = await fetch(route, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
        }
    });

    return await apiResponse.json();
}

export const createPinsDepartment = async name => {
    const bearerToken = await getBearerToken();
    const route = `${apiRoute}/${version}/departments`;
    
    const bodyParams = JSON.stringify({
        "name": name,
    })

    const apiResponse = await fetch(route, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
        },
        body: bodyParams,
    });

    return await apiResponse.json();
}

export const createPinsProject = async ({ 
    departmentId,
    name,
    number,
    startDate,
    endDate,
    description = '',
    notes = '',
    ownerId = null,
    defaultRequirementTemplateId = null
}) => {
    const bearerToken = await getBearerToken();
    const route = `${apiRoute}/${version}/departments/${departmentId}/projects`;

    const bodyParams = JSON.stringify({
        name,
        name,
        number,
        description,
        start_date: startDate,
        end_date: endDate,
        notes,
        owner_id: ownerId,
        default_requirement_template_id: defaultRequirementTemplateId
    })

    const apiResponse = await fetch(route, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
        },
        body: bodyParams,
    });

    return await apiResponse.json();
}

export const createPinsInsured = async ({ 
    name,
    email,
    contactName = '',
    address = '',
    city = '',
    state = '',
    zip = '',
    country = '',
    phone = '',
    secondaryPhone = '',
    businessType = '',
    description = '',
    cc = '',
    notes = '',
    guarantorName = '',
    legalName = '',
    ownerId = null,
    defaultRequirementTemplateId = null
}) => {
    const bearerToken = await getBearerToken();
    const route = `${apiRoute}/${version}/insureds`;

    const bodyParams = JSON.stringify({
        name,
        email,
        contact_name: contactName,
        address,
        city,
        state,
        zip,
        country,
        phone,
        secondary_phone: secondaryPhone,
        business_type: businessType,
        description,
        cc,
        notes,
        guarantor_name: guarantorName,
        legal_name: legalName,
        owner_id: ownerId,
        default_requirement_template_id: defaultRequirementTemplateId,
    })

    const apiResponse = await fetch(route, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
        },
        body: bodyParams,
    });

    return await apiResponse.json();
}

export const createPinsRecord = async ({ 
    insuredId,
    projectId,
    ownerId,
    contractNumber = '',
    description = '',
    requirementTemplateId = null,
}) => {
    const bearerToken = await getBearerToken();
    const route = `${apiRoute}/${version}/insureds`;

    const bodyParams = JSON.stringify({
        insured_id: insuredId,
        project_id: projectId,
        owner_id: ownerId,
        contract_number: contractNumber,
        description,
        requirement_template_id: requirementTemplateId
    })

    const apiResponse = await fetch(route, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
        },
        body: bodyParams,
    });

    return await apiResponse.json();
}
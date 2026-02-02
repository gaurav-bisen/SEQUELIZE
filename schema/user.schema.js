import ajvInstance from './ajv.instance.js'

const schema = {
    type: 'object',  
    
    properties: {
        id: {
            type: 'number'
        },
        name: {
            type: 'string',
            minLength: 1
        },
        email: {
            type: 'string',
            format: 'email'
        },
        status: {
            type: 'string'
        },
        password: {
            type: 'string',
            minLength: 6
        },
        role: {
            type: 'string',
            enum: ['user', 'admin']
        }
    },

    required: ['name', 'email', 'password' ],

    additionalProperties: false,
};

export default ajvInstance.compile(schema);
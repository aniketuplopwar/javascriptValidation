import Validation from './Validation';

const regexValMethod = jest.fn().mockImplementation(() => {
    return true;
  });

const requiredValMethod = jest.fn().mockImplementation(() => {
    return 'This value is required';
  });

describe('Validation', () => {
    let validation,
        ValidationInfo= {
            email: {
                regex: {
                    value: /^([0-9]+)$/,
                    message: 'enter numbers only'
                },
                required: {
                    value: true,
                    message: 'value is required'
                }
            },
            name: {
                required: {
                    value: 'true',
                    message: 'value is required'
                }
            },
            
        },
        ValidationMethods = {
            regex: regexValMethod,
            required: requiredValMethod
        };

    beforeEach(() => {
        validation = new Validation(ValidationInfo, ValidationMethods);
    });

    it('should be defined', () => {
        expect(Validation).toBeDefined();
    });

    it('should return eligible validation methods for a given input name', () => {
        const methods = validation.getValidationMethods('email');
        expect(methods.length).toBe(2);
        expect(typeof methods[0]).toBe('function');
        expect(typeof methods[1]).toBe('function');
    });

    it('should validate input value based on its name', () => {
        const result = validation.validate('name', 'sample');
        console.log(result);
        expect(requiredValMethod).toHaveBeenCalled();
        expect(result).toEqual('This value is required');
    });
})
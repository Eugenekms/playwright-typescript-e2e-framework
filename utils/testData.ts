import { faker } from '@faker-js/faker';
import { ContactFormData } from '../pages/ContactPage';

export const createContactData = (overrides?: Partial<ContactFormData>): ContactFormData => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    subject: 'Status of my order',
    message: faker.lorem.paragraph(),
    ...overrides,
});

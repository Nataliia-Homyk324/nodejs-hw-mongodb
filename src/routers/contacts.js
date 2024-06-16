
//оновлений роутер


import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper((req) => getContactsController({ ...req.query, userId: req.user._id })));

contactsRouter.get('/:contactId', isValidId, ctrlWrapper((req) => getContactByIdController({ contactId: req.params.contactId, userId: req.user._id })));

contactsRouter.post('/', validateBody(createContactSchema), ctrlWrapper((req) => createContactController({ ...req.body, userId: req.user._id })));

contactsRouter.delete('/:contactId', isValidId, ctrlWrapper((req) => deleteContactController({ contactId: req.params.contactId, userId: req.user._id })));

contactsRouter.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper((req) => patchContactController({ contactId: req.params.contactId, userId: req.user._id, ...req.body })));

export default contactsRouter;


// import { Router } from "express";
// import {
//   getContactsController,
//   getContactByIdController,
//   createContactController,
//   deleteContactController,
//   patchContactController,
// } from '../controllers/contacts.js';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js';
// import { isValidId } from '../middlewares/isValidId.js';
// import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
// import { authenticate } from '../middlewares/authenticate.js';


// const contactsRouter = Router();


// contactsRouter.use(authenticate);

// contactsRouter.get('/', ctrlWrapper(getContactsController));

// contactsRouter.get('/:contactId',isValidId, ctrlWrapper(getContactByIdController));

// contactsRouter.post('/',validateBody(createContactSchema), ctrlWrapper(createContactController));

// contactsRouter.delete('/:contactId',isValidId, ctrlWrapper(deleteContactController));

// contactsRouter.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));


// export default contactsRouter;


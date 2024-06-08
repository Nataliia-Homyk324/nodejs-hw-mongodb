import { getAllContacts, getContactById, createContact } from '../services/contacts.js';
import createHttpError from 'http-errors';


export const getContactsController = async (
  req,
  res,
	next,
) => {
	try {
	  const contacts = await getAllContacts();

	  res.json({
	    status: 200,
	    message: 'Successfully found students!',
	    data: contacts,
	  });
	} catch(err) {
		next(err);
	}
};


export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    // 2. Створюємо та налаштовуємо помилку
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {

  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber) {
     next(createHttpError(400, 'Name and phoneNumber are required'));
    return;
  }

   await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: { name, phoneNumber, email, isFavourite, contactType },
  });
};

import { getAllContacts, getContactById } from '../services/contacts.js';
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

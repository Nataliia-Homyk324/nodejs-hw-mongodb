import { getAllContacts, getContactById, createContact, deleteContact, updateContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

//з userId, який додається до req.user мідлварою authenticate

// Контролер для отримання всіх контактів
export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id; // Використовуємо userId з мідлвари

    const contacts = await getAllContacts({
      userId,
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    res.json({
      status: 200,
      message: 'Успішно знайдено контакти!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

// Контролер для отримання контакту за ID
export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id; // Використовуємо userId з мідлвари

    const contact = await getContactById({ contactId, userId });

    if (!contact) {
      next(createHttpError(404, 'Контакт не знайдено'));
      return;
    }

    res.json({
      status: 200,
      message: `Успішно знайдено контакт з id ${contactId}!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

// Контролер для створення нового контакту
export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber } = req.body;
    const userId = req.user._id; // Використовуємо userId з мідлвари

    if (!name || !phoneNumber) {
      next(createHttpError(400, 'Ім\'я та номер телефону обов\'язкові'));
      return;
    }

    const newContact = await createContact({ ...req.body, userId });

    res.status(201).json({
      status: 201,
      message: 'Контакт успішно створено!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

// Контролер для видалення контакту
export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id; // Використовуємо userId з мідлвари

    const contact = await deleteContact({ contactId, userId });

    if (!contact) {
      next(createHttpError(404, 'Контакт не знайдено', { message: 'Контакт не знайдено' }));
      return;
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// Контролер для оновлення контакту
export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id; // Використовуємо userId з мідлвари

    const result = await updateContact({ contactId, userId, payload: req.body });

    if (!result) {
      next(createHttpError(404, 'Контакт не знайдено', { message: 'Контакт не знайдено' }));
      return;
    }

    res.json({
      status: 200,
      message: 'Контакт успішно оновлено!',
      data: result.contact,
    });
  } catch (err) {
    next(err);
  }
};


// // з userID
// export const getContactsController = async (
//   userId,
//   req,
//   res,
// 	next,
// ) => {
//   try {
//     const { page, perPage } = parsePaginationParams(req.query);
//     const { sortBy, sortOrder } = parseSortParams(req.query);
//     const filter = parseFilterParams(req.query);

// 	  const contacts = await getAllContacts({
//       userId,
//       page,
//      perPage,
//      sortBy,
//      sortOrder,
//      filter,
//    });

// 	  res.json({
// 	    status: 200,
// 	    message: 'Successfully found contacts!',
// 	    data: contacts,
// 	  });
// 	} catch(err) {
// 		next(err);
// 	}
// };

// export const getContactByIdController = async (req, res, next) => {
//   const { contactId,userId  } = req.params;
//   const contact = await getContactById(contactId, userId);

//   if (!contact) {
//     // 2. Створюємо та налаштовуємо помилку
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully found contact with id ${contactId}!`,
//     data: contact,
//   });
// };

// export const createContactController = async (req, res, next) => {
//   const { name, phoneNumber } = req.body;

//   if (!name || !phoneNumber) {
//     next(createHttpError(400, 'Name and phoneNumber are required'));
//     return;
//   }
//   delete req.body._V;
//   const newContact = await createContact(req.body);

//   res.status(201).json({
//     status: 201,
//     message: `Successfully created a contact!`,
//     data: newContact,
//   });
// };

// export const deleteContactController = async (req, res, next) => {
//   const { contactId,userId } = req.params;

//   const contact = await deleteContact(contactId,userId);

//   if (!contact) {
//     next(createHttpError(404, 'Contact not found', { message: 'Contact not found' }));
//     return;
//   }

//   res.status(204).send();
// };

// export const patchContactController = async (req, res, next) => {
//   const { contactId,userId } = req.params;
//   const result = await updateContact(contactId,userId, req.body);

//   if (!result) {
//     next(createHttpError(404, 'Contact not found',   { message: 'Contact not found' } ));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully patched a contact!`,
//     data: result.contact,
//   });
// };



// export const getContactsController = async (
//   req,
//   res,
// 	next,
// ) => {
//   try {
//     const { page, perPage } = parsePaginationParams(req.query);
//     const { sortBy, sortOrder } = parseSortParams(req.query);
//     const filter = parseFilterParams(req.query);

// 	  const contacts = await getAllContacts({
//      page,
//      perPage,
//      sortBy,
//      sortOrder,
//      filter,
//    });

// 	  res.json({
// 	    status: 200,
// 	    message: 'Successfully found contacts!',
// 	    data: contacts,
// 	  });
// 	} catch(err) {
// 		next(err);
// 	}
// };

// export const getContactByIdController = async (req, res, next) => {
//   const { contactId } = req.params;
//   const contact = await getContactById(contactId);

//   if (!contact) {
//     // 2. Створюємо та налаштовуємо помилку
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully found contact with id ${contactId}!`,
//     data: contact,
//   });
// };



// export const createContactController = async (req, res, next) => {
//   const { name, phoneNumber } = req.body;

//   if (!name || !phoneNumber) {
//     next(createHttpError(400, 'Name and phoneNumber are required'));
//     return;
//   }
//   delete req.body._V;
//   const newContact = await createContact(req.body);

//   res.status(201).json({
//     status: 201,
//     message: `Successfully created a contact!`,
//     data: newContact,
//   });
// };

// export const deleteContactController = async (req, res, next) => {
//   const { contactId } = req.params;

//   const contact = await deleteContact(contactId);

//   if (!contact) {
//     next(createHttpError(404, 'Contact not found', { message: 'Contact not found' }));
//     return;
//   }

//   res.status(204).send();
// };

// export const patchContactController = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await updateContact(contactId, req.body);

//   if (!result) {
//     next(createHttpError(404, 'Contact not found',   { message: 'Contact not found' } ));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully patched a contact!`,
//     data: result.contact,
//   });
// };

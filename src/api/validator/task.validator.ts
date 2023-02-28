import Joi from "@hapi/joi";

const createTask = Joi.object().keys({
    title: Joi.string().required().messages({
        "any.required": "title is required",
        "string.base": "title must be a string",
    }),
    description: Joi.string().required().messages({
        "any.required": "description is required",
        "string.base": "description must be a string",
    }),
});

const getTask = Joi.object().keys({
    id: Joi.string()
    .uuid({ version: "uuidv4" })
    .required()
    .messages({
      "string.base": "id must be a string",
      "any.required": "id is required",
      "string.guid": "invalid id format"
    })
});

const updateTask = Joi.object().keys({
    id: Joi.string()
    .uuid({ version: "uuidv4" })
    .required()
    .messages({
      "string.base": "id must be a string",
      "any.required": "id is required",
      "string.guid": "invalid id format"
    }),
    title: Joi.string().required().messages({
        "any.required": "title is required",
        "string.base": "title must be a string",
    }),
    description: Joi.string().required().messages({
        "any.required": "description is required",
        "string.base": "description must be a string",
    }),
    hours: Joi.number(),
    status: Joi.number().valid(1,2,3)
});

const deleteTask = Joi.object().keys({
    id: Joi.string()
    .uuid({ version: "uuidv4" })
    .required()
    .messages({
      "string.base": "id must be a string",
      "any.required": "id is required",
      "string.guid": "invalid id format"
    }),
});

export {
    createTask,
    getTask,
    updateTask,
    deleteTask
}
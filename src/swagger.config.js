export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
      title: "FAQ and User Management API",
      description: "API for managing FAQs and Users with authentication",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: { type: "string", example: "Aryan" },
            email: { type: "string", format: "email", example: "aryanvala22@gmail.com" },
            password: { type: "string", format: "password", example: "Password123!" },
          },
        },
        FAQ: {
          type: "object",
          properties: {
            cat_id: { type: "integer", example: 1 },
            question: { type: "string", example: "How do I reset my password?" },
            answer: { type: "string", example: "You can reset your password by clicking on the 'Forgot Password' link." },
          },
        },
      },
    },
    paths: {
      "/users/register": {
        post: {
          summary: "Register a new user",
          tags: ["User Management"],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } },
          },
          responses: {
            "201": { description: "User registered successfully" },
            "400": { description: "Validation error or user already exists" },
            "500": { description: "Server error" },
          },
        },
      },
      "/users/login": {
        post: {
          summary: "Login user",
          tags: ["User Management"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string", format: "password" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Login successful" },
            "400": { description: "Invalid credentials" },
            "500": { description: "Server error" },
          },
        },
      },
      "/users/getuser": {
        get: {
          summary: "Get all users",
          tags: ["User Management"],
          security: [{ cookieAuth: [] }],
          responses: {
            "200": { description: "Users retrieved successfully" },
            "401": { description: "Unauthorized" },
            "500": { description: "Server error" },
          },
        },
      },
      "/users/logout": {
        get: {
          summary: "Logout user",
          tags: ["User Management"],
          responses: {
            "200": { description: "Logged out successfully" },
            "500": { description: "Server error" },
          },
        },
      },
      "/users/deleteuser": {
        post: {
          summary: "Delete user by email",
          tags: ["User Management"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", format: "email" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "User deleted successfully" },
            "404": { description: "User not found" },
            "500": { description: "Server error" },
          },
        },
      },
      "/users/faq": {
        post: {
          summary: "Add new FAQ",
          tags: ["FAQ Management"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/FAQ" },
              },
            },
          },
          responses: {
            "201": { description: "FAQ added successfully" },
            "500": { description: "Server error" },
          },
        },
        get: {
          summary: "List all FAQs",
          tags: ["FAQ Management"],
          responses: {
            "200": { description: "FAQs listed successfully" },
            "500": { description: "Server error" },
          },
        },
      },
      "/users/updatefaq": {
        put: {
          summary: "Update an existing FAQ",
          tags: ["FAQ Management"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    question: { type: "string", example: "Updated question?" },
                    answer: { type: "string", example: "Updated answer." },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "FAQ updated successfully" },
            "404": { description: "FAQ not found" },
            "500": { description: "Server error" },
          },
        },
      },
      "/users/delete": {
        post: {
          summary: "Delete an FAQ",
          tags: ["FAQ Management"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "FAQ deleted successfully" },
            "404": { description: "FAQ not found" },
            "500": { description: "Server error" },
          },
        },
      },
      "/users/updatedata": {
        put: {
          summary: "Update user details",
          tags: ["User Management"],
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Aryan Updated" },
                    email: { type: "string", format: "email", example: "aryanupdated@gmail.com" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "User details updated successfully" },
            "400": { description: "Validation error" },
            "401": { description: "Unauthorized" },
            "500": { description: "Server error" },
          },
        },
      },
      "/users/changepassword": {
        post: {
          summary: "Change user password",
          tags: ["User Management"],
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    old_password: { type: "string", format: "password", example: "OldPassword123!" },
                    new_password: { type: "string", format: "password", example: "NewPassword123!" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Password changed successfully" },
            "400": { description: "Validation error" },
            "401": { description: "Unauthorized" },
            "500": { description: "Server error" },
          },
        },
      },
    },
  };
  
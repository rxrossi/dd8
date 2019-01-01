const objectMethods = {
  save: jest.fn(() => Promise.resolve())
}

export default {
  create: jest.fn(() => objectMethods),
  update: jest.fn(() => Promise.resolve()),
  remove: jest.fn(() => Promise.resolve()),
  find: jest.fn(() => Promise.resolve()),
  findOne: jest.fn(() => Promise.resolve())
}

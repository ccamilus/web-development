"use strict";

module.exports = {
  getEvent: getEvent,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  createEvent: createEvent,
};

const testData = [
  {
    id: 1,
    name: "event 1",
    date: new Date().toISOString(),
  },
];

function getEvent(req, res) {
  let id = req.swagger.params.id.value;
  res.json(testData.find((event) => event.id === id));
}

function updateEvent(req, res) {
  let id = req.swagger.params.id.value;
  let event = req.swagger.params.event;
  testData.find((event) => event.id === id).name = event.value.name;
  testData.find((event) => event.id === id).date = event.value.date;
  res.json(testData.find((event) => event.id === id));
}

function deleteEvent(req, res) {
  let id = req.swagger.params.id.value;
  let event = testData.find((event) => event.id === id);
  testData.splice(event, 1);
  res.json({ id: id, status: `Event with id ${id} deleted` });
}

function createEvent(req, res) {
  let event = req.swagger.params.event;
  testData.push({
    id: event.value.id,
    name: event.value.name,
    date: new Date(event.value.date).toISOString(),
  });
  let id = event.value.id;
  res.json(testData.find((event) => event.id === id));
}

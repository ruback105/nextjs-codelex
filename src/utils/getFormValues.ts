import { BaseSyntheticEvent } from "react";

function getFormValues(
  e: BaseSyntheticEvent<Event, EventTarget & HTMLFormElement, HTMLFormElement>
) {
  const formData = new FormData(e.target);
  return Object.fromEntries(formData);
}

export default getFormValues;

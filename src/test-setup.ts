// jsdom does not implement scrollIntoView; the filter pages call it after navigation.
Element.prototype.scrollIntoView = () => {};

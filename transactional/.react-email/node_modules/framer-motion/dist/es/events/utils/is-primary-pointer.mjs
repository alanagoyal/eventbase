/**
 * Specifically match against false here as incomplete versions of
 * PointerEvents in very old browser might have it set as undefined.
 */
const isPrimaryPointer = (event) => event.isPrimary !== false;

export { isPrimaryPointer };

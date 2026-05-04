import { useRef } from 'react';

/**
 * Utility function which registers and then removes event listeners for specified elements.
 * @param el Reference of element for which to register event
 * @param eventType native event type
 * @param onEventCallback callback to be bound to event
 */

/**
 * Controls the appearance of Button / Icon that is assigned to the reference,
 * using the visibility property.
 *
 * This implementation has been made in the effort of
 * keeping the input uncontrolled whenever it is possible.
 *
 * @See https://react-hook-form.com/api/useform/register/
 * @param forwardedInputRef forwarded reference to be set by this hook
 * @param disabled clear button / icon won't appear if it is false
 * @returns referenceSetter function to assign the inner input element to the forwarded reference
 * and the reference of the clear button / icon
 */

export const useTextareaController = (forwardedInputRef) => {
  const innerInputRef = useRef();

  // Both the inner reference and the forwarded reference should be set
  const textareaRefSetter = (el) => {
    innerInputRef.current = el;
    if (!forwardedInputRef) return;
    if (typeof forwardedInputRef === 'function') {
      forwardedInputRef(el);
    }
    if (typeof forwardedInputRef === 'object') {
      forwardedInputRef.current = el;
    }
  };

  return { textareaRefSetter };
};

export default useTextareaController;

(function() {
	var capturedEvents = [];
	var capturing = false;
	
	function getEventTarget(event) {
		return event.composedPath()[0] || event.target;
	}
		
	function captureEvent(e) {
		if (capturing) {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			capturedEvents.unshift(e);
		}
	}
	
	function hiddenOrInert(element) {
		var el = element;
		while (el) {
			if (el.style.display === 'none' || el.getAttribute('inert') !== null) return true;
			el = el.parentElement;
		}
		return false;
	}

	/*
	 * The only mousedown events we care about here are ones emanating from
	 * (A) anchor links with href attribute,
	 * (B) non-disabled buttons,
	 * (C) non-disabled textarea,
	 * (D) non-disabled inputs of type "button", "reset", "checkbox", "radio", "submit"
	 * (E) non-interactive elements (button, a, input, textarea, select) that have a tabindex with a numeric value
	 * (F) audio elements
	 * (G) video elements with controls attribute
	 * (H) any element with the contenteditable attribute
	*/
	function isFocusableElement(el) {
		var tag = el.tagName;
		return (
			!hiddenOrInert(el) && (
				(/^a$/i.test(tag) && el.href != null) || // (A)
				(/^(button|textarea)$/i.test(tag) && el.disabled !== true) || // (B) (C)
				(/^input$/i.test(tag) &&
					/^(button|reset|submit|radio|checkbox)$/i.test(el.type) &&
					!el.disabled) || // (D)
				(!/^(button|input|textarea|select|a)$/i.test(tag) &&
					!Number.isNaN(Number.parseFloat(el.getAttribute('tabindex')))) || // (E)
				/^audio$/i.test(tag) || // (F)
				(/^video$/i.test(tag) && el.controls === true) || // (G)
				el.getAttribute('contenteditable') != null // (H)
			)
		);
	}
	
	function getLabelledElement(labelElement) {
		var forId = labelElement.getAttribute('for');
		return forId
			? document.querySelector('#'+forId)
			: labelElement.querySelector('button, input, keygen, select, textarea');
	}
	
	function getFocusableElement(e) {
		var currentElement = getEventTarget(e);
		var focusableElement;
		while (!focusableElement && currentElement !== null && currentElement.nodeType === 1) {
			if (isFocusableElement(currentElement)) {
				focusableElement = currentElement;
			} else if (/^label$/i.test(currentElement.tagName)) {
				var labelledElement = getLabelledElement(currentElement);
				if (isFocusableElement(labelledElement)) {
					focusableElement = labelledElement;
				}
			}
			currentElement = currentElement.parentElement || currentElement.parentNode
		}
		return focusableElement;
	}

	function handler(e) {
		var focusableElement = getFocusableElement(e);
		
		if (focusableElement) {
			if (focusableElement === document.activeElement) {
				// mousedown is happening on the currently focused element
				// do not fire the 'focus' event in this case AND
				// call preventDefault() to stop the browser from transferring
				// focus to the body element
				e.preventDefault();
			} else {
				// start capturing possible out-of-order mouse events
				capturing = true;

				/*
				 * enqueue the focus event _after_ the current batch of events, which
				 * includes any blur events but before the mouseup and click events.
				 * The correct order of events is:
				 *
				 * [this element] MOUSEDOWN               <-- this event
				 * [previously active element] BLUR
				 * [previously active element] FOCUSOUT
				 * [this element] FOCUS                   <-- forced event
				 * [this element] FOCUSIN                 <-- triggered by forced event
				 * [this element] MOUSEUP                 <-- possibly captured event (it may have fired _before_ the FOCUS event)
				 * [this element] CLICK                   <-- possibly captured event (it may have fired _before_ the FOCUS event)                  
				 */
				setTimeout(() => {
					// stop capturing possible out-of-order mouse events
					capturing = false;

					// trigger focus event
								focusableElement.focus();

					// re-dispatch captured mouse events in order
					while (capturedEvents.length > 0) {
						var event = capturedEvents.pop();
						getEventTarget(event).dispatchEvent(new MouseEvent(event.type, event));
					}
				}, 0);
			}
		}
	}
	
	if (/apple/i.test(navigator.vendor)) {
		window.addEventListener('mousedown', handler, {capture: true});
		window.addEventListener('mouseup', captureEvent, {capture: true});
		window.addEventListener('click', captureEvent, {capture: true});
	}
})();

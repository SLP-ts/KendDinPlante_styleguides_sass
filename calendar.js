/*  Component: collapsibleButton
 *  Has an active button part that when clicked, toggles the display of a content part
 *      .collapsibleButton              [main component container]
 *      .collapsibleButton__button      [button element]
 *      .collapsibleButton__content     [content element]
 *      .--active                       [modifier to indicate if content is show]
 */
    
// Set up variable and constants

    // All the components on the current page
    const collapsibleButtons = document.querySelectorAll('.collapsibleButton');

    // loop through all of them and setup eventhandlers
    for(let i=0; i<collapsibleButtons.length; i++) {
        collapsibleButtons[i].addEventListener('click', function (event) {
            console.log('clicked on:', event.target);
            // Call the function that handles the toggle of classes
            // Send along the reference to which element what clicked on (event.target)
            collapsibleToggle(event.target);
        });
    }

    function collapsibleToggle(element) {
        console.log('handling toggle of', element);
        // navigate to parrent node (the container element)
        let container = element.parentNode;
        // Toggle the .--active class for the container
        container.classList.toggle('--active');
    }

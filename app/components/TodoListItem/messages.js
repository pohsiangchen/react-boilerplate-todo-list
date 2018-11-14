/*
 * TodoListItem Messages
 *
 * This contains all the text for the TodoListItem component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.TodoListItem';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TodoListItem component!',
  },
});

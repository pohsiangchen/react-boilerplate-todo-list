/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  myTasks: {
    id: `${scope}.my.tasks`,
    defaultMessage: 'My Tasks',
  },
  inProgress: {
    id: `${scope}.in.progress`,
    defaultMessage: 'In Progress',
  },
  completed: {
    id: `${scope}.completed`,
    defaultMessage: 'Completed',
  },
});

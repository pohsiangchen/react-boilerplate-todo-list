/**
 *
 * Asynchronously loads the component for TodoPage
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));

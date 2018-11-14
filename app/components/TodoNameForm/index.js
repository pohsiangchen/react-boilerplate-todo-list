/**
 *
 * TodoNameForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import reduxForm from 'redux-form/es/immutable/reduxForm';
import Field from 'redux-form/es/immutable/Field';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';

import { required } from 'utils/reduxFormHelper';

import styles from './styles';
import messages from './messages';

const FORM_ID = 'todoNameForm';
const renderOutlinedInput = ({ input, label, ...custom }) => (
  <OutlinedInput key="input" {...input} {...custom} />
);

function TodoNameForm({ classes, intl, handleSubmit, submitting, pristine }) {
  return (
    <form
      onSubmit={handleSubmit(data => {
        console.log(data);
      })}
    >
      <FormControl className={classes.formControl} variant="outlined" fullWidth>
        <Field
          id="component-outlined"
          placeholder={intl.formatMessage(messages.addTask)}
          labelWidth={0}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                type="submit"
                aria-label="Create a todo"
                disabled={submitting || pristine}
              >
                <AddIcon />
              </IconButton>
            </InputAdornment>
          }
          name="name"
          type="text"
          validate={required}
          component={renderOutlinedInput}
        />
      </FormControl>
    </form>
  );
}

TodoNameForm.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  //
  // redux-form props
  //
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
};

const withReduxForm = reduxForm({
  form: FORM_ID,
});

export default compose(
  withReduxForm,
  injectIntl,
  withStyles(styles),
)(TodoNameForm);

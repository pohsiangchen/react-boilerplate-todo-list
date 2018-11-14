/**
 *
 * TodoNameForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import reduxForm from 'redux-form/es/immutable/reduxForm';
import Field from 'redux-form/es/immutable/Field';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import AddIcon from '@material-ui/icons/Add';

import { required } from 'utils/reduxFormHelper';

import styles from './styles';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const FORM_ID = 'todoNameForm';
const renderOutlinedInput = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => [
  <OutlinedInput
    key="input"
    error={touched && !!error}
    {...input}
    {...custom}
  />,
  touched && error && (
    <FormHelperText key="helpText" id="component-error-text" error>
      {error}
    </FormHelperText>
  ),
];

class TodoNameForm extends React.PureComponent {
  render() {
    const { classes, handleSubmit, submitting, pristine } = this.props;
    return (
      <form
        onSubmit={handleSubmit(data => {
          console.log(data.toJS());
        })}
      >
        {/* <FormattedMessage {...messages.header} /> */}
        <FormControl
          className={classes.formControl}
          variant="outlined"
          fullWidth
        >
          <Field
            id="component-outlined"
            placeholder="Add Task"
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
}
// function TodoNameForm({ classes }) {
//   return (
//     <div>
//       {/* <FormattedMessage {...messages.header} /> */}
//       <FormControl className={classes.formControl} variant="outlined">
//         <InputLabel
//           // ref={ref => {
//           //   this.labelRef = ReactDOM.findDOMNode(ref);
//           // }}
//           htmlFor="component-outlined"
//         >
//           Name
//         </InputLabel>
//         <OutlinedInput
//           id="component-outlined"
//           value="12345"
//           startAdornment={
//             <InputAdornment position="start">
//               <IconButton
//                 aria-label="Toggle password visibility"
//                 // onClick={this.handleClickShowPassword}
//               >
//                 <AddIcon />
//               </IconButton>
//             </InputAdornment>
//           }
//           // onChange={this.handleChange}
//           // labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
//         />
//       </FormControl>
//     </div>
//   );
// }

TodoNameForm.propTypes = {
  classes: PropTypes.object.isRequired,
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
  withStyles(styles),
)(TodoNameForm);

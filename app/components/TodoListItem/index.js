/**
 *
 * TodoListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles, { SM_HEADER_HEIGHT } from './styles';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function TodoListItem({
  classes,
  name,
  isDone,
  onChangeDone,
  isImportant,
  onChangeImportant,
  isEdit,
  onEdit,
}) {
  return (
    <Collapse
      className={classes.root}
      in={isEdit}
      collapsedHeight={`${SM_HEADER_HEIGHT}px`}
    >
      <Paper elevation={1}>
        <Paper
          className={classes.header}
          elevation={1}
          style={{ height: SM_HEADER_HEIGHT - 2 }}
        >
          {/* <FormattedMessage {...messages.header} /> */}
          <Checkbox checked={isDone} onChange={onChangeDone} color="primary" />
          <Typography className={classes.title} variant="title" noWrap>
            {name}
          </Typography>
          <FormControlLabel
            className={classes.starCheckbox}
            control={
              <Checkbox
                icon={<StarBorderIcon />}
                checkedIcon={<StarIcon />}
                checked={isImportant}
                onChange={onChangeImportant}
              />
            }
          />
          <IconButton
            className={classes.button}
            onClick={onEdit}
            aria-label="Edit"
          >
            <EditIcon />
          </IconButton>
        </Paper>
        <form className={classes.form} noValidate>
          <div className={classes.formContent}>
            <TextField
              id="datetime-local"
              label="Deadline"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="comment"
              label="Comment"
              margin="normal"
              multiline
              className={classes.textField}
            />
          </div>
          <div className={classes.formControls}>
            <Button variant="contained" className={classes.button} fullWidth>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth
            >
              Add Task
            </Button>
          </div>
        </form>
      </Paper>
    </Collapse>
  );
}

TodoListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  isDone: PropTypes.bool,
  onChangeDone: PropTypes.func,
  isImportant: PropTypes.bool,
  onChangeImportant: PropTypes.func,
  isEdit: PropTypes.bool,
  onEdit: PropTypes.func,
};

export default withStyles(styles)(TodoListItem);

/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import TodoListItem from 'components/TodoListItem';
import TodoNameForm from 'components/TodoNameForm';

import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      isDone: false,
      isImportant: false,
      isEdit: false,
    };
  }

  handleChange = (event, value) => {
    this.setState({ tabIndex: value });
  };

  handleChangeDone = () => {
    this.setState(state => ({
      isDone: !state.isDone,
    }));
  };

  handleChangeImportant = () => {
    this.setState(state => ({
      isImportant: !state.isImportant,
    }));
  };

  handleChangeEdit = () => {
    this.setState(state => ({
      isEdit: !state.isEdit,
    }));
  };

  render() {
    const { classes } = this.props;
    const { tabIndex, isDone, isImportant, isEdit } = this.state;

    console.log(messages);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={tabIndex} onChange={this.handleChange} centered>
            <Tab label={<FormattedMessage {...messages.myTasks} />} />
            <Tab label={<FormattedMessage {...messages.inProgress} />} />
            <Tab label={<FormattedMessage {...messages.completed} />} />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && (
          <div style={{ displat: 'flex', flexDirection: 'column' }}>
            <TodoNameForm />
            <TodoListItem
              name={`Hello!!!!${isDone}`}
              isDone={isDone}
              onChangeDone={this.handleChangeDone}
              isImportant={isImportant}
              onChangeImportant={this.handleChangeImportant}
              isEdit={isEdit}
              onEdit={this.handleChangeEdit}
            />
            <TodoListItem name={`Hello!!!!${isDone}`} />
          </div>
        )}
        {tabIndex === 1 && <Typography>inProgress</Typography>}
        {tabIndex === 2 && <Typography>completed</Typography>}
      </div>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);

/**
 *
 * TodoPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import map from 'lodash/map';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import TodoListItem from 'components/TodoListItem';
// import TodoNameForm from 'components/TodoNameForm';

import reducer from 'models/todo/reducer';
import saga from 'models/todo/saga';
import { fetchTodosAction } from 'models/todo/actions';
import {
  makeSelectTodos,
  makeSelectTodosFetchLoading,
  makeSelectTodosFetchError,
} from 'models/todo/selectors';

// import makeSelectTodoPage from './selectors';
// import saga from './saga';
import messages from './messages';
import styles from './styles';

/* eslint-disable react/prefer-stateless-function */
export class TodoPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      // isDone: false,
      // isImportant: false,
      // isEdit: false,
    };
  }

  componentDidMount() {
    this.props.onFetchTodos();
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

  renderTodoList(todos) {
    if (!todos) {
      return <Typography>No Todos</Typography>;
    }
    return map(todos, todo => (
      <TodoListItem
        key={todo.id}
        name={todo.name}
        isDone={todo.isDone}
        isImportant={todo.isImportant}
        isEdit={todo.isEdit}
      />
    ));
  }

  render() {
    const { classes, todos } = this.props;
    const { tabIndex } = this.state;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>Todo Page</title>
          <meta name="description" content="Todo list page" />
        </Helmet>
        <AppBar position="static">
          <Tabs value={tabIndex} onChange={this.handleChange} centered>
            <Tab label={<FormattedMessage {...messages.myTasks} />} />
            <Tab label={<FormattedMessage {...messages.inProgress} />} />
            <Tab label={<FormattedMessage {...messages.completed} />} />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && this.renderTodoList(todos)}
        {tabIndex === 1 && <Typography>inProgress</Typography>}
        {tabIndex === 2 && <Typography>completed</Typography>}
      </div>
    );
  }
}

TodoPage.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onFetchTodos: PropTypes.func,
  todos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  todos: makeSelectTodos(),
  loading: makeSelectTodosFetchLoading(),
  error: makeSelectTodosFetchError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onFetchTodos: () => {
      dispatch(fetchTodosAction.request());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'todo', reducer });
const withSaga = injectSaga({ key: 'todo', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(TodoPage);

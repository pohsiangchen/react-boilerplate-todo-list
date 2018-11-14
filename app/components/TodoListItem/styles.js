export const SM_HEADER_HEIGHT = 76;
export const LG_HEADER_HEIGHT = 102;

const styles = theme => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginRight: theme.spacing.unit * 2,
  },
  starCheckbox: {
    marginRight: 0,
  },
  form: {},
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 2,
  },
  formControls: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
});

export default styles;

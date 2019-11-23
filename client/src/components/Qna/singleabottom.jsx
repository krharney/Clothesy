const React = require("react");
const { Typography, Grid, Link } = require("@material-ui/core");
const { makeStyles } = require("@material-ui/core");
const Moment = require("react-moment").default;
const Helpfulness = require("../shared/Helpfulness");
const Report = require("../shared/Report");
const useStyles = makeStyles(theme => ({
  smallGreyFont: {
    fontWeight: "fontWeightLight",
    fontSize: 10
  }
}));

module.exports = ({ answerid, date, answerername, helpfulcount }) => {
  const classes = useStyles();

  return (
    <div className={classes.smallGreyFont}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Typography className={classes.smallGreyFont}>
            by {answerername},
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.smallGreyFont}>
            <Moment format="MMMM D, YYYY" withTitle date={date} />
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Helpfulness
            qar={"answer"}
            qarId={answerid}
            helpfulnessCounter={helpfulcount}
            qna={true}
          />
        </Grid>
        <Grid item xs={2}>
          <Report qna={true}/>
        </Grid>
      </Grid>
    </div>
  );
};

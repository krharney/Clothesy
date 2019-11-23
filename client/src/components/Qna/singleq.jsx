const React = require("react");
const { useState } = require("react");
const { makeStyles } = require("@material-ui/core");
const { Typography, Grid, Link } = require("@material-ui/core");
const SingleA = require("./singlea.jsx");
const Helpfulness = require("../shared/Helpfulness");
const AddAnswer = require("../shared/Modal");

//styling section
const useStyles = makeStyles(theme => ({
  singleqaroot: {
    flexGrow: 1,
    textAlign: "left",
    padding: 10
  },
  boldFont: {
    fontWeight: "bold"
  }
}));

//component
module.exports = ({ questions }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.singleqaroot}>
      {questions.map(i => {
        return (
          <Grid container spacing={1} key={i.question_id}>
            <Grid item xs={1}>
              <Typography className={classes.boldFont}>Q:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.boldFont}>
                {i.question_body}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Helpfulness
                qar={"question"}
                qarId={i.question_id}
                helpfulnessCounter={i.question_helpfulness}
                qna={true}
              />
            </Grid>
            <Grid item xs={1}>
              <AddAnswer
                qarfield={"answer"}
                modalTitle={"Submit Your Answer"}
                bodyTextPlaceholder={"Your Answer"}
                buttonText={"Add Answer"}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography className={classes.boldFont}>A: </Typography>
            </Grid>
            <Grid item xs={11}>
              <SingleA questionid={i.question_id} />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

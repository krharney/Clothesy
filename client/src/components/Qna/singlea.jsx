const React = require("react");
const { useState, useEffect } = require("react");
const { makeStyles } = require("@material-ui/core");
const { Typography, Grid } = require("@material-ui/core");
const axios = require("./qnaaxios.js")
const ShowMore = require("../shared/ShowMoreButton");
const SingleABottom = require("./singleabottom");
const sortCriteria = require("../../../../helpers/sortCriteria");

const useStyles = makeStyles(theme => ({
  answers: {
    noWrap: true
  }
}));

const handleGetAnswers = qid => {
  return axios.request(`/qa/${qid}/answers`);
};

module.exports = ({ questionid }) => {
  const classes = useStyles();

  const [apiDatas, setData] = useState({ results: [] });
  const [answercount, setAnswerCount] = useState(1);

  useEffect(() => {
    handleGetAnswers(questionid).then(({ data }) => setData(data));
  }, [1]);

  return (
    <Grid container spacing={1} direction={"column"}>
      {apiDatas.results
        .sort(sortCriteria("helpfulness"))
        .slice(0, answercount)
        .map(i => {
          return (
            <Grid key={i.answer_id} item xs={11}>
              <Typography className={classes.answers}>{i.body}</Typography>
              <SingleABottom
                answerid={i.answer_id}
                date={i.date}
                answerername={i.answerer_name}
                helpfulcount={i.helpfulness}
              />
            </Grid>
          );
        })}
      <ShowMore
        qarfield={"answer"}
        buttonText={"LOAD MORE ANSWERS"}
        onClick={() => {
          setAnswerCount(answercount + 1);
        }}
      />
      <br />
    </Grid>
  );
};

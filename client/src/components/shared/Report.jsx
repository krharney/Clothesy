const React = require("react");
const { useState } = require("react");
const { Grid, Typography, Box } = require("@material-ui/core");
const { makeStyles } = require("@material-ui/styles");
const axios = require("../../../../helpers/axiosApi.js");
const qnaaxios = require("../Qna/qnaaxios.js");

const useStyles = makeStyles(theme => ({
  smallGreyFont: {
    fontWeight: "fontWeightLight",
    fontSize: 10
  },
  smallGreyFontRightAlign: {
    textAlign: "right",
    fontWeight: "fontWeightLight",
    fontSize: 10
  }
}));

const report = {
  question: id => axios.put(`/qa/question/${id}/report`),
  answer: id => axios.put(`/qa/answer/${id}/report`),
  review: id => axios.put(`/reviews/report/${id}`)
};

//ENDPOINTS -- expect 204
//PUT /qa/question/:question_id/report
//PUT /qa/answer/:answer_id/report
//PUT /reviews/report/:review_id

// TODO: // implement api endpoints
// TODO: // implement material-ui typography et al.

module.exports = ({ qar, qarId, onSuccess = () => {}, onFail = () => {} }) => {
  const classes = useStyles();
  const [isReported, setReport] = useState(0);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography
          className={classes.smallGreyFont}
          onClick={
            isReported
              ? () => {}
              : () => {
                  setReport(isReported + 1);
                  report[qar](qarId)
                    .then(onSuccess)
                    .catch(() => {
                      setReport(0);
                      onFail();
                    });
                }
          }
        >
          {isReported === 0 ? "Report" : "Reported"}
        </Typography>
      </Grid>
    </Grid>
  );
};

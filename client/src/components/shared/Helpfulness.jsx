const React = require("react");
const { useState } = require("react");
const { Typography, Grid } = require("@material-ui/core");
const { makeStyles } = require("@material-ui/core");
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

const markAsHelpful = {
  question: id => qnaaxios.put(`/qa/question/${id}/helpful`),
  answer: id => qnaaxios.put(`/qa/answer/${id}/helpful`),
  review: id => axios.put(`/reviews/helpful/${id}`)
};

//ENDPOINTS -- expect 204
//PUT /qa/question/:question_id/helpful
//PUT /qa/answer/:answer_id/helpful
//PUT /reviews/helpful/:review_id

module.exports = ({
  helpfulnessCounter,
  onSuccess = () => {},
  onFail = () => {},
  qar,
  qarId
}) => {
  const classes = useStyles();
  const [hctr, setHctr] = useState(helpfulnessCounter);
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography className={classes.smallGreyFontRightAlign}>
            Helpful?
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          onClick={() => {
            setHctr(hctr + 1);
            markAsHelpful[qar](qarId)
              .then(() => onSuccess())
              .catch(() => {
                onFail();
                setHctr(hctr - 1);
              });
          }}
        >
          <Typography className={classes.smallGreyFont}>Yes({hctr})</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

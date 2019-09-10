const React = require("react");
const { useState } = require("react");
const { Container, Grid, Typography } = require("@material-ui/core");

const SearchQnaButton = require("./searchqnabutton");
const Singleq = require("./singleq");
const AddQuestion = require("../shared/Modal");
const ShowMore = require("../shared/ShowMoreButton");
const sortCriteria = require("../../../../helpers/sortCriteria");

const staticdata = require("./staticdata");

module.exports = props => {
  let apiData = staticdata.static.listquestions.results;
  const [apiDatas, setData] = useState(apiData);

  const [count, setCount] = useState(2);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="qnaComponentWrapper">
      <div>
        <Typography>QUESTIONS & ANSWERS</Typography>
      </div>
      <Container maxWidth="lg">
        <SearchQnaButton
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
        />
        <div className="qnaListWrapper"></div>
        <Grid>
          <Singleq
            questions={apiDatas
              .sort(sortCriteria("question_helpfulness"))
              .slice(0, count)}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <ShowMore
              buttonText={"MORE ANSWERED QUESTIONS"}
              onClick={() => {
                setCount(count + 1);
              }}
            />
          </Grid>
          <Grid item>
            <AddQuestion
              buttonText={"ADD A QUESTION +"}
              qarfield={"question"}
              modalTitle={"Ask Your Question"}
              bodyTextPlaceholder={"Submit your question"}
            ></AddQuestion>
          </Grid>
        </Grid>
      </Container>
      <br />
    </div>
  );
};

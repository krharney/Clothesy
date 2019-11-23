//Dependencies:
const React = require("react");
const { useState, useEffect } = require("react");
const { Container, Grid, Typography } = require("@material-ui/core");

//Modules
const SearchQnaButton = require("./searchqnabutton");
const Singleq = require("./singleq");
const AddQuestion = require("../shared/Modal");
const ShowMore = require("../shared/ShowMoreButton");
const sortCriteria = require("../../../../helpers/sortCriteria");
const axios = require("./qnaaxios.js");

//Get data
const handleGetQuestions = endpoint => {
  return axios.request(`/qa/${endpoint}`);
};

module.exports = props => {
  const [apiData, setData] = useState({ product_id: undefined, results: [] });
  const [count, setCount] = useState(2);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    handleGetQuestions(props.currentProduct.id)
      .then(({ data }) => setData(data))
      .catch(error => console.log(error));
  }, [props.currentProduct.id]);

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
            questions={
              searchText.length > 3
                ? apiData.results
                    .sort(sortCriteria("question_helpfulness"))
                    .filter(qry => qry.question_body.includes(searchText))
                : apiData.results
                    .sort(sortCriteria("question_helpfulness"))
                    .slice(0, count)
            }
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

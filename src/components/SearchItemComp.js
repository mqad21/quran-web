import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, Typography, Card, ButtonBase } from "@material-ui/core";
import Context from "../store/context";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";

export default function SearchItem(props) {
  const { state } = useContext(Context);
  const { show } = props;

  const useStyles = makeStyles({
    root: {
      background: "transparent !important",
      textAlign: "left",
      marginBottom: "1em",
      display: !show ? "none" : "",
    },
    card: {
      minWidth: 275,
      margin: "0",
    },
    title: {
      fontSize: 14,
    },
    trans: {
      fontSize: `${state.fontSize * 1.1}rem`,
    },
    highlighter: {
      background: "#03f74a",
    },
  });

  const classes = useStyles();
  const { data } = props;

  return (
    <ButtonBase
      className={classes.root}
      component={Link}
      to={`${process.env.PUBLIC_URL}/surah/${data.surahId}/${data.ayat}`}
    >
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`QS. ${data.surah} : ${data.ayat}`}
          </Typography>
          <Typography className={classes.trans}>
            <Highlighter
              searchWords={[state.keywordSearch]}
              autoEscape
              highlightClassName={classes.highlighter}
              textToHighlight={data.text}
            ></Highlighter>
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}

import React, { useState, useContext } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { Search as SearchIcon } from "@material-ui/icons";
import SearchItem from "../SearchItemComp";
import Context from "../../store/context";
import SurahList from "../../json/surah.json";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5em",
  },
  input: {
    flex: 1,
    maxWidth: "100%",
  },
  iconButton: {
    padding: 10,
  },
  paginationPaper: {
    position: "sticky",
    bottom: "1rem",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  pagination: {
    background: "transparent !important",
    boxShadow: "none"
  },
}));

export default function Cari(props) {
  const { state, actions } = useContext(Context);
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const itemPerPage = 3;

  const handleSearch = (data) => {
    setIsLoading(true);
    setIsError(false);
    searchAyat(data.keyword);
  };

  const searchAyat = (keyword) => {
    const URL = `https://api.alquran.cloud/v1/search/${keyword}/all/id.indonesian`;
    return fetch(URL)
      .then((resp) => {
        if (resp.ok) {
          return resp;
        } else {
          throw new Error("Error: " + resp.statusText);
        }
      })
      .then((resp) => resp.json())
      .then((result) => {
        actions({
          type: "setState",
          payload: {
            ...state,
            firstLoadSearch: false,
            resultSearch: result.data.matches,
            keywordSearch: keyword,
          },
        });
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.message === "Failed to fetch") {
          setIsError(true);
        }
        actions({
          type: "setState",
          payload: { ...state, firstLoadSearch: false, resultSearch: [] },
        });
        setIsLoading(false);
      });
  };

  const getSurah = (surahId) =>
    SurahList.filter((surah) => surah.nomor === surahId.toString())[0].nama;

  const SearchItemList = () => {
    if (!state.firstLoadSearch) {
      if (!isLoading) {
        if (isError) {
          return (
            <Typography color="textSecondary">
              Mohon Periksa Koneksi Internet Anda.
            </Typography>
          );
        } else {
          const itemCount = state.resultSearch.length;
          if (itemCount !== 0) {
            return (
              <React.Fragment>
                {state.resultSearch.map((result, index) => (
                  <SearchItem
                    key={index}
                    show={(index + 1) <= page * itemPerPage && (index + 1) > (page-1) * itemPerPage}
                    data={{
                      surah: getSurah(result.surah.number),
                      surahId: result.surah.number,
                      ayat: result.numberInSurah,
                      text: result.text,
                    }}
                  />
                ))}
                <Paper className={classes.paginationPaper}>
                  <Pagination
                    className={classes.pagination}
                    color="primary"
                    count={Math.ceil(itemCount / itemPerPage)}
                    page={page}
                    siblingCount={0}
                    variant="outlined"
                    onChange={handlePageChange}
                  />
                </Paper>
              </React.Fragment>
            );
          }
          return (
            <Typography color="textSecondary">
              Kata Kunci Tidak Ditemukan.
            </Typography>
          );
        }
      }
      return <CircularProgress />;
    }
    return null;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box m={3}>
      <form onSubmit={handleSubmit(handleSearch)}>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Masukkan Kata Kunci"
            inputRef={register}
            name="keyword"
            type="search"
            inputProps={{ "aria-label": "cari ayat" }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
      <Grid direction="column" container alignItems="center">
        <SearchItemList />
      </Grid>
    </Box>
  );
}

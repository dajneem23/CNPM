/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { BaseListJob, NewListJob, TopCoop } from "../Home/BaseListJob";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import logo from "../../IMG/woekday.jpg";
import { Container, Grid } from "@mui/material";
import { calculateTimeAgo, getDateWithFormat } from "../../Utls/DateTimeUtls";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import "./style.css";
import ReactPaginate from "react-paginate";
import { Job } from "../../Service/Job.service";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
export default function Seach() {
  const [flag, setflag] = useState("");
  const [seachTerm, setSearchTerm] = useState("");
  const [data, setdata] = useState([]);
  const [location, setLocation] = React.useState("");
  const [type, setType] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [results, setResult] = React.useState([]);
  const [sWidth, setScreenWidth] = useState(window.innerWidth);
  const [listAllJobs, setListAllJobs] = useState([]);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
    Job.GetAllJobs().then((result) => {
      setListAllJobs(result);
      setResult(result);
    });
    return () => {
      setLocation("");
      setSearchTerm("");
    };
  }, []);
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeEX = (event) => {
    setExperience(event.target.value);
  };
  const onSearch = () => {
    const listFillter = listAllJobs.filter(
      (data) => {
        if (seachTerm == "" && location == "") {
          return data;
        } else if (
          data.address.toLowerCase().includes(location.toLowerCase().trim()) &&
          data.title
            .toLowerCase()
            .trim()
            .includes(seachTerm.toLowerCase().trim())
        ) {
          return data;
        }
      }
    );
    setResult(listFillter);
  };
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = results
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((a, i) => {
      return (
        <div>
          <Grid container className="container_all_jobs">
            <Grid className="container_grid_hover">
              <CardJob key={i} item={a} />
            </Grid>
          </Grid>
        </div>
      );
    });
  const pageCount = Math.ceil(results.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      <Container maxWidth="xlg" className="container_home">
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ m: 1 }} variant="standard">
            <InputLabel className="demo-customized-textbox">
              Name of work do you want, location,....
            </InputLabel>
            <BootstrapInput
              className="input-job-search"
              id="demo-customized-textbox"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }} variant="standard">
            <InputLabel id="demo-customized-select-label">Location</InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={location}
              onChange={handleChangeLocation}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"TP. H??? Ch?? Minh"}>TP.H??? Ch?? Minh</MenuItem>
              <MenuItem value={"TP.???? N???ng"}>TP.???? N???ng</MenuItem>
              <MenuItem value={"H?? N???i"}>H?? N???i</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }} variant="standard">
            <InputLabel id="demo-customized-select-label">
              Type of Job
            </InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={type}
              onChange={handleChangeType}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"ReactJs"}>ReactJs</MenuItem>
              <MenuItem value={"AngularJS"}>AngularJS</MenuItem>
              <MenuItem value={"PHP"}>PHP</MenuItem>
              <MenuItem value={"VueJs"}>VueJS</MenuItem>
              <MenuItem value={"Javascript"}>Javascript</MenuItem>
              <MenuItem value={"Python"}>Python</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }} variant="standard">
            <InputLabel id="demo-customized-select-label">
              Experience
            </InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={experience}
              onChange={handleChangeEX}
              input={<BootstrapInput />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>D?????i 1 n??m</MenuItem>
              <MenuItem value={1}>1 n??m</MenuItem>
              <MenuItem value={2}>2 n??m</MenuItem>
              <MenuItem value={3}>3 n??m</MenuItem>
              <MenuItem value={4}>5 n??m</MenuItem>
              <MenuItem value={5}>5 n??m</MenuItem>
              <MenuItem value={6}>Tr??n 5 n??m</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Button
              variant="contained"
              size="medium"
              style={{ margin: 35 }}
              onClick={() => {
                onSearch();
              }}
            >
              Search
            </Button>
          </FormControl>
        </Box>
        <div className="search-page">
          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
          >
            <Grid container className="container_all_jobs">
              {displayUsers}
            </Grid>
          </Box>
        </div>
      </Container>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
  function CardJob(props) {
    const dateEnd = getDateWithFormat(props.item.endDate);
    const timeAgo = calculateTimeAgo(props.item.createDate);

    return (
      // <Card variant="outlined" className="container_card_all_job">
      //   <CardMedia component = "img" image={logo} height = "140" width = "380"/>
      //   <img src={logo} className="card_image" />
      //   <CardContent style={{ width: "100%" }}>
      //     <div className="card_title">{props.item.title}</div>
      //     <div className="">${props.item.salary}</div>
      //     <div className="card_date_to">
      //       <span>To: {dateEnd}</span>
      //     </div>
      //     <div className="card_date_to">{timeAgo}</div>
      //   </CardContent>
      //   <CardActions>
      //     <Link to={`job/${props.item._id}`} style={{ textDecoration: "none" }}>
      //       <div className="btnInfo">
      //         <button>View More</button>
      //       </div>
      //     </Link>
      //   </CardActions>
      // </Card>
      <Card
        sx={{ maxWidth: 345 }}
        className="container_card_all_job"
        variant="outlined"
      >
        <CardHeader
          sx={{ minWidth: 340 }}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          }
          title={props.item.createBy}
          subheader={timeAgo}
        />
        <CardMedia
          sx={{ maxHeight: 150 }}
          component="img"
          height="194"
          image={props.item.img || logo}
          alt="Paella dish"
        />
        <CardContent sx={{ minWidth: 340, minHeight: 150 }}>
          <Typography variant="body2" color="text.secondary">
            <div className="card_title">{props.item.title}</div>
            <div className="">${props.item.salary}</div>
            <div className="card_date_to">
              <span>To: {dateEnd}</span>
            </div>
            <div>
              {props.item.language.map((item, i) => {
                return <Chip label={item} sx={{ marginRight: 1 }} />;
              })}
            </div>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link to={`job/${props.item._id}`} style={{ textDecoration: "none" }}>
            <Button size="small">Learn More</Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
}

import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import suggestions from "../search_widget/autosuggest.json";
import Room from "@material-ui/icons/Room";
import Hotel from "@material-ui/icons/Hotel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);
  let add = null;
  if (suggestion.style === "dest") {
    add = <Room />;
  } else {
    add = <Hotel />;
  }
  return (
    <MenuItem selected={isHighlighted} component="div">
      <ListItemIcon>{add}</ListItemIcon>
      <div>
        <ListItemText>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 900 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 100 }}>
                {part.text}
              </strong>
            )
          )}
        </ListItemText>
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.name.filter(suggestion => {
        var checkPartialString = true;

        var inputValues = inputValue.split(" ");
        var inputValuesAmount = inputValues.length;

        for (var i = 0; i < inputValuesAmount; i++) {
          const partialString = suggestion.label
            .toLowerCase()
            .indexOf(inputValues[i]);
          if (partialString < 0) {
            checkPartialString = false;
          }
        }

        const keep = count < 7 && checkPartialString;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    height: 50,
    flexGrow: 1
  },
  container: {
    position: "relative",
    padding: theme.spacing.unit * 2
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

class Destination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = (event, { newValue }) => {
    this.props.onHandleDestinationName(newValue);
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: "Enter City, Hotel Name, or Airport",
            value: this.props.destinationName,

            onChange: this.handleChange
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        <div className={classes.divider} />
      </div>
    );
  }
}

Destination.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Destination);

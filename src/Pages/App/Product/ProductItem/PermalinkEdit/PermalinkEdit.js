import React, { useState } from "react";
import { Button, Link } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

function PermalinkEdit({ url_name, handleEventProductData, style }) {
  const [permalinkEdit, setPermalinkEdit] = useState(false);
  const [permalinkTextEvent, setPermalinkTextEvent] = useState({});

  return (
    <div style={style}>
      <b>Permalink</b>
      {!permalinkEdit ? (
        <React.Fragment>
          <Link style={{ marginLeft: "10px", marginRight: "10px" }}>
            http://pizza-apes.lk/product/{url_name}
          </Link>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => setPermalinkEdit(true)}
          >
            Edit
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span style={{ marginLeft: "10px", marginRight: "4px" }}>
            http://pizza-apes.lk/product/
          </span>
          <TextField
            variant="outlined"
            name="url_name"
            size="small"
            defaultValue={url_name}
            style={{ marginRight: "10px" }}
            onChange={(e) => setPermalinkTextEvent(e)}
          />
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => {
              handleEventProductData(permalinkTextEvent);
              setPermalinkEdit(false);
            }}
          >
            ok
          </Button>
          <bold style={{ marginLeft: "10px", marginRight: "10px" }}>/</bold>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => setPermalinkEdit(false)}
          >
            Cancel
          </Button>
        </React.Fragment>
      )}
    </div>
  );
}

export default PermalinkEdit;

import { useState } from "react";
import { data } from "./Data";
import "./Style.css";
export default function Index() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [mulitple, setMultiple] = useState([]);
  const [button, setButton] = useState("Enable Multiple Selections");

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultipleSelection(getCurrentId) {

    let copyMultiple = [...mulitple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

    console.log(findIndexOfCurrentId);
    if(findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId);
    else copyMultiple.splice(findIndexOfCurrentId,1);

    setMultiple(copyMultiple);   
  }

  function handleClick()
  {
        setButton(button === 'Enable Multiple Selections' ? 'Disable Multiple Selections' : 'Enable Multiple Selections');
        setEnableMultiSelection(!enableMultiSelection)
  }

  console.log(selected);
  return (
    <>
      <div className="wrapper">
        <button onClick={handleClick}>
        {button}
        </button>
        <div className="accordian">
          {data && data.length > 0 ? (
            data.map((dataItem) => (
              <div className="item">
                <div
                  onClick={
                    enableMultiSelection
                      ? () => handleMultipleSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                  className="title"
                >
                  <h3>{dataItem.ques}</h3>
                  <span>+</span>
                  </div>
                {
                    enableMultiSelection 
                    ? (mulitple.indexOf(dataItem.id) !== -1 && <div className="content">{dataItem.ans}</div>)
                    : (selected === dataItem.id && (
                        <div className="content">{dataItem.ans}</div>))
                }
              </div>
            ))
          ) : (
            <div>No data found!</div>
          )}
        </div>
      </div>
    </>
  );
}

import * as React from "react"

const CollapseNote = ({ open, close, children }) => {
  const [show, setShow] = React.useState(false)
  return (
    <div className="collapse-note-outer">
      <button onClick={() => setShow(!show)}>{show ? close : open}</button>
      <div
        className="collapse-note-inner"
        style={{ display: !show ? "none" : "block" }}
      >
        {children}
      </div>
    </div>
  )
}

export default CollapseNote
